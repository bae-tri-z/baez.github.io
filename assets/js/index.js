// Slider início
let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides-fade");
let dots = document.getElementsByClassName("dot");
let slideshowContainer = document.getElementById("slideshow-container");
let slideInterval = setInterval(showSlides, 3000);

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        dots[i].classList.remove("active");
    }
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].style.display = "block";  
    dots[slideIndex].classList.add("active");
}

function showSlide(n) {
    clearInterval(slideInterval); // parar autoplay ao interagir
    slideIndex = n;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        dots[i].classList.remove("active");
    }
    slides[n].style.display = "block";
    dots[n].classList.add("active");
    slideInterval = setInterval(showSlides, 3500); // reiniciar autoplay
}

// Clique nos dots
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
        showSlide(parseInt(this.getAttribute("data-index")));
    });
}

// Inicializar primeiro slide
showSlide(slideIndex);