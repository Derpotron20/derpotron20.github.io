if (window.innerWidth <= 900) { // mobile only
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.fullscreen-on-touch').forEach(img => {
            let holdTimeout;
            let isHolding = false;

            // Handle touchstart for hold
            img.addEventListener('touchstart', e => {
                isHolding = false;
                holdTimeout = setTimeout(() => {
                    img.classList.add('zoomed');
                    isHolding = true; // mark as hold
                }, 300); // 300ms to detect hold
            });

            // Handle touchend
            img.addEventListener('touchend', e => {
                clearTimeout(holdTimeout);
                if (isHolding) {
                    // If it was a hold, remove zoom on release
                    img.classList.remove('zoomed');
                } else {
                    // If it was a tap, toggle zoom
                    img.classList.toggle('zoomed');
                }
            });

            // Optional: also allow click for devices that send click events
            img.addEventListener('click', e => {
                // Only toggle if not already zoomed via hold
                if (!isHolding) {
                    img.classList.toggle('zoomed');
                }
            });
        });
    });
}
