# PriceSense AI – Mobile Price Range Prediction

Smartphone price-tier prediction using machine learning (Random Forest 98.4 %, Decision Tree 93.8 %) – an interactive
presentation / project site with a 3D phone lab and a live tier predictor.

## Run it
Just double-click **index.html** (works from disk) – or serve the folder with any static server:

    python3 -m http.server 8000   # then open http://localhost:8000

An internet connection is needed the first time for the CDN libraries listed below (fonts, icons, pdf.js, three.js).

## Folder structure
```
index.html                 page markup (all tabs: Overview, Price Tiers, Models, Features, 3D Lab, Predictor, Phones, Code, Slides)
css/
  base.css                 core theme, layout, cards, buttons, neon / tier colours
  theme-light.css          light-theme overrides (switched off in dark mode)
  components.css           title intro, transitions, components
  patches/                 later refinements, loaded in order (intro, slides viewer, cursor, UX passes, 3D lab)
js/
  theme-init.js            applies the saved dark/light theme before first paint
  main.js                  application logic: tabs, tier predictor, charts, 3D phones, overview gallery, neon/pulsating borders, slides
  particle-drift.js        background particle field
  lab-webgl.js             three.js phone for the 3D Lab (falls back to the CSS 3D phone if WebGL fails)
  lab-drag.js              drag anywhere in the 3D Lab box to rotate, wheel to zoom
  tab-sound.js             synthesised sounds: 'deck' click on tab change, whoosh/impact + a signature sound per brand transition (9 brands), all 9 in sequence on the 'One last thing…' tab (Web Audio, no audio files)
  patches/                 refresh-rate meter, loader, touch cursor, cursor menu, glow toggle, brand button, thank-you slide, photo-based CSS phone
  data/
    phone-images.js        phone photos as data: URIs (needed so canvas shading works when opened from file://)
    pdf-data.js            the slide deck PDF as base64 (same file as assets/docs/presentation.pdf)
assets/
  images/overview/         the 10 cut-out phones in the Overview gallery (transparent WebP)
  images/phones/           the phone photos used by the 3D Lab (same as js/data/phone-images.js)
  docs/presentation.pdf    the presentation (PPT as PDF)
  source-photos/           original photos you supplied (reference only, not loaded by the page)
```

## External libraries (loaded from CDN)
- Google Fonts: Syne, Chakra Petch, JetBrains Mono, Plus Jakarta Sans, Playfair Display, Orbitron, Inter, Outfit
- Font Awesome 6.5.1 (icons)
- pdf.js 3.11.174 (slides viewer)
- three.js r128 (3D Lab phone; the page still works without it)

## Editing tips
- Scripts load in the order listed in index.html – keep that order (they share globals).
- To change the Overview phones, replace the WebP files in `assets/images/overview/` (keep names).
- To change the deck, replace `assets/docs/presentation.pdf` and regenerate `js/data/pdf-data.js` (base64 of the PDF).
