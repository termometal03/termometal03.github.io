#!/usr/bin/env node
'use strict';
const path = require('path');
const fs   = require('fs');
const { generateAll, loadConfig } = require('./builder.js');

const args      = process.argv.slice(2);
const outputDir = args[0] || './dist';
const D         = __dirname;  // cli.js is in the builder folder — __dirname works fine in Node

console.log('\n🔨 Termometal Builder — CLI\n');
console.log('   Builder: ' + D);
console.log('   Output:  ' + path.resolve(outputDir) + '\n');

function read(file, fallback='') {
  const p = path.join(D, file);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : fallback;
}

let cfg;
try { cfg = loadConfig(path.join(D, 'site.config.json')); }
catch(e) { console.error('✗ site.config.json:', e.message); process.exit(1); }

// Attach files that live outside config
cfg.navbar  = read('navbar.html');
cfg.footer  = read('footer.html');
cfg.bodies  = {
  index:   read('body-index.html'),
  onama:   read('body-onama.html'),
  kontakt: read('body-kontakt.html'),
};

const start  = Date.now();
const result = generateAll(path.resolve(outputDir), cfg, msg => console.log('  ' + msg));

// Copy CSS to output
const cssPath = path.join(D, 'styles.css');
if (fs.existsSync(cssPath)) {
  fs.copyFileSync(cssPath, path.join(path.resolve(outputDir), 'styles.css'));
  console.log('  ✓ styles.css');
}

if (result.ok) {
  console.log(`\n✓ Gotovo za ${Date.now()-start}ms\n`);
} else {
  console.error('\n✗ Greška:', result.error);
  process.exit(1);
}