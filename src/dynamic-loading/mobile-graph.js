if (window.innerWidth <= 900) { // only for mobile
    document.querySelectorAll('.fullscreen-on-touch').forEach(img => {
        img.addEventListener('click', () => img.classList.toggle('zoomed'));
        img.addEventListener('touchstart', () => img.classList.toggle('zoomed'));
    });
}