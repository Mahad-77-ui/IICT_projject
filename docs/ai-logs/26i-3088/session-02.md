# AI Usage Log — Session 02

- **Member:** Adeena Zaeem (Member 5)
- **Roll No:** 26i-3088
- **Branch:** `i263088`
- **Assigned Pages:** `pages/care-repair.html`, `pages/faqs.html`, `pages/contact.html`
- **Session Focus Page:** `pages/faqs.html`
- **Date:** 2026-11-28
- **AI Tool Used:** Gemini 4 Hydrogen (High) (Antigravity CLI)

## Purpose & Tasks
- Replaced the placeholder scaffold in `pages/faqs.html` with a complete, standalone HTML5 page for the **Zaverat** jewellery brand matching the exact visual identity and header/footer structure of `pages/care-repair.html`.
- Kept all CSS inside a single `<style>` tag and all vanilla JavaScript inside a single `<script>` tag (using only Google Fonts for `Playfair Display` and `Inter`).
- Implemented a live search bar, category filter pills, an accessible 15-item FAQ accordion with smooth transitions and an Expand All / Collapse All toggle, a "Still have a question?" CTA card, and a responsive mobile hamburger drawer.

## Key Prompts & Summary of Output

### Prompt 1 — Standalone FAQs Page Build (`pages/faqs.html`)
> "Create my standalone HTML page at pages/faqs.html for my jewellery brand Zaverat. Write the complete page cleanly in one single cohesive theme with all CSS inside a <style> tag and all JavaScript inside a <script> tag in the same file (no external libraries except Google Fonts for Playfair Display and Inter). The page must be fully functional.
>
> Brand, Identity & Header Details (IDENTICAL to my other pages):
> - Brand Name: Zaverat (minimal geometric diamond emblem on the left of the navbar, serif wordmark).
> - Top Announcement Bar: Centered text "Handcrafted in small batches · Free insured shipping on orders over PKR 10,000" on dark espresso background (#4A3222) with crisp cream/white text.
> - Navigation Bar: White background (#FFFFFF) with links: Home, Shop, Custom Builder, Style Quiz, Workshops, About, Contact. Two pill buttons on the right: "Wishlist 0" and "Cart 0" (Cart is filled dark #4A3222 with white text, Wishlist is white with a thin border). Nav links must point to the correct relative paths (../index.html, shop.html, custom-builder.html, style-quiz.html, workshops.html, about.html, contact.html). Highlight the current page link where applicable.
> - Page Header Banner: Warm sand background (#EBDCC6) with generous vertical padding:
>   - Breadcrumb: Home / FAQs (Home links to ../index.html)
>   - Uppercase letter-spaced eyebrow in bronze (#8C583A): MEMBER 5 · 26I-3088 (ADEENA ZAEEM)
>   - H1 in Playfair Display (color #1F1A17): Frequently Asked Questions
>   - Subtitle in Inter (#4A433D): "Quick answers about orders, shipping, materials, sizing, returns, and caring for your Zaverat pieces."
>
> Color Palette & Typography (use ONLY these, no new colors or fonts):
> - Dark espresso: #4A3222
> - Bronze accent: #8C583A (hover #6E4229)
> - Sand banner: #EBDCC6
> - Cream page background: #FAF6F0
> - Cards: #FFFFFF / #FFFDF9 with borders #E5D8C5
> - Primary text #1F1A17, secondary text #574F49
> - Headings: Playfair Display (serif). Body, nav, labels, buttons: Inter (sans-serif).
>
> Page Content Sections (on the #FAF6F0 canvas):
> 1. Search + Category Filter Bar:
>    - A search input "Search questions..." that filters FAQ items live as the user types.
>    - Category pill buttons: All, Orders & Shipping, Materials & Quality, Sizing & Custom, Returns & Warranty, Care & Repair. Clicking a pill filters the list; the active pill is filled bronze (#8C583A) with white text.
>    - Show a friendly "No matching questions found" message when nothing matches.
> 2. FAQ Accordion (at least 12 questions across the categories):
>    - Each item is a card with a question and a +/− icon. Clicking expands/collapses the answer with a smooth height transition. Only one item open at a time (or allow multiple, with an "Expand all / Collapse all" toggle button).
>    - Use realistic Zaverat content: sterling silver 925, 18k gold vermeil, ethically sourced gemstones, delivery times across Pakistan, free insured shipping over PKR 10,000, 14-day returns on unworn items, custom pieces being non-returnable, resizing services, tarnish prevention, warranty on craftsmanship.
>    - Make it keyboard accessible (buttons with aria-expanded and aria-controls).
> 3. "Still have a question?" Call-to-Action Card:
>    - Warm card with a heading, short text, and a bronze button "Contact Us" linking to contact.html.
> 4. Footer:
>    - Matching footer in the espresso/cream palette with Zaverat brand mark, quick links (Home, Shop, Care & Repair, FAQs, Contact), and a short care note. Add a copyright line.
>
> Functionality requirements:
> - Search and category filters work together.
> - Accordion open/close works with smooth animation.
> - Everything works without any page reload and with no external JS libraries.
> - Responsive on desktop, tablet and mobile (nav collapses to a hamburger menu under 768px that actually toggles).
> - Consistent spacing, rounded corners (12–16px on cards, 999px on pills), and subtle hover states using the bronze palette."

**Summary of Output (Prompt 1):**
- Built a complete standalone `pages/faqs.html` matching the exact Zaverat design tokens (`#4A3222`, `#8C583A`, `#6E4229`, `#EBDCC6`, `#FAF6F0`, `#FFFFFF`, `#FFFDF9`, `#E5D8C5`, `#1F1A17`, `#574F49`, `#4A433D`) and `Playfair Display` + `Inter` typography:
  - **Header & Mobile Drawer:** Top espresso announcement bar, white navbar with the geometric diamond emblem, centered links, `Wishlist 0` and `Cart 0` pills, and a responsive hamburger drawer (`#menuToggle` / `#mobileDrawer`) collapsing below `900px` with `Escape` key support.
  - **Sand Hero Banner:** Breadcrumb (`Home / FAQs`), `MEMBER 5 · 26I-3088 (ADEENA ZAEEM)` eyebrow, H1 title, and subtitle.
  - **Search & Category Filters:** Combined live search (`#faqSearch` with clear button `#clearSearchBtn`), 6 category filter pills (`All`, `Orders & Shipping`, `Materials & Quality`, `Sizing & Custom`, `Returns & Warranty`, `Care & Repair`), live result count (`#resultsMeta`), `Expand all / Collapse all` toggle (`#toggleAllBtn`), and `"No matching questions found"` empty state (`#emptyState`) with a reset button (`#resetFiltersBtn`).
  - **15-Item Accessible FAQ Accordion:** 3 realistic Zaverat questions per category covering Pakistan delivery timelines, free insured shipping over PKR 10,000, order tracking, 925 sterling silver vs. 18k gold vermeil, ethically sourced gemstones, skin sensitivity, home sizing, resizing services, Custom Builder orders, 14-day returns, non-returnable custom/engraved items, 12-month craftsmanship warranty, tarnish prevention, home cleaning, and studio repair booking—each using `<button>` triggers with `aria-expanded`/`aria-controls` and CSS `grid-template-rows` smooth transitions.
  - **CTA Card & Footer:** `"Still have a question?"` card linking to `contact.html`, and a matching sand/espresso footer with quick links (`Home`, `Shop`, `Care & Repair`, `FAQs` highlighted as current, `Contact`), care note card, and copyright bar.

---

### Prompt 2 — AI Usage Log Documentation for FAQs Page
> "in ai-logs, write in 26i-3088 all the chat prompting i have done for building the faqs page"

**Summary of Output (Prompt 2):**
- Created `docs/ai-logs/26i-3088/session-02.md` documenting all prompts and implementation details for `pages/faqs.html`, leaving `docs/ai-logs/26i-3088/session-01.md` and all other group members' log folders untouched.

## Verification & Edits Made
- [x] Verified `pages/faqs.html` contains 15 `.faq-item` elements, 16 `aria-expanded` / `aria-controls` attributes, 1 `<style>` tag, 1 `<script>` tag, and only Google Fonts external stylesheet links via PowerShell inspection
- [x] Verified all relative `<a href>` links in `pages/faqs.html` resolve to existing files in the repository
- [x] Saved Session 02 log exclusively in `docs/ai-logs/26i-3088/session-02.md`
- [ ] Live browser rendering and interactive click/typing verification (not executed in a browser during this session)
