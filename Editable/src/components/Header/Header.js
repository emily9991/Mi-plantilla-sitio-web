document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('activo');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isExpanded));
    });
  }
});