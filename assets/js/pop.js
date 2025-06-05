//POP UP COLEÇÃO MOBILE + DESKTOP - CONFIRMADO
const isMobile = window.innerWidth < 900;

// ========== MOBILE SWIPER POPUP ==========
if (isMobile) {
  const swiperPopup = new Swiper('.swiper-popup', {
    pagination: { el: '.swiper-pagination' },
    loop: true
  });

  const galleryImages = document.querySelectorAll('.swiper-slide img');

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      document.getElementById('swiper-popup').classList.remove('hidden');
      swiperPopup.slideToLoop(index);
    });
  });

  document.querySelector('.popup .close').addEventListener('click', () => {
    document.getElementById('swiper-popup').classList.add('hidden');
  });

  // Swipe down para fechar
  let startY = 0;
  const popup = document.getElementById('swiper-popup');

  popup.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  popup.addEventListener('touchmove', (e) => {
    const endY = e.touches[0].clientY;
    if (startY && endY - startY > 100) {
      popup.classList.add('hidden');
      startY = 0;
    }
  });
}

// ========== DESKTOP ZOOM ==========
if (!isMobile) {
  const mainImg = document.querySelector('#imagem-grande');
  const zoomBox = document.createElement('div');
  zoomBox.classList.add('zoom-box');
  const zoomImg = document.createElement('img');
  zoomBox.appendChild(zoomImg);
  document.body.appendChild(zoomBox);

  mainImg.addEventListener('mouseenter', () => {
    zoomImg.src = mainImg.src;
    zoomBox.style.display = 'block';
  });

  mainImg.addEventListener('mouseleave', () => {
    zoomBox.style.display = 'none';
  });

  mainImg.addEventListener('mousemove', (e) => {
    const rect = mainImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    zoomBox.style.left = `${e.pageX + 20}px`;
    zoomBox.style.top = `${e.pageY - 100}px`;

    zoomImg.style.left = `${-percentX * zoomImg.width + zoomBox.clientWidth / 2}px`;
    zoomImg.style.top = `${-percentY * zoomImg.height + zoomBox.clientHeight / 2}px`;
  });
}
