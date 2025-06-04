document.addEventListener('DOMContentLoaded', function () {
  let lastScroll = 0;
  window.addEventListener('scroll', function () {
    const now = Date.now();
    if (now - lastScroll > 16) {
      lastScroll = now;
      const heroImg = document.querySelector('.hero-image img');
      if (heroImg) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    }
  });
});