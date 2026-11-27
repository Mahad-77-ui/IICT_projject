# AI Usage Log — Session 01

- **Member:** Muhammad Bilal Mahad Sarwar (Member 1)
- **Roll No:** 26i-3090
- **Branch:** `i263090`
- **Assigned Pages:** `index.html`, `pages/shop.html`, `pages/product-detail.html`
- **Date:** 2026-11-27
- **AI Tool Used:** Antigravity (Gemini)

## Purpose & Tasks
- Scaffolding the project structure, shared stylesheet (`css/style.css`), and shared JS modules (`js/data.js`, `js/storage.js`, `js/app.js`).
- Building the complete semantic HTML5 structure of `index.html` (Home page for Zaverat — Handmade Jewellery Store).
- Implementing the dynamic Artisan Bestsellers featured grid (`#homeFeaturedGrid`), wishlist toggle (`handleWish`), quick add-to-bag (`handleQuickAdd`), cart drawer synchronization, and custom SVG jewellery illustrations for `index.html`.

## Key Prompts & Summary of Output

### Prompt 1 — Project & Home Page Foundation Setup (11:48 AM)
> **Prompt:**
> Initialize the repository structure for our CL1000 ICT Final Project (Group 07, 6-member group) following the exact file organization and naming conventions from the project specification:
> 1. Project & Group Details: Group 07, Website Name: Zaverat, Theme #6: Handmade jewellery store (Category: E-commerce), 18 pages total (3 per member), with Member 1 (`26i-3090`) assigned `index.html`, `pages/shop.html`, `pages/product-detail.html`.
> 2. Directory & File Structure: Create `index.html` (Home page), `pages/` (17 HTML pages), `css/style.css` (shared stylesheet with CSS variables for handmade jewellery brand colors, typography, header, navbar, footer, and responsive layout), `js/data.js`, `js/storage.js`, `js/app.js`, `images/` (`logo.svg`, `banners/`, `products/`, `artisans/`), `docs/` (`prototype-photos/`, `feedback-photos/`, `ai-logs/`), `.gitignore`, and `README.md`.
> 3. Technical & Coding Constraints: Use semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`), CSS3 (Flexbox/Grid only — no React, Vue, Angular, or Tailwind), and Vanilla JavaScript only (no jQuery). Ensure all internal navigation links use relative paths so every page works locally and on static hosting, and include a consistent responsive navbar and footer with an AI image disclosure line.

- **Summary of Output:** Created the base project structure, shared brand CSS (`css/style.css`), data/storage/UI scripts (`js/data.js`, `js/storage.js`, `js/app.js`), `images/logo.svg`, and initial placeholder pages including `index.html`.

---

### Prompt 2 — Complete Semantic HTML5 Structure for `index.html` (12:05 PM)
> **Prompt:**
> Modify ONLY `index.html` — do NOT create, edit, or delete any other files in the repository.
>
> Build the complete semantic HTML5 structure of `index.html` (Home page for Member 1: Muhammad Bilal Mahad Sarwar, Roll No: 26i-3090) for our Group 07 handmade jewellery store (Theme #6: Handmade jewellery store), linking to the existing `css/style.css` and `images/logo.svg`:
>
> 1. **Top Announcement Bar & Header (`<header class="site-header">`):**
>    - Top announcement bar (`Handcrafted with Love in Pakistan • Free Shipping on Orders Over Rs. 3,000`) with `.theme-toggle` button.
>    - Mobile hamburger menu button (`.mobile-toggle` with `aria-expanded="false"`), SVG diamond/gem emblem brand logo linking to `index.html`, and `<nav class="main-nav">` with relative links to `index.html`, `pages/shop.html`, `pages/custom-builder.html`, `pages/size-guide.html`, `pages/reviews.html`, `pages/faqs.html`, `pages/style-quiz.html`, `pages/workshops.html`, `pages/about.html`, and `pages/contact.html`.
>    - Header action buttons: Search modal trigger (`.search-trigger`), Wishlist link (`pages/wishlist.html` with `.wish-count-badge`), and Cart drawer trigger (`.cart-drawer-trigger` with `.cart-count-badge`).
> 2. **Main Content Sections (`<main class="site-main">`):**
>    - Hero Section: Two-column layout with tagline (`Handcrafted in Pakistan • Heirloom Collection`), headline (`Wear the poetry of authentic craft.`), description highlighting recycled 925 silver, 18k gold vermeil, and northern valley gemstones, primary CTA (`Explore Collection` -> `pages/shop.html`), outline CTA (`Build Custom Piece` -> `pages/custom-builder.html`), and featured product showcase (`images/products/pearl-elegance.svg`) with an Artisan Spotlight card (`Pearl Elegance Necklace`, `Rs. 2,850 • 4.9 (42 reviews)`).
>    - Value Propositions Strip: 4-column grid highlighting `100% Hand-Forged`, `Natural Pakistani Gems`, `Free Express Delivery` (over Rs. 3,000), and `Lifetime Authenticity`.
>    - Artisan Bestsellers Placeholder Section: Section header (`Curated Showcase` / `Artisan Bestsellers`), empty `<div id="homeFeaturedGrid" class="grid-4"></div>` container, and `View All Collections` button linking to `pages/shop.html`.
>    - Interactive Style Quiz Teaser Section: Full-width primary banner (`Unsure which piece suits your aura?`) with CTA button linking to `pages/style-quiz.html`.
> 3. **Semantic Footer & Global Overlays (`<footer class="site-footer">`):**
>    - 4-column footer with brand summary, visible AI tool disclosure (`Images on this website were generated using [Tool Name] for academic prototyping purposes.`), Artisanal Shop links (`pages/shop.html`, `pages/custom-builder.html`, `pages/materials.html`, `pages/size-guide.html`, `pages/style-quiz.html`), Customer Care links (`pages/faqs.html`, `pages/care-repair.html`, `pages/order-tracking.html`, `pages/reviews.html`, `pages/contact.html`), and Artisan Newsletter signup form with Islamabad studio details.
>    - Bottom bar with copyright and `IICT Fall 2026 Project • Section [Your Section] • Group 07`.
>    - Include `#searchModal`, `#cartDrawer`, and `.toast-container` overlays.

- **Summary of Output:** Built the complete semantic HTML5 structure of `index.html` with announcement bar, responsive header/navbar, two-column hero with Artisan Spotlight card, 4-card value propositions grid, `#homeFeaturedGrid` placeholder section, style quiz teaser banner, 4-column footer, and global modal/drawer/toast overlays.

---

### Prompt 3 — Dynamic Featured Grid & Interactive Handlers in `index.html` (12:08 PM)
> **Prompt:**
> Modify ONLY `index.html` — do NOT create, edit, or delete any other files in the repository. Inspect the global variable/object names exported in `js/data.js`, `js/storage.js`, and `js/app.js` (read-only) so `index.html` calls them accurately:
>
> 1. **Dynamic Artisan Bestsellers Grid (`#homeFeaturedGrid`):**
>    - Add an inline `<script>` inside `index.html` that runs on `DOMContentLoaded` and renders the first 4 products from the data array in `js/data.js` into `#homeFeaturedGrid`.
>    - Each rendered `.product-card` must include `.product-media` (product image, `alt` text, and `.product-wish-btn` reflecting current wishlist status from `js/storage.js`) and `.product-info` (category & metal, product title linking to `pages/product-detail.html?id=<product.id>`, formatted price, stock status badge, and an `Add to Bag` button).
>    - Include an edge-case fallback message inside `#homeFeaturedGrid` if no products are available.
> 2. **Interactive Card Handlers (No Full-Page Reload):**
>    - Implement `handleWish(e, id)` to toggle the item in `localStorage` via `js/storage.js`, update the clicked heart button's active state/icon and header wishlist badge immediately without reloading the page, and trigger a toast notification.
>    - Implement `handleQuickAdd(id)` to add 1 unit of the product to the cart via `js/storage.js`, update the cart badge/drawer, and display a confirmation toast notification.
> 3. **Base Path & Shared Script Includes:**
>    - Set the root path variable matching `js/app.js` and load `js/data.js`, `js/storage.js`, and `js/app.js` at the bottom of `<body>` using relative paths.

- **Summary of Output:** Added `window.ZAVERAT_ROOT = "./";`, loaded `js/data.js`, `js/storage.js`, and `js/app.js`, and wrote the inline `index.html` script rendering the first 4 products from `window.ZAVERAT_DATA.products` into `#homeFeaturedGrid`, along with `handleWish(e, id)`, `handleQuickAdd(id)`, `syncHeaderAndDrawer()`, `notifyUser()`, and an empty-state fallback.

---

### Prompt 4 — SVG Product Visuals & Final `index.html` Integration Verification (12:12 PM)
> **Prompt:**
> Update ONLY `index.html` and add missing SVG files inside `images/` — do NOT modify `js/data.js`, `js/storage.js`, `js/app.js`, `css/style.css`, or any files inside `pages/`.
>
> 1. **Image Paths & Visuals:**
>    - Inspect `index.html` and `js/data.js` (read-only) to verify the exact image paths used by the hero section and the first 4 products.
>    - Create clean, detailed SVG jewellery illustrations inside `images/products/` (and `images/logo.svg`) matching every image path referenced in `index.html` and the first 4 items in `js/data.js` so zero broken images appear.
>    - Ensure every `<img>` in `index.html` uses a valid relative path (`images/...`) and descriptive `alt` text.
> 2. **Inline JavaScript Inside `index.html` Only:**
>    - Inspect `js/data.js`, `js/storage.js`, and `js/app.js` (read-only) to confirm the exact global variable/function names they define.
>    - Update the `<script>` inside `index.html` so that on `DOMContentLoaded`, it safely reads the first 4 products from `js/data.js` and renders them into `#homeFeaturedGrid` with working product images, formatted prices, links to `pages/product-detail.html?id=<id>`, wishlist heart toggle buttons (`handleWish`), `Add to Bag` buttons (`handleQuickAdd`), and a clean fallback message if products fail to load.

- **Summary of Output:** Added SVG jewellery illustrations (`pearl-elegance.svg`, `placeholder-necklace.svg`, `placeholder-earrings.svg`, `placeholder-cuff.svg`, `placeholder-ring.svg`) and `images/logo.svg`, and added `PRODUCT_SVG_FALLBACKS` + `resolveAsset()` in `index.html` so all hero and product images load cleanly with zero broken paths, while syncing `ZaveratStorage` cart/wishlist counts and `#cartDrawer` UI.

## Verification & Edits Made
- [x] Verified semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<figure>`, `<aside>`) in `index.html`
- [x] Verified relative paths (`css/style.css`, `images/...`, `pages/...`, `js/...`) work locally and on static hosting
- [x] Verified Vanilla JS integration with `window.ZAVERAT_DATA`, `window.ZaveratStorage`, `#homeFeaturedGrid`, `handleWish`, `handleQuickAdd`, `#cartDrawer`, and `.toast-container`
- [x] Verified no other files outside `index.html` and `images/` were altered during `index.html` development
