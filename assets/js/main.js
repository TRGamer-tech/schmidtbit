/* ==========================================================================
   SchmidtBit — Interaktion & Motion
   GSAP (selbst gehostet) + Vanilla JS. Kein jQuery, kein Framework.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var reduceMotion = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var hasGsap = typeof window.gsap !== "undefined";

  if (hasGsap) {
    try {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrambleTextPlugin);
    } catch (e) {
      hasGsap = false; // Motion ist optional — Kernfunktionen bleiben intakt
    }
  }

  /* ----------------------------------------------------------------------
     Sprache (DE/EN) — kompatibel zum bisherigen localStorage-Key
     ---------------------------------------------------------------------- */
  function currentLang() {
    return document.documentElement.lang === "en" ? "en" : "de";
  }
  function applyLangTexts() {
    var l = currentLang();
    $$("[data-de][data-en]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + l);
    });
  }
  function setLang(l) {
    document.documentElement.lang = l;
    try { localStorage.setItem("language", l); } catch (e) { /* privat */ }
    $$("[data-setlang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-setlang") === l));
    });
    applyLangTexts();
  }
  $$(".lang").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(currentLang() === "de" ? "en" : "de");
    });
  });
  $$("[data-setlang]").forEach(function (b) {
    b.setAttribute("aria-pressed", String(b.getAttribute("data-setlang") === currentLang()));
  });

  /* ----------------------------------------------------------------------
     Theme (Dark/Light)
     ---------------------------------------------------------------------- */
  var themeBtn = $(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("sb-theme", next); } catch (e) { /* privat */ }
    });
  }

  /* ----------------------------------------------------------------------
     Header: kompakt beim Scrollen
     ---------------------------------------------------------------------- */
  var head = $("#site-head");
  function onScrollHead() {
    if (!head) return;
    head.classList.toggle("is-stuck", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScrollHead, { passive: true });
  onScrollHead();

  /* ----------------------------------------------------------------------
     Mobile-Menü
     ---------------------------------------------------------------------- */
  var burger = $("#burger");
  var menu = $("#mobile-menu");
  function setMenu(open) {
    if (!menu || !burger) return;
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open && hasGsap && !reduceMotion) {
      gsap.fromTo($$("a, p", menu), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", delay: 0.12, overwrite: true });
    }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
    });
  }

  /* ----------------------------------------------------------------------
     Uhr (Europe/Zurich)
     ---------------------------------------------------------------------- */
  function tickClock() {
    var txt;
    try {
      txt = new Intl.DateTimeFormat("de-CH", {
        timeZone: "Europe/Zurich", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      }).format(new Date());
    } catch (e) {
      txt = new Date().toTimeString().slice(0, 8);
    }
    ["vf-clock", "mm-clock"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = txt;
    });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ----------------------------------------------------------------------
     Toast
     ---------------------------------------------------------------------- */
  var toastEl = $("#toast");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 4200);
  }

  /* ----------------------------------------------------------------------
     Kontaktformular → öffnet Mailprogramm (kein Server, kein Tracking)
     ---------------------------------------------------------------------- */
  var form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var hp = form.elements["bot-field"];
      if (hp && hp.value !== "") { // Bot ausgesperrt, freundlich genickt
        form.reset();
        toast(currentLang() === "de" ? "Danke! Wir melden uns." : "Thanks! We'll be in touch.");
        return;
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = form.elements.name.value.trim();
      var mail = form.elements.email.value.trim();
      var subj = form.elements.subject.value.trim();
      var msg = form.elements.message.value.trim();
      var body =
        (currentLang() === "de" ? "Name: " : "Name: ") + name + "\n" +
        "E-Mail: " + mail + "\n\n" + msg + "\n\n—\n" +
        (currentLang() === "de" ? "Gesendet über schmidtbit.ch" : "Sent via schmidtbit.ch");
      var href = "mailto:martinschmidt1107@gmail.com" +
        "?subject=" + encodeURIComponent("[SchmidtBit] " + subj) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      toast(currentLang() === "de"
        ? "Dein E-Mail-Programm öffnet sich mit der fertigen Nachricht."
        : "Your mail app is opening with the finished message.");
      form.reset();
    });
  }

  /* ----------------------------------------------------------------------
     Sanftes Scrollen zu Ankern
     ---------------------------------------------------------------------- */
  function headerOffset() {
    return (head ? head.offsetHeight : 60) + 12;
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      setMenu(false);
      var y = target.getBoundingClientRect().top + window.scrollY - headerOffset();
      if (id === "#top") y = 0;
      if (hasGsap && !reduceMotion) {
        gsap.to(window, { scrollTo: { y: Math.max(y, 0) }, duration: 1.05, ease: "power3.inOut" });
      } else {
        window.scrollTo({ top: Math.max(y, 0), behavior: "auto" });
      }
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ----------------------------------------------------------------------
     Footer-Jahr
     ---------------------------------------------------------------------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ======================================================================
     Motion — nur wenn GSAP da ist und Motion erlaubt ist
     ====================================================================== */
  if (!hasGsap || reduceMotion) return;

  document.documentElement.classList.add("anim");

  var intro = $("#intro");
  var master = gsap.timeline();

  /* --- Intro-Overlay ---------------------------------------------------- */
  if (intro) {
    var count = { v: 0 };
    var countEl = $("#intro-count");
    master.to(count, {
      v: 100, duration: 1.0, ease: "power2.inOut",
      onUpdate: function () {
        if (countEl) countEl.textContent = String(Math.round(count.v)).padStart(3, "0");
      }
    }, 0);
    master.fromTo($(".intro-bar", intro), { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: "power2.inOut" }, 0);
    master.fromTo($(".intro-mark", intro), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power4.out" }, 0);
    master.to(intro, {
      yPercent: -100, duration: 0.75, ease: "power4.inOut",
      onComplete: function () { intro.style.display = "none"; }
    }, 1.05);
  }

  /* --- Hero -------------------------------------------------------------- */
  var heroT = (intro ? 1.15 : 0);
  master.to(".hero h1 .line > span", { y: 0, duration: 1.15, stagger: 0.11, ease: "power4.out" }, heroT);
  master.fromTo(".hero-side > *", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, heroT + 0.35);
  master.fromTo(".vf .c", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" }, heroT + 0.2);
  master.fromTo(".vf .readout", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, heroT + 0.35);
  master.fromTo(".ticker", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, heroT + 0.45);

  /* Status-Zeile: Scramble-Decodierung */
  var statusEl = $("#vf-status");
  if (statusEl) {
    master.to(statusEl, {
      duration: 1.1,
      ease: "none",
      scrambleText: {
        text: statusEl.textContent,
        chars: "█▓▒░#/<>01",
        reveal: "left",
        tweenLength: false
      }
    }, heroT + 0.5);
  }

  /* --- Überschriften mit Zeilenmaske (Stagger pro Block) ------------------ */
  $$(".h2, .page-head h1").forEach(function (block) {
    var spans = $$(".line > span", block);
    if (!spans.length) return;
    gsap.from(spans, {
      yPercent: 112, duration: 1.05, stagger: 0.1, ease: "power4.out",
      scrollTrigger: { trigger: block, start: "top 84%" },
      overwrite: true
    });
  });

  /* --- Eyebrows & Notizen -------------------------------------------------- */
  gsap.utils.toArray(".eyebrow").forEach(function (el) {
    gsap.from(el, { opacity: 0, x: -22, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  gsap.utils.toArray(".section-head .note, .profile-text p, .profile-text .lead").forEach(function (el) {
    gsap.from(el, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  /* --- Leistungszeilen ------------------------------------------------------ */
  $$("[data-stagger]").forEach(function (group) {
    gsap.from(group.children, {
      opacity: 0, y: 38, duration: 0.85, stagger: 0.09, ease: "power3.out",
      scrollTrigger: { trigger: group, start: "top 80%" }
    });
  });

  /* --- Projekte: Clip-Reveal, Parallax, Info -------------------------------- */
  $$(".work-item").forEach(function (item) {
    var media = $(".work-media", item);
    var img = media ? $("img", media) : null;
    if (media) {
      gsap.fromTo(media,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.15, ease: "power4.inOut", scrollTrigger: { trigger: media, start: "top 78%" } });
    }
    if (img) {
      gsap.fromTo(img,
        { yPercent: 12, scale: 1.14 },
        { yPercent: -10, scale: 1.06, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
    }
    gsap.from($$(".work-info > *", item), {
      opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 70%" }
    });
  });

  /* --- Fakten & Stack-Meter --------------------------------------------------- */
  gsap.from(".facts", { opacity: 0, y: 26, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".facts", start: "top 88%" } });

  var stack = $("[data-meters]");
  if (stack) {
    var fills = $$(".meter-fill", stack);
    var counters = $$("[data-count]", stack);
    ScrollTrigger.create({
      trigger: stack, start: "top 80%", once: true,
      onEnter: function () {
        fills.forEach(function (fill, i) {
          var v = parseFloat((fill.style.getPropertyValue("--v") || "1").replace(",", "."));
          gsap.fromTo(fill, { scaleX: 0 }, { scaleX: v, duration: 1.2, delay: i * 0.12, ease: "power3.inOut" });
        });
        counters.forEach(function (c, i) {
          var target = parseInt(c.getAttribute("data-count"), 10) || 0;
          var obj = { n: 0 };
          gsap.to(obj, {
            n: target, duration: 1.2, delay: i * 0.12, ease: "power3.inOut",
            onUpdate: function () { c.textContent = Math.round(obj.n) + "%"; }
          });
        });
      }
    });
    gsap.from(stack, { opacity: 0, y: 34, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: stack, start: "top 85%" } });
  }

  /* --- Kontakt-Band ------------------------------------------------------------- */
  gsap.from(".reach .mail", { opacity: 0, y: 44, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".reach", start: "top 70%" } });
  gsap.from(".reach-list > div", { opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".reach-list", start: "top 88%" } });
  gsap.from(".form > *", { opacity: 0, y: 26, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".form", start: "top 85%" } });

  /* --- Footer-Marke ---------------------------------------------------------------- */
  gsap.from(".foot-mark", { opacity: 0, yPercent: 24, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: ".site-foot", start: "top 92%" } });

  /* --- Aktiver Navigationspunkt ------------------------------------------------------- */
  [["leistungen"], ["arbeit"], ["profil"], ["kontakt"]].forEach(function (pair) {
    var id = pair[0];
    var sec = document.getElementById(id);
    var link = $('.site-nav a[href="#' + id + '"]');
    if (!sec || !link) return;
    ScrollTrigger.create({
      trigger: sec, start: "top 55%", end: "bottom 55%",
      onToggle: function (self) {
        if (self.isActive) {
          $$(".site-nav a").forEach(function (a) { a.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      }
    });
  });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
