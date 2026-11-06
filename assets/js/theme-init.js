/* Läuft synchron im <head>, damit Theme und Sprache vor dem ersten Rendern stehen.
   Bis 2026-11-06 inline; als Datei erlaubt es die strikte Content-Security-Policy (script-src 'self'). */
(function () {
  var d = document.documentElement,
    t,
    l;
  try {
    localStorage.removeItem("sb-theme");
    t =
      window.matchMedia &&
      matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
  } catch (e) {
    t = "dark";
  }
  d.setAttribute("data-theme", t);
  try {
    l = localStorage.getItem("language");
  } catch (e) {
    l = null;
  }
  if (l !== "en" && l !== "de") {
    l = (navigator.language || "de").slice(0, 2) === "en" ? "en" : "de";
  }
  d.lang = l;
})();
