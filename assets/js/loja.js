// Display de fotografias clicáveis
const thumbs = document.querySelectorAll('.thumb');
const imagemGrande = document.getElementById('imagem-grande');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    // Atualiza imagem principal
    imagemGrande.src = thumb.dataset.full;

    // Atualiza o estado ativo das thumbs
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});


// Swiper galeria telemovel
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  
  preventClicks: false,
  preventClicksPropagation: false,
});