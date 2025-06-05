//?
const btnPedido = document.getElementById('btn-pedido');
const btnArquivo = document.getElementById('btn-arquivo');

const secaoPedido = document.getElementById('pedido-form');
const secaoGaleria = document.getElementById('galeria-arquivo');

btnPedido.addEventListener('click', () => {
  btnPedido.classList.add('ativo');
  btnArquivo.classList.remove('ativo');
  secaoPedido.style.display = 'block';
  secaoGaleria.style.display = 'none';
});

btnArquivo.addEventListener('click', () => {
  btnArquivo.classList.add('ativo');
  btnPedido.classList.remove('ativo');
  secaoPedido.style.display = 'none';
  secaoGaleria.style.display = 'block';
});

//POP UM ENCOMENDAS PERSONALIZADAS - CONFIRMADO
document.querySelectorAll('.frame .foto img').forEach(img => {
    img.addEventListener('click', () => {
      const popup = document.getElementById('popup');
      const popupImg = popup.querySelector('.popup-img');
      popupImg.src = img.src;
      popup.classList.remove('hidden');
    });
  });

  document.querySelector('#popup .close').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
  });

  // Clica fora da imagem para fechar
  document.getElementById('popup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
    }
});