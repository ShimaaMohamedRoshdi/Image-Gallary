// script.js
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const intervalTime = 3000; // Time between slides in milliseconds
let slideInterval;

function showSlide(index) {
    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = index;
    }
    document.querySelector('.slides').style.transform = `translateX(-${slideIndex * 100}%)`;
    updatePagination();
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

function startSlideInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
}

function stopSlideInterval() {
    clearInterval(slideInterval);
}

function createPagination() {
    const paginationContainer = document.querySelector('.pagination');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => showSlide(i));
        paginationContainer.appendChild(dot);
    }
    updatePagination();
}

function updatePagination() {
    const dots = document.querySelectorAll('.pagination span');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

function initSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector('.slider');

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX > touchEndX + 50) {
            nextSlide();
        } else if (touchStartX < touchEndX - 50) {
            prevSlide();
        }
    });
}

// Initialize slider
showSlide(slideIndex);
startSlideInterval();
createPagination();
initSwipe();

// Pause the slider on hover
document.querySelector('.slider').addEventListener('mouseover', stopSlideInterval);
document.querySelector('.slider').addEventListener('mouseout', startSlideInterval);
