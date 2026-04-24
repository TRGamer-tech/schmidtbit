console.log("main.js loaded and executing!"); // Added for debugging

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const internalLinks = document.querySelectorAll(
    'a:not([href^="http"]):not([href^="#"])',
  );

  // --- Page Load Animation ---
  if (loader) {
    // Force a reflow before adding the class to ensure animation triggers
    void loader.offsetWidth;
    loader.classList.add("is-entering");
  }

  window.addEventListener("load", () => {
    if (loader) {
      // Wait for turtle to reach center (1.5s) then fade out loader.
      setTimeout(() => {
        loader.classList.add("is-hidden");
        if (mainContent) {
          mainContent.classList.remove("opacity-0");
        }
      }, 1800); 
    } else if (mainContent) {
      mainContent.classList.remove("opacity-0");
    }
  });

  // --- Page Exit Animation ---
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const url = link.getAttribute("href");
      if (!url || window.location.href.endsWith(url)) {
        return;
      }
      e.preventDefault();

      if (loader) {
        // Prepare loader: remove hidden state and entering state
        loader.classList.remove("is-hidden");
        loader.classList.remove("is-entering");

        // Force center position briefly
        const turtle = loader.querySelector(".turtle");
        if (turtle) turtle.style.left = "calc(50% - 109px)";

        void loader.offsetWidth; // trigger reflow

        // Start exit animation: swim to right
        loader.classList.add("is-exiting");

        // Navigate after swim animation (1s)
        setTimeout(() => {
          window.location.href = url;
        }, 1000);
      } else {
        window.location.href = url;
      }
    });
  });

  // --- Mobile Menu ---
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("is-active");
      mobileMenuButton.classList.toggle("is-active");
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("is-active");
        mobileMenuButton.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    }

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-active");
        mobileMenuButton.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    });
  }

  // Animations on scroll
  const animatedElements = document.querySelectorAll(".transform");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // --- Copyright Year ---
  const copyrightYearSpan = document.getElementById("copyright-year");
  if (copyrightYearSpan) {
    copyrightYearSpan.textContent = new Date().getFullYear();
  }

  // --- Form Validation ---
  // --- Honeycomb Background Generation ---
  function initHoneycomb() {
    const socket = document.querySelector(".socket");
    if (!socket) return;

    socket.innerHTML = "";

    // Get size from CSS variable or use default
    const style = getComputedStyle(
      document.querySelector(".background-honeycomb") ||
        document.documentElement,
    );
    const hexWidth = parseInt(style.getPropertyValue("--hex-w")) || 120;
    // Precise centering math
    const hStep = hexWidth;
    const vStep = hexWidth * 0.866;

    const cols = Math.ceil(window.innerWidth / hStep) + 4;
    const rows = Math.ceil(window.innerHeight / vStep) + 4;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Start the grid from a centered offset
    const startX = centerX - Math.floor(cols / 2) * hStep;
    const startY = centerY - Math.floor(rows / 2) * vStep;

    const maxDist =
      Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2),
      ) / 2;

    const fragment = document.createDocumentFragment();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * hStep + (r % 2 === 0 ? 0 : hStep / 2);
        const y = startY + r * vStep;

        const gel = document.createElement("div");
        gel.className = "gel";
        gel.style.left = `${x}px`;
        gel.style.top = `${y}px`;

        const dx = x - (centerX - hexWidth / 2); // Adjust for gel center
        const dy = y - (centerY - hexWidth / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const delay = (dist / maxDist) * 2.5; // Ripple speed control

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
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initHoneycomb, 250);
  });

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission
      console.log("Default form submission prevented.");

      const emailInput = document.getElementById("email");
      const emailError = document.getElementById("email-error");
      const emailValue = emailInput.value;

      // Explicit JavaScript regex validation
      const emailRegex = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}$",
      );

      if (!emailRegex.test(emailValue)) {
        emailError.classList.remove("hidden");
        emailInput.classList.add("border-red-500"); // Add a visual cue for error
      } else {
        emailError.classList.add("hidden");
        emailInput.classList.remove("border-red-500"); // Remove error cue
        // If valid, proceed with form submission
        console.log("Email is valid, submitting form.");
        form.submit(); // Submit the form
      }
    });
  }
});
