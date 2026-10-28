# MMI Hydrogen Technologies — website

A static website, written in plain HTML, CSS and JavaScript. It has no framework, no build step and no runtime dependencies.
You can open `index.html` directly, or deploy the folder to any static host.

```
index.html                 page markup (all sections)
assets/css/styles.css      design system, layout, animation, responsive and reduced-motion rules
assets/js/products.js      product catalogue data (single source of truth)
assets/js/main.js          navigation, catalogue rendering, filters, product dialog, enquiry form
assets/img/logo/           official MMI Solution Provider logo + derivatives
assets/img/products/       product images (WebP derivatives + source originals)
```

To preview locally: `python3 -m http.server` and open http://localhost:8000.

## Status of the supplied inputs

| Input | Status |
|---|---|
| Official MMI logo | **Received and used.** The original is kept losslessly at `assets/img/logo/mmi-logo-original.webp`. A transparent version (only the white outside the outer ring removed) and 96/192/320px derivatives are used in the header, footer and favicon. |
| Product image ZIP | **Received and integrated.** 27 files, of which 22 are unique (5 were exact duplicates). 21 are used; 1 was deliberately left out (see below). |
| Original website HTML | **Not received.** If it has extra verified copy or features (such as a configurator), they should be merged in. |

## Product images

```
assets/img/products/source/   originals from the ZIP, renamed (not loaded by the page)
assets/img/products/<name>-sm.webp   640px wide, used on product cards
assets/img/products/<name>-lg.webp   up to 1200px wide, used in the product dialog and hero
```

Transparent PNGs keep their transparency, with empty margins trimmed. To add a product image, create both WebP sizes, then set `image: '<name>'` in `assets/js/products.js`. A missing file falls back to a branded placeholder.

### Inventory of the supplied ZIP

| Original file | Dimensions | Shown on panel / what it is | Used as |
|---|---|---|---|
| ChatGPT Image Sep 3 01_22_05 PM.png | 812×1000, transparent | AEM Based Hydrogen Generator, model MMI AEM-HG-01 | `aem-hydrogen-generator` (also hero) |
| ChatGPT Image Sep 3 02_13_54 PM.png | 1000×667, transparent | Hydrogen Gas Generator System | `hydrogen-gas-generator-system` |
| Industrial Hydrogen Training System Rack.png | 1000×667, transparent | Water Treatment / Hydrogen Generation / Automation & Controlling units | `industrial-hydrogen-training-system` (also About) |
| ChatGPT Image Sep 8 01_52_45 PM - Copy.jpg | 800×1200 | Electrolyzer with Fuel Cell System | `electrolyser-fuel-cell-system` |
| pem electrolyser - Copy.jpg | 1200×1200 | Electrolyzer with Fuel Cell System – Test Setup & Loading System, MMI-EC-FC-02 | `electrolyser-fuel-cell-test-setup` |
| fuel cell trainig kit - Copy.png | 864×1000, transparent | PEM Fuel Cell Test Station, MMI-PFCT-01 | `pem-fuel-cell-test-station` |
| mf-100 ,mf-400 - Copy.png | 1000×667, transparent | Fuel Cell System Test Setup, MMI-FC-TS-01 | `fuel-cell-system-test-setup` |
| ChatGPT Image Sep 3 01_24_40 PM - Copy.png | 667×1000, transparent | Fuel Cell, Super Capacitor & Battery Performance Tester | `fuel-cell-supercapacitor-battery-tester` |
| components.jpg | 1200×960 | Fuel cell stacks, educational kits, catalyst | `hydrogen-fuel-cell-components` |
| battery testing sysytem.jpg | 1200×800 | Battery Testing System | `battery-testing-system` |
| Battery Testing System Exploded View - Copy.jpg | 1200×960 | Exploded view and parts list | gallery image for the battery testing system |
| eddy current dynometer test rig img.jpeg | 1200×900 | Four Stroke Three Cylinder Petrol Engine with Eddy Current Dynamometer for Morse Test Rig | `petrol-engine-morse-test-rig` |
| 4strok 3cyclinder petrol engine.jpeg | 1200×900 | Same rig, with laptop data station | gallery image |
| moraco.jpeg (+ Copy, duplicate) | 1200×900 | Same rig, photographed installed in a lab | gallery image |
| hybrid crdi imge.jpeg | 1200×800 | Computerized Hybrid Diesel Engine with Eddy Current Dynamometer and Combustion Analyzer System | `hybrid-crdi-engine-test-rig` |
| open type air rig.jpg (+ Copy, duplicate) | 1112×1200 | Open Type Air Conditioner Test Rig | `open-type-ac-test-rig` |
| Re circulation type air sysytem.jpg (+ Copy, duplicate) | 1200×1112 | Re-Circulation Type Air Conditioning System Kit | `recirculation-ac-system-kit` |
| pid control based pressure.png (+ Copy, duplicate) | 667×1000, transparent | PID Control Based Pressure Control Loop Kit | `pid-pressure-control-loop-kit` |
| 1bd43f03-….png (+ "(1)", duplicate) | 1000×806, transparent | Advanced Industrial PLC Trainer Kit, MMIPLC-02SC | `plc-trainer-kit` |
| SOLAR CONCENTRATOR TRAINING SYSTEM.png | 1000×667, transparent | Solar concentrator training system | `solar-concentrator-training-system` |
| AdobeExpressPhotos_….jpg | 800×1200 | Pyrolysis Reactor, MMIPR-01 | `pyrolysis-reactor` |
| aem electrolyser - Copy.png | 1000×667, transparent | **Enapter-branded** AEM electrolyser | **Not used.** It shows another manufacturer's brand; publishing it as an MMI product could mislead. Add it only if MMI is an authorised supplier and the page says so. |

## Product catalogue

18 products in 6 categories. Names and model numbers are copied from the labels on the product panels, and feature lists only name components labelled or clearly visible in the images. Specifications, applications and datasheets are empty, so the dialog shows "Contact us for specifications".

| Category | Products |
|---|---|
| Hydrogen & Fuel Cells (8) | AEM Based Hydrogen Generator · Hydrogen Gas Generator System · Industrial Hydrogen Training System · Electrolyzer with Fuel Cell System · Electrolyzer with Fuel Cell System – Test Setup & Loading System · PEM Fuel Cell Test Station · Fuel Cell System Test Setup · Fuel Cell Components & Educational Kits |
| Battery & Energy Storage Testing (2) | Battery Testing System · Fuel Cell, Super Capacitor & Battery Performance Tester |
| Engine Test Rigs (2) | Four Stroke Three Cylinder Petrol Engine with Eddy Current Dynamometer for Morse Test Rig · Computerized Hybrid CRDI Diesel Engine Test Rig |
| Air Conditioning Training (2) | Open Type Air Conditioner Test Rig · Re-Circulation Type Air Conditioning System Kit |
| Automation & Process Control (2) | Advanced Industrial PLC Trainer Kit · PID Control Based Pressure Control Loop Kit |
| Solar & Thermal Energy (2) | Solar Concentrator Training System · Pyrolysis Reactor |

**For the company to confirm:**
- Several source files are named "ChatGPT Image …" (AI-generated renders). Confirm that each one accurately shows a product MMI supplies.
- The components image shows third-party brands (Horizon kits, ACTA catalyst). Confirm MMI supplies them.
- Model numbers that weren't legible are left out (electrolyzer with fuel cell system, performance tester). The "MF-100 / MF-400" filename isn't explained by its image; it's ignored until confirmed.
- The solar render's panel reads like "Solar Thermal Training System". The site uses the ZIP filename, "Solar Concentrator Training System".

Filters, the About "expertise" tiles, the Solutions cards, the footer product links and the enquiry form's product list are all generated from `products.js`.

## Enquiry form: backend still required

The form validates input in the browser and includes a honeypot spam field. **It does not send anything yet.**

- `data-endpoint=""` on the `<form>`: set this to a secure backend URL that accepts a JSON POST with the fields `name, company, email, phone, interest, message`. A success message is shown **only** when the server returns a 2xx response; any other result shows an error.
- `data-mailto`: currently `salesmmi@micromechinstruments.com`. Until an endpoint exists, the form tells the user the enquiry was not sent and offers an "open in your email app" link with the enquiry pre-filled.
- With neither set, the user is told plainly that the enquiry has not been sent and is pointed to the contact details.

The backend must do its own server-side validation, rate limiting or CAPTCHA, and data handling in line with the privacy policy. Never put API keys in client-side code.

## Placeholders still to replace

Contact details were taken from the MMI product panels: +91 98400-49311, salesmmi@micromechinstruments.com (the tester panel shows sales@micromechinstruments.com), www.micromechinstruments.com, "Micro Mech Instruments, Chennai-97". **Confirm them.** Also confirm how the "MMI Hydrogen Technologies" and "Micro Mech Instruments" names relate.

Still marked with dashed `[...]` boxes on the page and `<!-- EDIT -->` comments in `index.html`:
- Full street address.
- About section introduction: replace it with the verified company description and history.
- Hero headline: currently the direction suggested in the brief.
- Privacy Policy / Terms: not linked because no policy content exists. Add pages once the content is approved.

## Accessibility and motion

- Semantic landmarks, a skip link, one `h1`, and an ordered heading hierarchy.
- Visible focus styles.
- Filters are toggle buttons (`aria-pressed`) with a live result count.
- The product view uses a native `<dialog>`: Escape and the backdrop close it, and focus returns to the button that opened it.
- The mobile menu has `aria-expanded`, closes on Escape, an outside tap or choosing a link, and returns focus to the menu button.
- Decorative rings, drops and ripples are `aria-hidden`. Animation uses only CSS transform and opacity, plus one IntersectionObserver for scroll reveals; there are no JavaScript animation loops.
- `prefers-reduced-motion` turns off all animation and decorative motion.
- Without JavaScript, all static content stays visible and a `<noscript>` note lists the product range.
