document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const internalLinks = document.querySelectorAll('a:not([href^="http"]):not([href^="#"])');

    // --- Page Load Animation ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                // Start both animations at the same time for a cross-fade effect
                loader.classList.add('is-flying-out');
                setTimeout(() => {
                    if (mainContent) {
                        mainContent.classList.remove('opacity-0');
                    }
                }, 100);


                // After the loader animation is done, hide it completely
                setTimeout(() => {
                    loader.classList.add('is-hidden');
                }, 1000); // Matches CSS transition duration
            } else if (mainContent) {
                // If there's no loader, just show the content
                mainContent.classList.remove('opacity-0');
            }
        }, 1000); // This is the initial delay to ensure the loader is seen
    });

    // --- Page Exit Animation ---
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            if (!url || window.location.href.endsWith(url)) {
                return;
            }
            e.preventDefault();

            if (loader) {
                // 1. Instantly move loader to the top, off-screen.
                loader.classList.add('no-transition');
                loader.classList.add('is-offscreen-top');
                loader.classList.remove('is-hidden');
                loader.classList.remove('is-flying-out');

                // 2. Force browser to apply styles immediately.
                void loader.offsetWidth;

                // 3. Animate loader into view.
                loader.classList.remove('no-transition');
                loader.classList.remove('is-offscreen-top');

                // 4. Navigate after animation.
                setTimeout(() => {
                    window.location.href = url;
                }, 1000); // Matches CSS transition duration
            }
            else {
                window.location.href = url;
            }
        });
    });

    // --- Mobile Menu ---
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Animations on scroll
    const animatedElements = document.querySelectorAll('.transform');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Copyright Year ---
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }
});