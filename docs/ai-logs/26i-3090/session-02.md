# AI Usage Log — Session 02

- **Member:** Muhammad Bilal Mahad Sarwar (Member 1)
- **Roll No:** 26i-3090
- **Branch:** `i263090`
- **Assigned Pages:** `index.html`, `pages/shop.html`, `pages/product-detail.html`
- **Date:** 2026-11-28
- **AI Tool Used:** Antigravity (Claude Sonnet / Gemini)

## Purpose & Tasks
- Expanding `js/data.js` product catalogue with 10 diverse Pakistani handmade jewellery items covering all required categories and metals.
- Building the full product catalogue layout and filter system for `pages/shop.html`.
- Creating 5 new custom-crafted SVG vector product illustrations inside `images/products/`.

## Key Prompts & Summary of Output

### Prompt 1 — Product Catalogue & Filter Layout for `pages/shop.html` (11:33 AM)
> **Prompt:**
> Make sure I am on branch i263090. Build the product catalogue and filter layout for `pages/shop.html` (Member 1: Muhammad Bilal Mahad Sarwar, Roll No: 26i-3090, Zaverat handmade jewellery store).
>
> STRICT SCOPE GUARD:
> - You MAY ONLY edit `pages/shop.html`, `js/data.js`, and create missing SVG files inside `images/products/`.
> - Do NOT modify `index.html`, `css/style.css`, `js/storage.js`, `js/app.js`, or any other `.html` file inside `pages/`.
>
> 1. Inspect `js/data.js` and `images/products/`:
> - Ensure `window.ZAVERAT_DATA.products` contains at least 8–10 diverse Pakistani handmade jewellery items across multiple categories (`Necklaces`, `Earrings`, `Cuffs & Bracelets`, `Rings`) and metals (`925 Silver`, `18k Gold Vermeil`, `Antique Brass`).
> - Verify every product has `id`, `name`, `category`, `metal`, `gemstone`, `price` (numeric PKR), `rating`, `reviewsCount`, `inStock` (boolean), `image` (path like `images/products/<filename>.svg`), and `description`.
> - Create clean, detailed SVG vector illustrations in `images/products/` for any product whose SVG file does not exist yet so zero broken images appear when loaded from `pages/shop.html` (`../images/products/...`).
>
> 2. Replace `.placeholder-panel` in `pages/shop.html`:
> - Keep the existing Zaverat header, breadcrumb, hero (`Shop Handmade Jewellery`), and footer structure intact (update the footer AI Image Disclosure text to state: `"AI Image Disclosure: All product illustrations on this site use custom-crafted inline/file SVG vector artwork created for academic prototyping."`).
> - Build a clean Catalogue Toolbar above the product grid containing:
>   - Live Search input (`#shopSearchInput`, placeholder `"Search necklaces, emeralds, silver..."`).
>   - Category filter pills or `<select>` (`#shopCategoryFilter`: All, Necklaces, Earrings, Cuffs & Bracelets, Rings).
>   - Metal / Material filter (`#shopMetalFilter`: All Metals, 925 Silver, 18k Gold Vermeil, Antique Brass).
>   - Max Price range slider or `<select>` (`#shopPriceFilter`: All Prices, Under PKR 4,000, Under PKR 8,000, Under PKR 15,000) + In-Stock Only checkbox (`#shopInStockOnly`).
>   - Sort dropdown (`#shopSortSelect`: Featured, Price: Low to High, Price: High to Low, Top Rated).
>   - Result count display (`#shopResultCount`, e.g., `"Showing 8 pieces"`) and a `"Reset Filters"` button (`#shopResetBtn`).
> - Add `<div id="shopProductGrid" class="grid-4"></div>` for the product cards and an empty-state container (`#shopEmptyState`) with a `"Clear All Filters"` button when zero products match.

- **Summary of Output:**
  - Verified git branch is `i263090` (clean).
  - Read and audited existing `js/data.js` (only 4 starter products, missing `metal`, `gemstone`, `rating`, `reviewsCount` fields; image paths pointed to non-existent `.jpg` files), `pages/shop.html` (contained only a `.placeholder-panel`), and `images/products/` (5 existing SVGs: `placeholder-necklace.svg`, `placeholder-earrings.svg`, `placeholder-cuff.svg`, `placeholder-ring.svg`, `pearl-elegance.svg`).
  - Expanded `window.ZAVERAT_DATA.products` in `js/data.js` from 4 to **10 products** across all required categories and metals, adding required fields (`metal`, `gemstone`, `rating`, `reviewsCount`) and updating image paths from `.jpg` to `.svg`.
  - Created **5 new custom SVG vector illustrations** in `images/products/`:
    - `swat-emerald-necklace.svg` — faceted Swat Emerald pendant on 18k gold vermeil chain
    - `multani-chandbali.svg` — crescent Chandbali earrings with carnelian and pearl fringe in antique brass
    - `hunza-lapis-bangle.svg` — 925 silver bangle inlaid with lapis lazuli stations
    - `shalimar-ruby-kangan.svg` — Mughal-inspired 18k gold vermeil kangan with ruby cabochons
    - `ziarat-garnet-ring.svg` — antique brass filigree crown ring with almandine garnet centrepiece
  - Replaced the entire `.placeholder-panel` section in `pages/shop.html` with a fully functional Catalogue Toolbar (live search, category/metal/price/sort dropdowns, in-stock checkbox, result count, reset button) and product grid with inline scoped `<style>` and an inline `<script>` block providing `initShopCatalogue()`, filter logic, wishlist toggle (`ZaveratStorage.toggleWishlist`), add-to-bag (`ZaveratStorage.addToCart`), empty-state display, and URL query param support (`?category=`, `?metal=`, `?search=`).
  - Updated the footer AI Image Disclosure text to: `"AI Image Disclosure: All product illustrations on this site use custom-crafted inline/file SVG vector artwork created for academic prototyping."`
  - Verified with PowerShell: all 10 product SVGs exist on disk, parse as valid XML, all required element IDs/controls are present in `pages/shop.html`, `.placeholder-panel` is removed, and only the 3 allowed targets (`js/data.js`, `pages/shop.html`, `images/products/*.svg`) were modified/created.

---

## Verification & Edits Made
- [x] Confirmed branch is `i263090` throughout the session
- [x] Only `js/data.js`, `pages/shop.html`, and `images/products/` (5 new SVGs) were modified — no other files touched
- [x] All 10 products have required fields: `id`, `name`, `category`, `metal`, `gemstone`, `price` (numeric), `rating`, `reviewsCount`, `inStock` (boolean), `image` (`.svg` path), `description`
- [x] Products span all 4 categories: `Necklaces` (3), `Earrings` (2), `Cuffs & Bracelets` (3), `Rings` (2)
- [x] Products span all 3 metals: `925 Silver` (3), `18k Gold Vermeil` (4), `Antique Brass` (3)
- [x] One product (`zv-008 Hunza Lapis Stack Bangle`) set `inStock: false` to demonstrate the In-Stock filter
- [x] All 10 product SVG image paths verified to exist and parse as valid XML
- [x] All required filter IDs present in `pages/shop.html`: `#shopSearchInput`, `#shopCategoryFilter`, `#shopMetalFilter`, `#shopPriceFilter`, `#shopInStockOnly`, `#shopSortSelect`, `#shopResultCount`, `#shopResetBtn`, `#shopProductGrid`, `#shopEmptyState`, `#shopClearFiltersBtn`
- [x] Footer AI Image Disclosure text updated as specified
- [x] Empty-state container (`#shopEmptyState`) with `"Clear All Filters"` button implemented
- [x] Product cards link to `product-detail.html?id=<id>`, include wishlist toggle and add-to-bag wired to `ZaveratStorage`
