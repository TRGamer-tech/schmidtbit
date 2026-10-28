# SchmidtBit

## Wo Webseiten ernst genommen werden

Dies ist das offizielle GitHub für die Seite SchmidtBit. Sie unterliegt der MIT Lizenz und ist somit frei benutzbar.

## Inhalt

- Hauptseite (schmidtbit.ch)
- Unterseiten: Impressum, Datenschutz, Nutzungsbedingungen
- Widget: `it-fotd.html` (IT Fact of the Day, eigenständiges Terminal-Design)

## Design & Technik

- Handgeschriebenes CSS (`assets/css/style.css`), kein Framework, kein CDN
- Variable Fonts selbst gehostet: Anybody (Display) & Instrument Sans (Text) via Fontsource
- Animationen: GSAP + ScrollTrigger/ScrollTo/ScrambleText, ebenfalls selbst gehostet (`assets/js/vendor/`)
- Zweisprachig (DE/EN) über `data-l`-Attribute, gespeichert im localStorage
- Dark/Light-Theme über `data-theme`, gespeichert im localStorage
- `prefers-reduced-motion` wird respektiert: ohne Motion keine Animationen
- Kontaktformular ohne Server: erstellt lokal eine Mail und öffnet das eigene E-Mail-Programm

### Lokale Vorschau

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Infos

Die Webseite wird auf einem eigenen Server gehostet. Aktualisierungen werden nur hier auf GitHub gemacht.

## Lizenz

MIT

**Gratis Webseite, Yayy!**
