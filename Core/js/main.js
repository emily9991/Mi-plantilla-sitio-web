document.addEventListener('DOMContentLoaded', function () {
  // Menú hamburguesa accesible
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('activo');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isExpanded));
    });
  }

  // Parallax hero image
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

  // Crear contador
  const cartIcon = document.querySelector('.fa-shopping-cart')?.parentNode;
  let cartCount;

  if (cartIcon && !cartIcon.querySelector('.cart-count')) {
    cartCount = document.createElement('span');
    cartCount.classList.add('cart-count');
    cartCount.setAttribute('aria-label', 'Cantidad de productos en el carrito');
    cartCount.setAttribute('role', 'status');
    cartIcon.appendChild(cartCount);
  } else {
    cartCount = cartIcon?.querySelector('.cart-count');
  }

  if (cartCount) {
    // Inicializar contador desde localStorage
    cartCount.textContent = localStorage.getItem('cartCount') || '0';

    // Agregar productos al carrito
    document.querySelectorAll('.boton-comprar').forEach(btn => {
      btn.addEventListener('click', () => {
        let current = parseInt(localStorage.getItem('cartCount'), 10);
        let count = Number.isNaN(current) ? 1 : current + 1;
        localStorage.setItem('cartCount', count);
        cartCount.textContent = count;

        // Animación visual
        cartCount.classList.add('animar');
        setTimeout(() => cartCount.classList.remove('animar'), 300);
      });
    });

    // Botón para vaciar carrito
    const clearCartBtn = document.querySelector('.vaciar-carrito');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        localStorage.setItem('cartCount', '0');
        cartCount.textContent = '0';
      });
    }

    // Sincronizar entre pestañas
    window.addEventListener('storage', (e) => {
      if (e.key === 'cartCount') {
        cartCount.textContent = e.newValue;
      }
    });
  }

  // Finalizar compra
  const finalizarBtn = document.getElementById('finalizar-compra');
  if (finalizarBtn) {
    finalizarBtn.addEventListener('click', () => {
      localStorage.removeItem('cartCount');
      const contador = document.querySelector('.cart-count');
      if (contador) contador.textContent = '0';
    });
  }
});
