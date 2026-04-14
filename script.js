window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("page-loader");
    if (loader) loader.classList.add("hidden");
  }, 1500);
});

const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
  const backTop = document.getElementById("back-top");
  if (backTop) backTop.classList.toggle("visible", window.scrollY > 400);
});

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

function closeMobileNav() {
  mobileNav?.classList.remove("open");
  hamburger?.classList.remove("open");
  hamburger?.setAttribute("aria-label", "Menu");
}

function toggleMobileNav() {
  const isOpen = mobileNav?.classList.contains("open");

  if (isOpen) {
    mobileNav?.classList.remove("open");
    hamburger?.classList.remove("open");
    hamburger?.setAttribute("aria-label", "Menu");
  } else {
    mobileNav?.classList.add("open");
    hamburger?.classList.add("open");
    hamburger?.setAttribute("aria-label", "Fermer le menu");
  }
}

hamburger?.addEventListener("click", (e) => {
  e.preventDefault();
  toggleMobileNav();
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      mobileNav?.classList.remove("open");
      hamburger?.classList.remove("open");
      hamburger?.setAttribute("aria-label", "Menu");
    }, 100);
  });
});

// Dark mode
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") document.body.classList.add("dark");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  const icon = themeToggle.querySelector("i");
  if (icon) icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#" || !targetId) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
      mobileNav?.classList.remove("open");
      hamburger?.classList.remove("open");
      hamburger?.setAttribute("aria-label", "Menu");
    }
  });
});

const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message")?.value.trim();
  let errors = [];
  if (!name) errors.push("Nom requis");
  if (!email) errors.push("Email requis");
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Email invalide");
  if (!message) errors.push("Message requis");
  if (errors.length) {
    feedback.innerHTML = `<div class="alert-error" style="background:#fee2e2; padding:0.8rem; border-radius:40px; color:#b91c1c;">${errors.join(" • ")}</div>`;
    return;
  }
  feedback.innerHTML = `<div class="form-success"><i class="fas fa-check-circle"></i> Merci ${name} ! Votre demande a été transmise. Nous vous répondons sous 24h.</div>`;
  form.reset();
  setTimeout(() => (feedback.innerHTML = ""), 5000);
});

// Back to top button
const backTop = document.getElementById("back-top");
backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});