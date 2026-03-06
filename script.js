// Toggle mobile menu
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
});