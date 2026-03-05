// Show different pages
function showPage(pageName) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    document.getElementById(pageName + 'Page').classList.add('active');
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        document.getElementById('mainNav').classList.remove('active');
    }
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show product detail page
function showProduct(productId) {
    const product = window.productsData[productId];
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Update product details
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productDescription').textContent = product.description;
    
    // Update product types
    const typesList = document.getElementById('productTypes');
    typesList.innerHTML = '';
    product.types.forEach(type => {
        const li = document.createElement('li');
        li.textContent = type;
        typesList.appendChild(li);
    });
    
    // Update product specs
    const specsList = document.getElementById('productSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
    
    // Show product page
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('productPage').classList.add('active');
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        document.getElementById('mainNav').classList.remove('active');
    }
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Toggle mobile menu
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && 
        nav && 
        menuBtn &&
        !nav.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        nav.classList.remove('active');
    }
});

// Close dropdown menu on mobile after clicking
if (window.innerWidth <= 768) {
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('mainNav').classList.remove('active');
        });
    });
}