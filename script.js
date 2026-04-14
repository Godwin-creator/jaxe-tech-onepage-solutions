// Page loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.add('hidden');
    }, 1500);
});

// Nav scroll effect
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    const backTop = document.getElementById('back-top');
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
function closeMobileNav() { mobileNav?.classList.remove('open'); }
hamburger?.addEventListener('click', () => mobileNav?.classList.add('open'));
mobileClose?.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', closeMobileNav));

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') document.body.classList.add('dark');
themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = themeToggle.querySelector('i');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth scroll offset (fixe header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || !targetId) return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const pos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
            closeMobileNav();
        }
    });
});

// Contact form validation & simulation
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    let errors = [];
    if (!name) errors.push('Nom requis');
    if (!email) errors.push('Email requis');
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Email invalide');
    if (!message) errors.push('Message requis');
    if (errors.length) {
        feedback.innerHTML = `<div class="alert-error" style="background:#fee2e2; padding:0.8rem; border-radius:40px; color:#b91c1c;">${errors.join(' • ')}</div>`;
        return;
    }
    feedback.innerHTML = `<div class="form-success"><i class="fas fa-check-circle"></i> Merci ${name} ! Votre demande a été transmise. Nous vous répondons sous 24h.</div>`;
    form.reset();
    setTimeout(() => feedback.innerHTML = '', 5000);
});