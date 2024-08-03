document.addEventListener('DOMContentLoaded', function () {
    const slideshowImages = [
        './assets/sound1.jpg',
        './assets/sound2.jpg',
        './assets/sound3.jpg',
        './assets/sound4.jpg',

    ];
    
    let currentImageIndex = 0;
    const slideshowContainer = document.createElement('div');
    slideshowContainer.className = 'slideshow-container';
    
    slideshowImages.forEach((src, index) => {
        const img = document.createElement('div');
        img.className = 'slideshow-background';
        img.style.backgroundImage = `url(${src})`;
        if (index !== 0) img.classList.add('fade');
        slideshowContainer.appendChild(img);
    });
    
    document.querySelector('.main-content').appendChild(slideshowContainer);
    
    function showNextImage() {
        const images = slideshowContainer.querySelectorAll('.slideshow-background');
        images[currentImageIndex].classList.add('fade');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.remove('fade');
    }
    
    setInterval(showNextImage, 5000); // Change image every 5 seconds
});
