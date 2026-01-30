document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Smooth Reveal
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If the section has internal reveal-boxes, stagger their appearance
                const boxes = entry.target.querySelectorAll('.reveal-box, .stat-item');
                boxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.style.opacity = "1";
                        box.style.transform = "translateY(0)";
                    }, index * 150);
                });
            } else {
                // Remove class to fade out when leaving viewport
                entry.target.classList.remove('visible');

                // Reset children so they re-animate next time
                const boxes = entry.target.querySelectorAll('.reveal-box, .stat-item');
                boxes.forEach((box) => {
                    box.style.opacity = "";
                    box.style.transform = "";
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // 2. Parallax Effect for Large Titles
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const title = document.querySelector('.massive-title');
        if (title) {
            title.style.transform = `translateY(${scrolled * 0.3}px)`;
            title.style.opacity = `${1 - scrolled / 600}`;
        }
    });
});
