document.addEventListener('DOMContentLoaded', function () {
  // Crear o actualizar el contador al cargar la página
  function actualizarContador(count) {
    let contador = document.querySelector('.cart-count');
    if (!contador) {
      contador = document.createElement('span');
      contador.classList.add('cart-count');
      document.querySelector('.cart-link').appendChild(contador);
    }
    contador.textContent = count;
  }

  // Inicializar contador con valor de localStorage o 0
  let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
  actualizarContador(cartCount);

  // Sumar al contador al hacer clic en "Comprar"
  document.querySelectorAll('.boton-comprar').forEach(boton => {
    boton.addEventListener('click', () => {
      cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
      cartCount++;
      localStorage.setItem('cartCount', cartCount);
      actualizarContador(cartCount);
    });
  });

  // Finalizar compra: reiniciar contador
  const finalizarBtn = document.getElementById('finalizar-compra');
  if (finalizarBtn) {
    finalizarBtn.addEventListener('click', () => {
      localStorage.removeItem('cartCount');
      cartCount = 0;
      actualizarContador(cartCount);
    });
  }

  // Sincronizar entre pestañas
  window.addEventListener('storage', (e) => {
    if (e.key === 'cartCount') {
      actualizarContador(e.newValue || 0);
    }
  });
});
