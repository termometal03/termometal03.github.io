'use strict';
const fs   = require('fs');
const path = require('path');

// ── Load config ───────────────────────────────────────────────────────────────
function loadConfig(configPath) {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function saveConfig(configPath, cfg) {
  fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2), 'utf8');
}

// ── Schema.org ────────────────────────────────────────────────────────────────
const SCHEMA_LD = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Termometal",
  "image": "https://termometal03.com/termometal2.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Užički put 288",
    "addressLocality": "Uzići",
    "addressCountry": "RS"
  },
  "url": "https://termometal03.com",
  "telephone": "+38162227188"
}
<\/script>`;

// ── Page shell ────────────────────────────────────────────────────────────────
function buildShell({ title, desc, cssPath, scriptPath, body, navbar, footer }) {
  return `<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="icon" type="image/png" href="/termometal2.png">
    <link rel="stylesheet" href="${cssPath}">
    ${SCHEMA_LD}
</head>
<body>
    ${navbar}

${body}

    ${footer}
    <script src="${scriptPath}"></script>
</body>
</html>`;
}

// ── Metal page body ───────────────────────────────────────────────────────────
function metalBody(m) {
  const types = m.types.map(t => `                <li>${t}</li>`).join('\n');
  const specs = m.specs.map(s => `                <li>${s}</li>`).join('\n');
  return `    <div class="container">
        <div class="product-detail">
            <a class="back-btn" href="/">&#8592; Nazad na početnu</a>
            <div class="product-detail-header">
                <h1>${m.title}</h1>
            </div>
            <div class="product-detail-content">
                <div class="product-description">
                    <h3>Opis proizvoda</h3>
                    <p>${m.description}</p>
                </div>
                <div class="product-types">
                    <h3>Dostupni oblici</h3>
                    <ul>
${types}
                    </ul>
                </div>
                <div class="product-specs">
                    <h3>Specifikacije</h3>
                    <ul>
${specs}
                    </ul>
                </div>
                <div class="order-info">
                    <h3>Informacije o naručivanju</h3>
                    <div class="info-box">
                        <p>&#128231; Proizvode možete poručiti emailom ili telefonom</p>
                        <p>&#128666; Za veće količine moguća i dostava</p>
                        <p>&#128220; Za sve proizvode posedujemo sertifikat o kvalitetu (hemijski sastav)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// ── script.js content ─────────────────────────────────────────────────────────
const SCRIPT_JS = `// Toggle mobile menu
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('active');
}
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (window.innerWidth <= 768 && nav && menuBtn &&
        !nav.contains(event.target) && !menuBtn.contains(event.target)) {
        nav.classList.remove('active');
    }
});`;

// ── Sitemap ───────────────────────────────────────────────────────────────────
function generateSitemap(cfg) {
  const today = new Date().toISOString().split('T')[0];
  const urls = Object.values(cfg.pages).map(p => `    <url>
        <loc>${cfg.siteUrl}${p.url}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${p.changefreq}</changefreq>
        <priority>${p.priority}</priority>
    </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// ── Main generate ─────────────────────────────────────────────────────────────
function generateAll(outputDir, cfg, log) {
  try {
    fs.mkdirSync(path.join(outputDir, 'metali'), { recursive: true });

    const { navbar, footer, pages, metals, bodies } = cfg;

    const files = [
      {
        file: 'index.html',
        html: buildShell({ title: pages.index.title, desc: pages.index.description, cssPath: '/styles.css', scriptPath: '/script.js', body: bodies.index, navbar, footer })
      },
      {
        file: 'o-nama.html',
        html: buildShell({ title: pages.onama.title, desc: pages.onama.description, cssPath: '/styles.css', scriptPath: '/script.js', body: bodies.onama, navbar, footer })
      },
      {
        file: 'kontakt.html',
        html: buildShell({ title: pages.kontakt.title, desc: pages.kontakt.description, cssPath: '/styles.css', scriptPath: '/script.js', body: bodies.kontakt, navbar, footer })
      },
      ...Object.entries(metals).map(([key, m]) => ({
        file: `metali/${key}.html`,
        html: buildShell({
          title: pages[key].title,
          desc: pages[key].description,
          cssPath: '../styles.css',
          scriptPath: '../script.js',
          body: metalBody(m),
          navbar,
          footer
        })
      }))
    ];

    for (const { file, html } of files) {
      fs.writeFileSync(path.join(outputDir, file), html, 'utf8');
      log(`✓ ${file}`);
    }

    fs.writeFileSync(path.join(outputDir, 'script.js'), SCRIPT_JS, 'utf8');
    log('✓ script.js');

    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), generateSitemap(cfg), 'utf8');
    log('✓ sitemap.xml');

    fs.writeFileSync(path.join(outputDir, 'robots.txt'),
      `User-agent: *\nAllow: /\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`, 'utf8');
    log('✓ robots.txt');

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

module.exports = { generateAll, loadConfig, saveConfig };