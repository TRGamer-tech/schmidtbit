console.log('main.js loaded and executing!'); // Added for debugging

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
                }, 120);


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

    // --- Form Validation ---
    // --- Honeycomb Background Generation ---
    function initHoneycomb() {
        const socket = document.querySelector('.socket');
        if (!socket) return;
        
        socket.innerHTML = '';
        
        // Get size from CSS variable or use default
        const style = getComputedStyle(document.querySelector('.background-honeycomb') || document.documentElement);
        const hexWidth = parseInt(style.getPropertyValue('--hex-w')) || 120;
        const hexHeight = hexWidth * 0.866;
        const hSpacing = hexWidth * 0.75;
        const vSpacing = hexHeight;
        
        const cols = Math.ceil(window.innerWidth / hSpacing) + 1;
        const rows = Math.ceil(window.innerHeight / vSpacing) + 1;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const maxDist = Math.sqrt(centerX**2 + centerY**2);
        
        const fragment = document.createDocumentFragment();
        
        for (let r = -2; r < rows; r++) {
            for (let c = -2; c < cols; c++) {
                // Seamless honeycomb math with zero gaps
                const hStep = hexWidth; 
                const vStep = hexWidth * 0.866; 
                
                const x = c * hStep + (r % 2 === 0 ? 0 : hStep / 2);
                const y = r * vStep;
                
                const gel = document.createElement('div');
                gel.className = 'gel';
                gel.style.left = `${x}px`;
                gel.style.top = `${y}px`;
                
                const dx = x - centerX;
                const dy = y - centerY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const delay = (dist / maxDist) * 3; // Waves spread out
                
                gel.style.animationDelay = `${delay}s`;
                
                gel.innerHTML = `
                    <div class="hex-brick h1" style="animation-delay: ${delay}s"></div>
                    <div class="hex-brick h2" style="animation-delay: ${delay}s"></div>
                    <div class="hex-brick h3" style="animation-delay: ${delay}s"></div>
                `;
                fragment.appendChild(gel);
            }
        }
        socket.appendChild(fragment);
    }

    initHoneycomb();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initHoneycomb, 250);
    });

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            console.log('Default form submission prevented.');

            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailValue = emailInput.value;

            // Explicit JavaScript regex validation
            const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}$");

            if (!emailRegex.test(emailValue)) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500'); // Add a visual cue for error
            } else {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-red-500'); // Remove error cue
                // If valid, proceed with form submission
                console.log('Email is valid, submitting form.');
                form.submit(); // Submit the form
            }
        });
    }
});