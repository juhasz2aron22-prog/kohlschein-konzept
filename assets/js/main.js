/* =====================================================================
   KOHLSCHEIN — main.js
   Interaktionen: Nav-Scroll-State, Burger, Scroll-Reveal (GSAP),
   Marquee, Counter, Seitenübergang-Curtain.
   Vanilla JS, defer-kompatibel. Guards für GSAP & reduced-motion.
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var body = doc.body;
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = hasGSAP && typeof window.ScrollTrigger !== "undefined";

  // Markiere, dass JS aktiv ist (CSS no-js Fallback)
  doc.documentElement.classList.remove("no-js");

  if (hasST) {
    try { gsap.registerPlugin(ScrollTrigger); } catch (e) { /* noop */ }
  }

  /* -----------------------------------------------------------------
     0) GEBRAUCHTMASCHINEN — Karten aus Datenquelle (machines.js) rendern.
        Läuft VOR dem Reveal-Modul, damit die erzeugten Karten animiert
        werden und vom Filter erfasst sind.
     ----------------------------------------------------------------- */
  (function renderMachines() {
    var grid = doc.querySelector("[data-machine-grid]");
    if (!grid || !window.KOHLSCHEIN_MACHINES || !window.KOHLSCHEIN_MACHINES.length) return;
    function esc(s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    }
    function arrow() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    }
    grid.innerHTML = window.KOHLSCHEIN_MACHINES.map(function (m, i) {
      var verkauft = String(m.status || "").toLowerCase() === "verkauft";
      var preis = verkauft ? "Verkauft" : (m.preis || "Preis auf Anfrage");
      var hasPrice = !verkauft && /\d/.test(preis);
      var kat = String(m.kategorie || "").toLowerCase().indexOf("anbau") === 0 ? "anbau" : "bagger";
      var priceHtml = '<div class="card__price' + (hasPrice ? '' : ' card__price--ask') + '">' +
          '<span class="card__price-val">' + esc(preis) + '</span>' +
          (hasPrice ? '<span class="card__price-note">netto, zzgl. MwSt.</span>' : '') +
        '</div>';
      var more = '<span class="card__link card__more">Details ansehen' + arrow() + '</span>';
      var chips =
        (m.baujahr ? '<span class="chip">' + esc(m.baujahr) + '</span>' : '') +
        (m.stunden ? '<span class="chip">' + esc(m.stunden) + '</span>' : '') +
        (m.gewicht ? '<span class="chip">' + esc(m.gewicht) + ' t</span>' : '');
      return '<article class="card card--clickable' + (verkauft ? ' card--sold' : '') +
        '" data-idx="' + i + '" tabindex="0" role="button" aria-label="Details zu ' + esc(m.modell) + '"' +
        ' data-reveal data-kategorie="' + kat + '" data-type="' + esc(m.typ) +
        '" data-weight="' + esc(m.gewicht) + '" data-year="' + esc(m.baujahr) + '">' +
        '<div class="card__media">' +
          '<img class="media__img" src="' + esc(m.bild) + '" alt="' + esc(m.alt) +
            '" loading="lazy" decoding="async">' +
          '<span class="media__shade" aria-hidden="true"></span>' +
          (verkauft ? '<span class="card__sold">Verkauft</span>' : '') +
          '<span class="card__spec">' + esc(m.bauart) + '</span>' +
        '</div>' +
        '<div class="card__body">' +
          '<h3 class="card__title">' + esc(m.modell) + '</h3>' +
          '<p class="card__text">' + esc(m.text) + '</p>' +
          '<div class="card__chips">' + chips + '</div>' +
          priceHtml +
          more +
        '</div>' +
      '</article>';
    }).join("");
  })();

  /* -----------------------------------------------------------------
     0b) GEBRAUCHTMASCHINEN — Detail-Fenster (Modal) beim Klick auf eine Karte
     ----------------------------------------------------------------- */
  (function machineModal() {
    var grid = doc.querySelector("[data-machine-grid]");
    if (!grid || !window.KOHLSCHEIN_MACHINES) return;
    var data = window.KOHLSCHEIN_MACHINES;
    function esc(s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    }

    var modal = doc.createElement("div");
    modal.className = "mmodal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="mmodal__overlay" data-mclose></div>' +
      '<div class="mmodal__dialog" role="dialog" aria-modal="true" aria-label="Maschinendetails">' +
        '<button class="mmodal__close" type="button" data-mclose aria-label="Schließen">&times;</button>' +
        '<div class="mmodal__media"><img class="mmodal__img" alt=""><span class="mmodal__sold" hidden>Verkauft</span><div class="mmodal__thumbs" hidden></div></div>' +
        '<div class="mmodal__body">' +
          '<span class="mmodal__cat"></span>' +
          '<h3 class="mmodal__title"></h3>' +
          '<dl class="mmodal__specs"></dl>' +
          '<p class="mmodal__text"></p>' +
          '<div class="mmodal__price"></div>' +
          '<div class="mmodal__actions"></div>' +
        '</div>' +
      '</div>';
    doc.body.appendChild(modal);

    var el = {
      img: modal.querySelector(".mmodal__img"),
      thumbs: modal.querySelector(".mmodal__thumbs"),
      sold: modal.querySelector(".mmodal__sold"),
      cat: modal.querySelector(".mmodal__cat"),
      title: modal.querySelector(".mmodal__title"),
      specs: modal.querySelector(".mmodal__specs"),
      text: modal.querySelector(".mmodal__text"),
      price: modal.querySelector(".mmodal__price"),
      actions: modal.querySelector(".mmodal__actions"),
      close: modal.querySelector(".mmodal__close")
    };
    var lastFocus = null;

    function row(label, val) {
      return val ? '<div class="mmodal__spec"><dt>' + label + '</dt><dd>' + esc(val) + '</dd></div>' : "";
    }
    el.thumbs.addEventListener("click", function (e) {
      var t = e.target.closest(".mmodal__thumb"); if (!t) return;
      el.img.src = t.getAttribute("data-src");
      Array.prototype.forEach.call(el.thumbs.children, function (c) { c.classList.toggle("is-active", c === t); });
    });

    function open(m) {
      var verkauft = String(m.status || "").toLowerCase() === "verkauft";
      var imgs = (Array.isArray(m.bilder) && m.bilder.length) ? m.bilder : [m.bild];
      el.img.src = imgs[0]; el.img.alt = m.alt || m.modell;
      if (imgs.length > 1) {
        el.thumbs.innerHTML = imgs.map(function (src, k) {
          return '<button type="button" class="mmodal__thumb' + (k === 0 ? " is-active" : "") +
            '" data-src="' + esc(src) + '" style="background-image:url(' + esc(src) + ')" aria-label="Bild ' + (k + 1) + '"></button>';
        }).join("");
        el.thumbs.hidden = false;
      } else { el.thumbs.innerHTML = ""; el.thumbs.hidden = true; }
      el.sold.hidden = !verkauft;
      el.cat.textContent = (m.kategorie || "") + (m.bauart ? " · " + m.bauart : "");
      el.title.textContent = m.modell;
      el.specs.innerHTML =
        row("Baujahr", m.baujahr) +
        row("Betriebsstunden", m.stunden) +
        row("Gewicht", m.gewicht ? m.gewicht + " t" : "") +
        row("Kategorie", m.kategorie);
      el.text.textContent = m.text || "";
      var preis = verkauft ? "Verkauft" : (m.preis || "Preis auf Anfrage");
      var hasPrice = !verkauft && /\d/.test(preis);
      el.price.innerHTML = '<span class="mmodal__price-val' + (hasPrice ? "" : " is-ask") + '">' + esc(preis) + "</span>" +
        (hasPrice ? '<span class="mmodal__price-note">netto, zzgl. MwSt.</span>' : "");
      var href = "kontakt.html?ref=" + encodeURIComponent(m.modell) +
        (m.preis ? "&preis=" + encodeURIComponent(m.preis) : "");
      el.actions.innerHTML =
        '<a class="btn btn--primary" href="' + href + '">' + (verkauft ? "Ähnliches anfragen" : "Diese Maschine anfragen") + "</a>" +
        '<a class="btn btn--ghost" href="tel:+4319791446">Anrufen</a>';
      lastFocus = doc.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      body.classList.add("mmodal-open");
      el.close.focus();
    }
    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      body.classList.remove("mmodal-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function fromTarget(t) {
      var card = t.closest && t.closest(".card[data-idx]");
      if (!card) return;
      var m = data[parseInt(card.getAttribute("data-idx"), 10)];
      if (m) open(m);
    }
    grid.addEventListener("click", function (e) { fromTarget(e.target); });
    grid.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("card")) {
        e.preventDefault(); fromTarget(e.target);
      }
    });
    modal.addEventListener("click", function (e) { if (e.target.closest("[data-mclose]")) close(); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  })();

  /* -----------------------------------------------------------------
     1) NAV — Scroll-State
     ----------------------------------------------------------------- */
  (function navScroll() {
    var nav = doc.getElementById("nav");
    if (!nav) return;
    var ticking = false;
    function update() {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  })();

  /* -----------------------------------------------------------------
     2) BURGER — Mobile-Overlay
     ----------------------------------------------------------------- */
  (function burger() {
    var btn = doc.querySelector(".nav__burger");
    if (!btn) return;
    function close() {
      body.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
    }
    btn.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Schließen beim Klick auf einen Menü-Link
    doc.querySelectorAll(".nav__links .nav__link").forEach(function (a) {
      a.addEventListener("click", close);
    });
    // Schließen bei ESC
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("nav-open")) close();
    });
  })();

  /* -----------------------------------------------------------------
     3) SCROLL-REVEAL
     ----------------------------------------------------------------- */
  (function reveal() {
    var items = Array.prototype.slice.call(doc.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    if (reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    // Bevorzugt GSAP ScrollTrigger mit Stagger über data-reveal-group
    if (hasST) {
      var groups = Array.prototype.slice.call(doc.querySelectorAll("[data-reveal-group]"));
      var grouped = [];

      groups.forEach(function (group) {
        var kids = group.querySelectorAll("[data-reveal]");
        if (!kids.length) return;
        kids.forEach(function (k) { grouped.push(k); });
        gsap.to(kids, {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 82%" }
        });
        // Anfangszustand explizit setzen (CSS hat ihn schon)
        gsap.set(kids, { opacity: 0, y: 34 });
      });

      items.forEach(function (el) {
        if (grouped.indexOf(el) !== -1) return; // schon in Gruppe
        gsap.set(el, { opacity: 0, y: 34 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" }
        });
      });
      // Sicherheits-Refresh nach Font/Layout
      window.addEventListener("load", function () {
        try { ScrollTrigger.refresh(); } catch (e) {}
      });
      return;
    }

    // Fallback ohne GSAP: IntersectionObserver
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("is-in"); });
    }
  })();

  /* -----------------------------------------------------------------
     4) MARQUEE — Endlos-Lauf (Inhalt duplizieren für nahtlose Schleife)
     ----------------------------------------------------------------- */
  (function marquee() {
    doc.querySelectorAll(".marquee__track").forEach(function (track) {
      if (track.dataset.cloned === "true") return;
      var html = track.innerHTML;
      track.innerHTML = html + html; // 200% Breite -> translateX(-50%) ist nahtlos
      track.dataset.cloned = "true";
      if (reduceMotion) track.style.animation = "none";
    });
  })();

  /* -----------------------------------------------------------------
     5) COUNTER — .stat__num zählt auf data-count
     ----------------------------------------------------------------- */
  (function counters() {
    var nums = Array.prototype.slice.call(doc.querySelectorAll(".stat__num[data-count]"));
    if (!nums.length) return;

    function format(el, value) {
      var dec = parseInt(el.dataset.decimals || "0", 10);
      var prefix = el.dataset.prefix || "";
      var txt = dec > 0 ? value.toFixed(dec) : Math.round(value).toString();
      // Tausender-Punkt (deutsch)
      txt = txt.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      el.firstChild && el.firstChild.nodeType === 3
        ? (el.childNodes[0].nodeValue = prefix + txt)
        : (el.insertAdjacentText("afterbegin", prefix + txt));
    }

    function run(el) {
      var target = parseFloat(el.dataset.count);
      if (isNaN(target)) return;
      if (reduceMotion || !hasGSAP) { setText(el, target); return; }
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, ease: "power2.out",
        onUpdate: function () { setText(el, obj.v); }
      });
    }

    function setText(el, value) {
      var dec = parseInt(el.dataset.decimals || "0", 10);
      var prefix = el.dataset.prefix || "";
      var txt = dec > 0 ? value.toFixed(dec) : Math.round(value).toString();
      txt = txt.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      // Erstes Textknoten ersetzen, Suffix-Span bleibt erhalten
      var first = el.childNodes[0];
      if (first && first.nodeType === 3) first.nodeValue = prefix + txt;
      else el.insertAdjacentText("afterbegin", prefix + txt);
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* -----------------------------------------------------------------
     6) PAGE-CURTAIN — Seitenübergang
     ----------------------------------------------------------------- */
  (function curtain() {
    // Eintritts-Reveal beim Laden
    var entryDone = false;

    var curtainEl = doc.querySelector(".page-curtain");
    if (!curtainEl) {
      curtainEl = doc.createElement("div");
      curtainEl.className = "page-curtain";
      curtainEl.setAttribute("aria-hidden", "true");
      curtainEl.innerHTML = '<span class="page-curtain__mark"></span>';
      body.appendChild(curtainEl);
    }
    var mark = curtainEl.querySelector(".page-curtain__mark");
    var ENTRY_KEY = "ks-curtain-entry";

    // Sicherstellen, dass der Vorhang im Ruhezustand IMMER ausserhalb des
    // Viewports liegt (unten). So deckt er nie ungewollt den Inhalt ab.
    function park() {
      if (hasGSAP) gsap.set(curtainEl, { y: "100%" });
      else curtainEl.style.transform = "translateY(100%)";
    }
    park();

    // Eintritt: Vorhang nach oben wegziehen — NUR direkt nach einer
    // Curtain-Navigation (Flag in sessionStorage). Bei normalem Load nichts.
    function playEntry() {
      if (entryDone) return;
      entryDone = true;

      var cameFromCurtain = false;
      try {
        cameFromCurtain = sessionStorage.getItem(ENTRY_KEY) === "1";
        sessionStorage.removeItem(ENTRY_KEY);
      } catch (e) { /* sessionStorage evtl. blockiert */ }

      if (!cameFromCurtain || reduceMotion || !hasGSAP) {
        park(); // bleibt versteckt
        return;
      }
      // Vorhang deckt ab und wird dann nach oben weggezogen
      gsap.set(curtainEl, { y: "0%" });
      gsap.set(mark, { opacity: 1, scale: 1 });
      var tl = gsap.timeline();
      tl.to(mark, { opacity: 0, scale: 0.6, duration: 0.3, ease: "power2.in" })
        .to(curtainEl, { y: "-100%", duration: 0.7, ease: "power4.inOut" }, "-=0.05")
        .set(curtainEl, { y: "100%" }); // wieder parken (unten)
    }

    if (doc.readyState === "complete") playEntry();
    else window.addEventListener("load", playEntry);

    if (reduceMotion || !hasGSAP) return; // kein Exit-Curtain ohne Motion

    // Exit: interne *.html-Links abfangen
    doc.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href) return;
      // nur interne .html, keine neuen Tabs / Anker / Modifier
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (!/\.html(?:[?#].*)?$/.test(href)) return;
      if (/^https?:\/\//i.test(href)) return; // extern
      // gleiche Seite? -> kein Übergang
      var path = href.split(/[?#]/)[0];
      if (path === location.pathname.split("/").pop()) return;

      e.preventDefault();
      try { sessionStorage.setItem(ENTRY_KEY, "1"); } catch (err) { /* noop */ }
      curtainEl.classList.add("is-active");
      gsap.set(curtainEl, { y: "100%" });
      gsap.set(mark, { opacity: 0, scale: 0.6 });
      var tl = gsap.timeline({
        onComplete: function () { window.location.href = href; }
      });
      tl.to(curtainEl, { y: "0%", duration: 0.55, ease: "power4.inOut" })
        .to(mark, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.25");
    });
  })();

  /* -----------------------------------------------------------------
     7) GEBRAUCHTMASCHINEN — funktionierender Filter
     ----------------------------------------------------------------- */
  (function machineFilter() {
    var bar = doc.querySelector("[data-machine-filter]");
    var grid = doc.querySelector("[data-machine-grid]");
    if (!bar || !grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var total = cards.length;
    var countEl = bar.querySelector("[data-filter-count]");
    var emptyEl = doc.querySelector("[data-filter-empty]");
    var state = { kategorie: "all", weight: "all", type: "all", year: "all" };

    function matches(card) {
      if (state.kategorie !== "all" && card.getAttribute("data-kategorie") !== state.kategorie) return false;
      if (state.type !== "all" && card.getAttribute("data-type") !== state.type) return false;
      if (state.weight !== "all") {
        var w = parseFloat(card.getAttribute("data-weight"));
        var parts = state.weight.split("-");
        if (!(w >= parseFloat(parts[0]) && w < parseFloat(parts[1]))) return false;
      }
      if (state.year !== "all") {
        var y = parseInt(card.getAttribute("data-year"), 10);
        if (!(y >= parseInt(state.year, 10))) return false;
      }
      return true;
    }

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var ok = matches(card);
        card.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      if (countEl) countEl.innerHTML = "<strong>" + shown + "</strong> von " + total + " Angeboten";
      if (emptyEl) emptyEl.hidden = shown !== 0;
    }

    function setActive(group, btn) {
      Array.prototype.forEach.call(group.querySelectorAll(".chip--filter"), function (b) {
        b.classList.toggle("is-active", b === btn);
      });
    }

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".chip--filter");
      if (!btn) return;
      var group = btn.closest("[data-filter-key]");
      if (!group) return;
      state[group.getAttribute("data-filter-key")] = btn.getAttribute("data-value");
      setActive(group, btn);
      apply();
    });

    if (emptyEl) {
      var resetBtn = emptyEl.querySelector("[data-filter-reset]");
      if (resetBtn) resetBtn.addEventListener("click", function () {
        state = { kategorie: "all", weight: "all", type: "all", year: "all" };
        Array.prototype.forEach.call(bar.querySelectorAll("[data-filter-key]"), function (group) {
          var allBtn = group.querySelector('.chip--filter[data-value="all"]');
          if (allBtn) setActive(group, allBtn);
        });
        apply();
      });
    }

    apply();
  })();

  /* -----------------------------------------------------------------
     8) KONTAKT — Formular aus ?ref=… (Anfrage zu einem Gebraucht-Eintrag)
        vorausfüllen. Läuft nur auf der Kontaktseite (form.form vorhanden).
     ----------------------------------------------------------------- */
  (function contactPrefill() {
    var form = doc.querySelector("form.form");
    if (!form || !window.URLSearchParams) return;
    var params = new URLSearchParams(window.location.search);
    var ref = params.get("ref");
    if (!ref) return;
    var preis = params.get("preis");

    var betreff = form.querySelector("#f-betreff");
    if (betreff) {
      var opt = Array.prototype.filter.call(betreff.options, function (o) { return o.value === "gebraucht"; })[0];
      if (opt) betreff.value = "gebraucht";
    }
    var msg = form.querySelector("#f-nachricht");
    if (msg && !msg.value) {
      msg.value = "Ich interessiere mich für: " + ref +
        (preis ? " (" + preis + ")" : "") +
        ".\nBitte um weitere Informationen und ein Angebot.";
    }
    // Hinweis-Banner über dem Formular
    var banner = doc.createElement("p");
    banner.className = "form__prefill";
    banner.innerHTML = "Ihre Anfrage betrifft: <strong>" + ref.replace(/[<>&]/g, "") + "</strong>";
    form.insertBefore(banner, form.firstChild);
    // sanft zum Formular scrollen
    if (!reduceMotion) {
      try { form.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}
    }
  })();

})();
