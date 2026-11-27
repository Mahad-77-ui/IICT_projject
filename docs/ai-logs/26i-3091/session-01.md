# AI Usage Log — Session 01

- **Member:** Haad Harris (Member 6)
- **Roll No:** 26i-3091
- **Branch:** `i263091`
- **Assigned Pages:** `pages/wishlist.html`, `pages/style-quiz.html`, `pages/reviews.html`
- **Date:** 2026-11-27
- **AI Tool Used:** Google Gemini (Gemini 4 Hydrogen (High) via Antigravity CLI)

## Purpose & Tasks
- Set up the `IICT_projject` workspace locally and inspect the existing Zaverat design system (`css/style.css`, `js/data.js`, `js/storage.js`, `js/app.js`, and `pages/wishlist.html`).
- Build the semantic HTML5 structure and scoped responsive CSS3 for `pages/wishlist.html` while preserving the shared header, announcement bar, `.page-hero`, breadcrumbs, and footer.
- Implement pure Vanilla JavaScript interactivity and `localStorage` state management for the Wishlist page in a dedicated `js/wishlist.js` module linked in `pages/wishlist.html`.

## Key Prompts & Summary of Output

### 1. Repository Setup & Exploration
- **Prompt:**
  > `https://github.com/Mahad-77-ui/IICT_projject` -> *"Clone the repository into the workspace and explore it"*
- **Summary of Output & Review:**
  - Downloaded and extracted the `main` branch of `IICT_projject` into the workspace.
  - Audited `README.md`, `index.html`, `css/style.css`, `js/data.js`, `js/storage.js`, `js/app.js`, and the 17 scaffolded subpages under `pages/` to confirm the existing brand tokens, `ZAVERAT_DATA` product schema, and `ZaveratStorage` API.

### 2. Wishlist HTML5 Layout & Scoped CSS (No JavaScript Yet)
- **Prompt:**
  > *"I am Member 6 (Haad Harris, Roll No: 26i-3091) working on my assigned page `pages/wishlist.html` for the Zaverat handcrafted heritage jewellery store project. Please inspect `pages/wishlist.html`, `css/style.css`, `js/data.js`, `js/storage.js`, and `js/app.js` first so you strictly preserve our existing design system, CSS variables, fonts, color palette, header, announcement bar, breadcrumbs, and footer. In this first step, replace ONLY the `.placeholder-panel` inside `<main>` of `pages/wishlist.html` with semantic HTML5 sections for the Wishlist page, and add any required scoped styles to `css/style.css` without altering existing global styles: (1) Wishlist Action Bar & Summary Header, (2) Saved Wishlist Grid (`#wishlist-grid`) with `#wishlist-empty-state`, (3) Toast / Feedback Banner (`#wishlist-feedback` with `aria-live="polite"`), (4) Recently Viewed Tray (`#recently-viewed-section`, `#recently-viewed-grid`). Keep `<header>`, `.page-hero`, `<footer>`, and all relative paths 100% unchanged. Use Vanilla HTML5 and CSS3 only. Do NOT write the JavaScript logic yet—only prepare the HTML hooks/IDs and CSS classes cleanly."*
- **Summary of Output & Review:**
  - Replaced `.placeholder-panel` in `pages/wishlist.html` with `.wishlist-section` (`#wishlist-feedback`, `.wishlist-toolbar` with `#wishlist-summary-text`, `#wishlist-sort`, `#wishlist-move-all-btn`, `#wishlist-clear-btn`, `#wishlist-grid`, and `#wishlist-empty-state`) and `#recently-viewed-section` (`#recently-viewed-grid` and `#recently-viewed-empty`).
  - Appended scoped styles under `.wishlist-section` and `.recently-viewed-section` to `css/style.css` using existing CSS variables, `[hidden]`/`:empty` rules, `:focus-visible` outlines, horizontal scroll-snap tray styling, and responsive breakpoints at `768px` and `560px` without altering existing global rules.

### 3. Wishlist Vanilla JavaScript Interactivity & State Management
- **Prompt:**
  > *"Now implement the complete Vanilla JavaScript interactivity and state management for `pages/wishlist.html`. First, inspect `js/data.js`, `js/storage.js`, and `js/app.js` so you use the exact existing product data structure, `ZaveratStorage` methods (such as `ZaveratStorage.getWishlist()`, cart methods, and recently viewed storage), and header badge update functions (`#wishlist-count` and `#cart-count`). Create a dedicated file `js/wishlist.js` and link it at the bottom of `pages/wishlist.html` right after `../js/app.js`. Implement: (1) Dynamic Wishlist Rendering (`ZaveratStorage.getWishlist()`), (2) Sorting & Edge Case Handling (Recently Added, Price: Low to High, Price: High to Low, empty state toggling, ignoring invalid/missing IDs), (3) Cart & Wishlist State Actions (Move to Cart, Remove Item, Move All to Cart, Clear Wishlist), and (4) Recently Viewed Tray (up to 4 cards with quick Add to Wishlist / View Details actions). Use pure Vanilla JavaScript only and do not modify any other member's HTML files."*
- **Summary of Output & Review:**
  - Created `js/wishlist.js` and linked `<script src="../js/wishlist.js"></script>` at the bottom of `pages/wishlist.html` right after `../js/app.js`.
  - Implemented `resolveValidProducts()`, `sortWishlistProducts()`, `buildProductCard()` (shared helper for wishlist and recently viewed cards), `renderWishlist()`, `renderRecentlyViewed()`, `handleMoveToCart()`, `handleRemoveFromWishlist()`, `handleMoveAllToCart()`, `handleClearWishlist()`, `handleToggleFromRecentlyViewed()`, `showFeedback()`, `syncHeaderBadges()`, and cross-tab `storage` event syncing.
  - Adapted image resolution (`PRODUCT_SVG_FALLBACKS` + `../` prefix) so starter `.jpg` paths in `js/data.js` resolve cleanly to the local SVG assets in `images/products/`, and ensured invalid `localStorage` IDs are ignored in both `#wishlist-summary-count` and `#wishlist-count`.

### 4. Browser Preview Launches
- **Prompts:**
  > `& 'c:\Users\user\Functional programming\IICT_projject\index.html'`
  > `& 'c:\Users\user\Functional programming\IICT_projject\pages\wishlist.html'`
- **Summary of Output:**
  - Opened `index.html` and `pages/wishlist.html` in the local default browser to preview the storefront and completed Wishlist page.

## Verification & Edits Made
- [x] Verified semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) in `pages/wishlist.html`
- [x] Verified relative paths (`../css/style.css`, `../js/data.js`, `../js/storage.js`, `../js/app.js`, `../js/wishlist.js`, `../pages/shop.html`, `product-detail.html?id=...`)
- [x] Verified `js/wishlist.js` script tag linkage in `pages/wishlist.html` and confirmed no other member's HTML files were modified
- [ ] Tested wishlist sync in browser alongside `pages/style-quiz.html` and `pages/reviews.html` (pending interactive browser QA and implementation of remaining Member 6 pages)
