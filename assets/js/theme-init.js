/* Läuft synchron im <head>, damit Theme und Sprache vor dem ersten Rendern stehen.
   Bis 2026-11-06 inline; als Datei erlaubt es die strikte Content-Security-Policy (script-src 'self'). */
(function () {
  var d = document.documentElement,
    t,
    l;
  // Eigene Wahl über den Theme-Schalter (main.js), sonst folgt die Seite dem System
  try {
    t = localStorage.getItem("sb-theme");
  } catch (e) {
    t = null;
  }
  if (t !== "light" && t !== "dark") {
    t =
      window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
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
