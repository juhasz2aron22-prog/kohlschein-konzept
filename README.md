# Kohlschein — Website-Konzept

Moderner, mehrseitiger Website-Entwurf für die **Kohlschein Baumaschinenhandel GmbH**
(Kobelco Bagger · NPK Anbaugeräte · Gebrauchtmaschinen) aus Wien.

🔗 **Live-Vorschau:** _(GitHub Pages – Link siehe Repository-Einstellungen → Pages)_

## Inhalt / Funktionen

- Startseite, Bagger, Anbaugeräte, Service, Über uns, Kontakt
- **Gebrauchtmaschinen**: aktueller Bestand mit echten Maschinen, Fotos, Baujahr,
  Betriebsstunden, Gewicht und Preisen – mit Filter (Kategorie / Gewicht / Bauart / Baujahr)
- **Detailfenster** beim Klick auf eine Maschine (Daten, Beschreibung, Galerie, „Anfragen“)
- Anfrage füllt das Kontaktformular automatisch mit der gewählten Maschine
- Impressum & Datenschutzerklärung mit den echten Unternehmensdaten

## Technik

Statisches HTML/CSS/JS (kein Build nötig), GSAP für Animationen.
Der Gebrauchtbestand wird aus **`assets/data/machines.js`** erzeugt – ein Eintrag pro Maschine.

## Lokal ansehen

Einfach `index.html` im Browser öffnen (Doppelklick) – oder:

```bash
node .dev-server.js   # danach http://localhost:8732
```

## Status

Konzept/Entwurf. Vor dem Echtbetrieb offen: Formular-Versand (E-Mail), Domain/Hosting,
rechtliche Prüfung von Impressum/Datenschutz, laufende Pflege der Maschinenliste.
