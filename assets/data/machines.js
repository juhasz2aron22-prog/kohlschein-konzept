/* =====================================================================
   KOHLSCHEIN — Gebrauchtbestand (zentrale Datenquelle)
   Bagger UND Anbaugeräte / Werkzeuge
   ---------------------------------------------------------------------
   Die Einträge unten entsprechen dem realen Gebrauchtbestand (Modelle,
   Baujahre, Betriebsstunden, Gewichte, Preise, Beschreibungen). Bitte
   keine erfundenen Daten ergänzen — nur tatsächlich angebotene Maschinen.
   =====================================================================

   >>> SO STELLEN SIE EINEN NEUEN EINTRAG EIN (Maschine oder Werkzeug) <<<

   1) Foto (Querformat, ca. 1280 px, .jpg) in  assets/img/  legen.
   2) Unten einen neuen Block  { ... },  ergänzen (bestehenden kopieren).
      Komma am Ende nicht vergessen!
   3) Speichern — Karte, Filter und "Anfragen"-Button entstehen automatisch.

   FELDER:
      kategorie  "Bagger"  ODER  "Anbaugerät"        (Kategorie-Filter)
      modell     Hersteller + Modell (Kartenüberschrift)
      bauart     kurze Beschriftung auf dem Bild ("Kettenbagger · 15 t")
      typ        Bauart-Filter: "kette" | "kurzheck" | "mobil" | "anbau"
      gewicht    Einsatzgewicht in Tonnen als Zahl (Gewichts-Filter)
      baujahr    Baujahr als Zahl (Baujahr-Filter)
      stunden    Betriebsstunden als Text ("7.400 Bh") — leer lassen wenn unbekannt
      preis      Preis als Text ("59.500 €", netto/zzgl. MwSt.) oder "Preis auf Anfrage"
      status     "verkauft"  -> Eintrag wird als VERKAUFT markiert (sonst weglassen)
      bild       Pfad zum Hauptfoto
      bilder     (optional) Liste mehrerer Fotos für die Galerie im Detailfenster,
                 z. B.  bilder: ["assets/img/sk75-1.jpg","assets/img/sk75-2.jpg"]
      alt        Bildbeschreibung
      text       Beschreibungstext (Ausstattung)
   ===================================================================== */

window.KOHLSCHEIN_MACHINES = [

  {
    kategorie: "Bagger",
    modell:  "Takeuchi TB1140",
    bauart:  "Kettenbagger · 15 t",
    typ:     "kette",
    gewicht: 15,
    baujahr: 2015,
    stunden: "7.400 Bh",
    preis:   "59.500 €",
    bild:    "assets/img/used/01-takeuchi-tb1140.jpg",
    alt:     "Takeuchi TB1140",
    text:    "Gummikette, Zentralschmieranlage, hydraulischer Schnellwechsler Martin MH18/SW035 auf Powertilt, 3 Tieflöffel, 1 starrer Böschungslöffel"
  },

  {
    kategorie: "Bagger",
    modell:  "B110W Mobilbagger",
    bauart:  "Mobilbagger · 12 t",
    typ:     "mobil",
    gewicht: 12,
    baujahr: 2023,
    stunden: "ca. 1.500 Bh",
    preis:   "Preis auf Anfrage",
    bild:    "assets/img/used/02-b110w-mobilbagger.jpg",
    alt:     "B110W Mobilbagger",
    text:    "Top Zustand, komplette Ausstattung, Zwillingsbereifung, Verstellausleger, Abstützschild, Allradlenkung, 25km/H, Strassenzulassung, Winkelbauer HKS Schwenkmotor mit hydraulischem Schnellwechsler System SW020 bzw. Martin M10, 3 Tieflöffel, 1 starrer Böschungslöffel"
  },

  {
    kategorie: "Bagger",
    modell:  "Kobelco SK85MSR",
    bauart:  "Kurzheckbagger · 8,5 t",
    typ:     "kurzheck",
    gewicht: 8.5,
    baujahr: 2017,
    stunden: "4.200 Bh",
    preis:   "Verkauft",
    status:  "verkauft",
    bild:    "assets/img/used/03-kobelco-sk85msr.jpg",
    alt:     "Kobelco SK85MSR",
    text:    "Gummikette, komplette Ausstattung, Leckölleitung, hydraulischer Schnellwechsler SW020 System/Martin M10 aufgebaut auf Powertilt PT100, Umschaltung Powertilt/Greiferdrehen, Tieflöffel 300mm, 600mm, jeweils vorgezogen mit Schneide, Tieflöffel 1000mm, Böschungslöffel 1600mm, starr"
  },

  {
    kategorie: "Bagger",
    modell:  "Liebherr R936 Compact",
    bauart:  "Kurzheckbagger · 35 t",
    typ:     "kurzheck",
    gewicht: 35,
    baujahr: 2018,
    stunden: "7.540 Bh",
    preis:   "105.000 €",
    bild:    "assets/img/used/04-liebherr-r936-compact.jpg",
    alt:     "Liebherr R936 Compact",
    text:    "Kurzheckbagger, komplette hydraulische Verrohrung, inkl. Dachschutzgitter, hydraulischer Schnellwechsler Engl, 1 Gitterlöffel (Optional auch mit BMT SW3 verfügbar)"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Finlay IC-110RS Prallmühle",
    bauart:  "Prallmühle · 35 t",
    typ:     "anbau",
    gewicht: 35,
    baujahr: 2023,
    stunden: "ca. 400 Bh",
    preis:   "Preis auf Anfrage",
    bild:    "assets/img/used/05-finlay-ic-110rs-prallmuehle.jpg",
    alt:     "Finlay IC-110RS Prallmühle",
    text:    "Aufgeber 3,3m³, inkl. Nachsiebeinheit und Rückführung auch Vermietung möglich"
  },

  {
    kategorie: "Bagger",
    modell:  "Kobelco SK230SRLC-3",
    bauart:  "Kurzheckbagger · 25 t",
    typ:     "kurzheck",
    gewicht: 25,
    baujahr: 2015,
    stunden: "9.950 Bh",
    preis:   "53.000 €",
    bild:    "assets/img/used/06-kobelco-sk230srlc-3.jpg",
    alt:     "Kobelco SK230SRLC-3",
    text:    "Breite 2,99m, Zusatzgegengewicht (+1400kg), komplette hydraulische Verrohrung, Zentralschmieranlage, hydraulischer Schnellwechsler BMT SW2, 2 Tieflöffel, 1 hydraulischer Böschungslöffel"
  },

  {
    kategorie: "Bagger",
    modell:  "Komatsu PC210LC-10",
    bauart:  "Kettenbagger · 22,5 t",
    typ:     "kette",
    gewicht: 22.5,
    baujahr: 2013,
    stunden: "10.200 Bh",
    preis:   "33.000 €",
    bild:    "assets/img/used/07-komatsu-pc210lc-10.jpg",
    alt:     "Komatsu PC210LC-10",
    text:    "komplette hydraulische Verrohrung, hydraulischer Schnellwechsler BMT SW2, 1 Tieflöffel"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "VTN VF23 Pulverisierer",
    bauart:  "Pulverisierer · 2,3 t",
    typ:     "anbau",
    gewicht: 2.3,
    baujahr: 2009,
    stunden: "",
    preis:   "13.900 €",
    bild:    "assets/img/used/08-vtn-vf23-pulverisierer.jpg",
    alt:     "VTN VF23 Pulverisierer",
    text:    "starr, inkl. Anbauplatte BMT SW3, Zähne und Messer neu"
  },

  {
    kategorie: "Bagger",
    modell:  "Kobelco SK300NLC-10",
    bauart:  "Kettenbagger · 31,5 t",
    typ:     "kette",
    gewicht: 31.5,
    baujahr: 2018,
    stunden: "9.250 Bh",
    preis:   "82.000 €",
    bild:    "assets/img/used/09-kobelco-sk300nlc-10.jpg",
    alt:     "Kobelco SK300NLC-10",
    text:    "600mm Ketten (Breite 2,99m), komplette hydraulische Verrohrung, hydr. Schnellwechsler BMT SW3, 1 Tieflöffel (Andere optional verfügbar)"
  },

  {
    kategorie: "Bagger",
    modell:  "Komatsu PC210LC-11",
    bauart:  "Kettenbagger · 23 t",
    typ:     "kette",
    gewicht: 23,
    baujahr: 2019,
    stunden: "8.800 Bh",
    preis:   "59.000 €",
    bild:    "assets/img/used/10-komatsu-pc210lc-11.jpg",
    alt:     "Komatsu PC210LC-11",
    text:    "600mm Platten (Breite 2,99m), komplette hydraulische Verrohrung, Zentralschmieranlage, inkl. hydr. Schnellwechsler BMT SW2, 1 Tieflöffel, 1 hydraulischer Böschungslöffel"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Okada3600 Hydraulikhammer",
    bauart:  "Hydraulikhammer · 2,6 t",
    typ:     "anbau",
    gewicht: 2.6,
    baujahr: 2021,
    stunden: "",
    preis:   "23.000 €",
    bild:    "assets/img/used/11-okada3600-hydraulikhammer.jpg",
    alt:     "Okada3600 Hydraulikhammer",
    text:    "passend für 30-40 to Bagger, generalüberholt, inkl. automatische Schmieranlage, verschiedene Anbauplatten verfügbar, neuer Meißl"
  },

  {
    kategorie: "Bagger",
    modell:  "Hitachi ZX85USBLCN-3",
    bauart:  "Kurzheckbagger · 8,5 t",
    typ:     "kurzheck",
    gewicht: 8.5,
    baujahr: 2011,
    stunden: "7.800 Bh",
    preis:   "29.000 €",
    bild:    "assets/img/used/12-hitachi-zx85usblcn-3.jpg",
    alt:     "Hitachi ZX85USBLCN-3",
    text:    "Stahlkette mit Gummipads, Hammer-/Scherenverrohrung, mechanischer Schnellwechsler Winkelbauer, 3 Tieflöffel, 1 hydraulischer Böschungslöffel"
  },

  {
    kategorie: "Bagger",
    modell:  "YANMAR SV26",
    bauart:  "Minibagger · 2,6 t",
    typ:     "mini",
    gewicht: 2.6,
    baujahr: 2024,
    stunden: "neu",
    preis:   "44.500 €",
    bild:    "assets/img/used/13-yanmar-sv26.jpg",
    alt:     "YANMAR SV26",
    text:    "für 3,5 to Anhänger geeignet, Breite 1,55, Kabine mit Radio und Heizung, komplette hydraulische Verrohrung, hydraulischer Schnellwechsler System SW010 bzw. Martin M03 mit HKS Schwenkantrieb, 2 Tieflöffel, 1 starrer Böschungslöffel 0,99% Finanzierungsaktion möglich"
  },

  {
    kategorie: "Bagger",
    modell:  "Kobelco SK300NLC-10",
    bauart:  "Kettenbagger · 31,5 t",
    typ:     "kette",
    gewicht: 31.5,
    baujahr: 2018,
    stunden: "14.450 Bh",
    preis:   "Verkauft",
    status:  "verkauft",
    bild:    "assets/img/used/14-kobelco-sk300nlc-10.jpg",
    alt:     "Kobelco SK300NLC-10",
    text:    "Breite 2,99m, Laufwerk neuwertig, Zentralschmieranlage, komplette hydraulische Verrohrung, inkl. vollhydraulischer Schnellwechsler Oilquick OQ70/55, 1 Tieflöffel"
  },

  {
    kategorie: "Bagger",
    modell:  "CAT M314 Mobilbagger",
    bauart:  "Mobilbagger · 15,5 t",
    typ:     "mobil",
    gewicht: 15.5,
    baujahr: 2022,
    stunden: "2.300 Bh",
    preis:   "Preis auf Anfrage",
    bild:    "assets/img/used/15-cat-m314-mobilbagger.jpg",
    alt:     "CAT M314 Mobilbagger",
    text:    "Abstütz-/Planierschild, Verstellausleger, Zwillingsbereifung, Zentralschmieranlage, komplette hydraulische Verrohrung, hydraulischer Schnellwechsler BMT SW2 mit HKS Schwenkmotor, 2 Tieflöffel, 1 starrer Böschungslöffel"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "HOLP Rototop RT201",
    bauart:  "Tiltrotator",
    typ:     "anbau",
    gewicht: "",
    baujahr: 2023,
    stunden: "50 Bh",
    preis:   "15.000 €",
    bild:    "assets/img/used/16-holp-rototop-rt201.jpg",
    alt:     "HOLP Rototop RT201",
    text:    "Demogerät, ideal für 12-18 to Maschinen, Aufnahme für Kobelco SK140SRLC (auch Takeuchi TB2150) inkl. hydraulischen Schnellwechsler System SW035/Martin M18"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "HOLP Rototop RT091",
    bauart:  "Tiltrotator",
    typ:     "anbau",
    gewicht: "",
    baujahr: 2023,
    stunden: "50 Bh",
    preis:   "10.000 €",
    bild:    "assets/img/used/17-holp-rototop-rt091.jpg",
    alt:     "HOLP Rototop RT091",
    text:    "Demogerät, ideal für 7-10 to Maschinen, Aufnahme für Kobelco SK85MSR (auch Takeuchi TB290) inkl. hydraulischen Schnellwechsler System SW020/Martin M10"
  },

  {
    kategorie: "Bagger",
    modell:  "YANMAR B110W Mobilbagger",
    bauart:  "Mobilbagger · 1,5 t",
    typ:     "mobil",
    gewicht: 1.5,
    baujahr: 2007,
    stunden: "",
    preis:   "Verkauft",
    status:  "verkauft",
    bild:    "assets/img/used/18-yanmar-b110w-mobilbagger.jpg",
    alt:     "YANMAR B110W Mobilbagger",
    text:    "Zwillingsbereifung ohne Zwischenring, Allradlenkung, Verstellausleger, schweres Gegengewicht, 2 x Werkzeugkiste, komplette hydraulische Verrohrung, hydr. Schnellwechsler auf KHS Schwenkmotor (2x90°), Löffelset, volle Garantie 1,99% Finanzierungsaktion verfügbar Finanzierungs-Aktion (20% Anzahlung): 36 Monate - EUR 3.317,- pro Monat 48 Monate - EUR 2.561,- pro Monat 60 Monate - EUR 2.109,- pro Monat Baujahr: 2023 Stunden: 450 Gewicht: 11,5 to Preis: auf Anfrage weitere Bilder Drucken Wimmer Greifer SG 3.0 Abbruch-/ Sortiergreifer, passend für 21-28 to Bagger (Breite 850mm, Öffnungsweite 2000 mm, Inhalt ca. 600Liter, Wechselschneiden, inkl. Anbauplatte Winkelbauer XL"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Grammer Sitz Kobelco",
    bauart:  "Fahrersitz",
    typ:     "anbau",
    gewicht: "",
    baujahr: 2025,
    stunden: "neu",
    preis:   "1.500 €",
    bild:    "assets/img/used/19-grammer-sitz-kobelco.jpg",
    alt:     "Grammer Sitz Kobelco",
    text:    "neuwertig, luftgefederter, beheizter Sitz (24 Volt), inkl. Kopfstützte, ohne Armlehnen, Bodensockel passend zu Kobelco -7 und -11 Serie."
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Wimmer Top Cut 550S Schrottschere",
    bauart:  "Schrottschere · 1,9 t",
    typ:     "anbau",
    gewicht: 1.9,
    baujahr: 2008,
    stunden: "",
    preis:   "17.500 €",
    bild:    "assets/img/used/20-wimmer-top-cut-550s-schrottschere.jpg",
    alt:     "Wimmer Top Cut 550S Schrottschere",
    text:    "Wimmer Schrottschere inkl. Rotation, einsatzbereit, max. Schnittkraft 400to, inkl. Anbauplatte Winkelbauer XL"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Diverses Zubehör",
    bauart:  "Zubehör",
    typ:     "anbau",
    gewicht: "",
    baujahr: 2021,
    stunden: "neu",
    preis:   "Preis auf Anfrage",
    bild:    "assets/img/used/21-diverses-zubehoer.jpg",
    alt:     "Diverses Zubehör",
    text:    "Über 500 Löffel lagernd - Tieflöffel, hydraulische und starre Böschungslöffel, Reißzähne, Sieblöffel, etc. verschiedenster Größen für 1 bis 35to Bagger. (z.B. Systeme Geel/Martin M03, M10, M18, Baumaschinentechnik SW2/SW3, Oilquick OQ70/55, OQ80). Anfragen bitte an Markus Focke-Trinkl unter 0664/88180820 oder markus.focke@kohlschein.at"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "MTB85 Hydraulikhammer",
    bauart:  "Hydraulikhammer",
    typ:     "anbau",
    gewicht: "",
    baujahr: "",
    stunden: "",
    preis:   "7.900 €",
    bild:    "assets/img/used/22-mtb85-hydraulikhammer.jpg",
    alt:     "MTB85 Hydraulikhammer",
    text:    "passend zu 9-15 to Bagger, inkl. Anbauplatte SW035/Martin M18"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Motorhaube Terex TW85",
    bauart:  "Ersatzteil",
    typ:     "anbau",
    gewicht: "",
    baujahr: "",
    stunden: "neu",
    preis:   "Preis auf Anfrage",
    bild:    "assets/img/used/23-motorhaube-terex-tw85.jpg",
    alt:     "Motorhaube Terex TW85",
    text:    "Motorhaube für Terex TW85 Artikelnummer: 0.2390.280.95"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Kinshofer D27 Abbruch-/Sortiergreifer",
    bauart:  "Sortiergreifer · 1,8 t",
    typ:     "anbau",
    gewicht: 1.8,
    baujahr: "",
    stunden: "",
    preis:   "12.900 €",
    bild:    "assets/img/used/24-kinshofer-d27-abbruch-sortiergreif.jpg",
    alt:     "Kinshofer D27 Abbruch-/Sortiergreifer",
    text:    "Abbruch-/ Sortiergreifer mit Gitterstäben, passend für 21-28 to Bagger (Breite 1150mm, Öffnungsweite 2145mm, Inhalt 800Liter, Gewicht ca. 1800kg), Wechselschneiden, inkl. Anbauplatte Winkelbauer XL oder BMT SW2"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Abbruch-/Sortiergreifer PMZ15C",
    bauart:  "Sortiergreifer",
    typ:     "anbau",
    gewicht: "",
    baujahr: 2023,
    stunden: "neuwertig",
    preis:   "16.900 €",
    bild:    "assets/img/used/25-abbruch-sortiergreifer-pmz15c.jpg",
    alt:     "Abbruch-/Sortiergreifer PMZ15C",
    text:    "Ideal passend zu 20-26to Bagger, Inhalt 800 Liter, Schließkraft 11to, Endlosrotation mit 2 Drehmotoren, komplette inkl. BMT SW2 Anbauplatte, Schläuche"
  },

  {
    kategorie: "Anbaugerät",
    modell:  "Diverse Ausleger und Stiele",
    bauart:  "Ausleger & Stiele",
    typ:     "anbau",
    gewicht: "",
    baujahr: "",
    stunden: "",
    preis:   "ab 1.500 €",
    bild:    "assets/img/used/26-diverse-ausleger-und-stiele.jpg",
    alt:     "Diverse Ausleger und Stiele",
    text:    "Diverse Ausleger und Stiele von Kobelco, Hitachi und Terex. Alle neuwertig. Preise zwischen EUR 1.500,- und 10.000,- Hitachi ZX210W-3: Stiel 2,41 m Hitachi ZX170W-3: Stiel 2,26 m Terex TW110: Stiel 2,02 m Terex: Stiel 1,64 m Kobelco Ausleger für SK250 Hitachi Ausleger ZX210 Kobelco Ausleger & Stiel SK350 Kobelco SK200SR Offset"
  }

];
