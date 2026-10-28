# MMI Hydrogen Technologies — website

A static website, written in plain HTML, CSS and JavaScript. It has no framework, no build step and no runtime dependencies.
You can open `index.html` directly, or deploy the folder to any static host.

```
index.html                 page markup (all sections)
assets/css/styles.css      design system, layout, animation, responsive and reduced-motion rules
assets/js/products.js      product catalogue data (single source of truth)
assets/js/main.js          navigation, catalogue rendering, filters, product dialog, enquiry form
assets/img/logo/           official MMI Solution Provider logo + derivatives
assets/img/products/       product images go here (see below)
```

To preview locally: `python3 -m http.server` and open http://localhost:8000.

## Status of the supplied inputs

| Input | Status |
|---|---|
| Official MMI logo | **Received and used.** The original is kept losslessly at `assets/img/logo/mmi-logo-original.webp`. A transparent version (only the white outside the outer ring removed) and 96/192/320px derivatives are used in the header, footer and favicon. |
| Original website HTML | **Not received.** The page was built new around the logo and the product list from the brief. Once the original is supplied, its verified copy, contact details and any features (configurator, etc.) should be merged in. |
| Product image ZIP | **Not received.** Every product currently shows a branded "Image coming soon" placeholder. |

## Adding product images

1. Export each image as WebP, about 1600px on the long edge, and put it in `assets/img/products/`.
2. In `assets/js/products.js`, set the product's `image` field. The suggested filename is in the comment beside each product, for example
   `image: 'assets/img/products/aem-electrolyser.webp'`.
3. Update `imageAlt` so it describes what the photo actually shows.
4. For extra views, such as the battery testing system's exploded view, add entries to `gallery`. They appear as thumbnails in the product dialog.

If an image path is wrong, the card falls back to the placeholder instead of showing a broken image.

## Product catalogue

There are 15 products in 5 categories. They come from the asset names listed in the brief, so the names should be checked against the real images.

| Category | Products |
|---|---|
| Hydrogen & Fuel Cells | AEM Electrolyser, PEM Electrolyser, Hydrogen Training System, Industrial Hydrogen Training System (rack), Fuel Cell Training Kit |
| Battery Testing | Battery Testing System (exploded-view image is planned as a gallery image) |
| Engine & Automotive | Engine Testing Equipment, Four-Stroke Three-Cylinder Petrol Engine, Hybrid CRDI System, Eddy Current Dynamometer Test Rig |
| Air, Pressure & Lab Equipment | Open-Type Air Rig, Recirculation-Type Air System, PID-Control-Based Pressure Equipment, MF-100 & MF-400 |
| Renewable Energy Training | Solar Concentrator Training System |

**To verify:**
- Whether "Engine Testing Equipment" and the petrol engine are the same product.
- What MF-100 and MF-400 are, and which category they belong in.
- Whether the categories match how MMI groups its range.

Summaries only expand the product name. No specifications, features, applications or datasheets were invented. The dialog shows "Contact us for specifications" until real data is added to `specs`, `features`, `applications`, `configurations` or `datasheet`.

Filters, the About "expertise" tiles, the Solutions cards, the footer product links and the enquiry form's product list are all generated from `products.js`. A category with no products is never shown.

## Enquiry form: backend still required

The form validates input in the browser and includes a honeypot spam field. **It does not send anything yet.**

- `data-endpoint=""` on the `<form>`: set this to a secure backend URL that accepts a JSON POST with the fields `name, company, email, phone, interest, message`. A success message is shown **only** when the server returns a 2xx response; any other result shows an error.
- `data-mailto=""`: optionally set this to the company email. The form then offers an "open in your email app" link with the enquiry pre-filled.
- With neither set, the user is told plainly that the enquiry has not been sent.

The backend must do its own server-side validation, rate limiting or CAPTCHA, and data handling in line with the privacy policy. Never put API keys in client-side code.

## Placeholders still to replace

These are marked with dashed `[...]` boxes on the page and `<!-- EDIT -->` comments in `index.html`:
- Company email, telephone and address (contact section and footer).
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
