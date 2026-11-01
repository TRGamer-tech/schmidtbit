(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile-Menü
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  var header = document.querySelector(".top");
  if (btn && nav) {
    var setH = function () { document.documentElement.style.setProperty("--hdr", header.getBoundingClientRect().bottom + "px"); };
    var close = function () { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.querySelector(".sr").textContent = "Menü öffnen"; };
    btn.addEventListener("click", function () {
      setH();
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.querySelector(".sr").textContent = open ? "Menü schliessen" : "Menü öffnen";
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", close, { passive: true });
  }

  // Inhalte sanft einblenden
  var els = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 2) * 0.08 + "s"; io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }
})();
