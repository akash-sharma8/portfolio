// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const navMenu = document.querySelector('.main-nav ul');
      if (navMenu && getComputedStyle(navMenu).display !== 'flex') {
        navMenu.classList.add('hidden');
      }
    }
  }
});

// Toggle mobile navigation
const toggleBtn = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav ul');

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
}

// Reveal elements on scroll
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu || !toggleBtn) return;

  const clickedOutside = !navMenu.contains(e.target) && !toggleBtn.contains(e.target);
  const isMobile = window.innerWidth < 600;

  if (clickedOutside && isMobile) {
    navMenu.classList.add('hidden');
  }
});