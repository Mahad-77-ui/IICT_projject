# Zaverat — Handmade Jewellery Store

**Course:** CL1000 — Applications of Information & Communication Technologies (ICT Final Project)  
**Group:** Group 07 (6 Members)  
**Theme:** Theme #6: Handmade jewellery store (Category: E-commerce)  

---

## Links

- **Live Website (GitHub Pages):** `[Add Live GitHub Pages URL here]`
- **Google Form Submission:** `[Add Group 07 Google Form URL here]`

---

## Feature Table

| Feature | Category | Page | Member |
| :--- | :--- | :--- | :--- |
| Hero showcase, featured collections, and brand intro | Storefront | `index.html` | Muhammad Bilal Mahad Sarwar (`26i-3090`) |
| Filterable jewellery catalogue, search, and sorting | E-commerce | `pages/shop.html` | Muhammad Bilal Mahad Sarwar (`26i-3090`) |
| Product gallery, specs, artisan link, and add-to-cart | E-commerce | `pages/product-detail.html` | Muhammad Bilal Mahad Sarwar (`26i-3090`) |
| Persistent shopping cart, quantity updates, and promo summary | E-commerce | `pages/cart.html` | Hasana Fatima (`26i-3089`) |
| Shipping/payment checkout form and order confirmation | E-commerce | `pages/checkout.html` | Hasana Fatima (`26i-3089`) |
| Order ID lookup and crafting/delivery status timeline | Customer Orders | `pages/order-tracking.html` | Hasana Fatima (`26i-3089`) |
| Interactive custom jewellery configurator and price estimator | Bespoke Studio | `pages/custom-builder.html` | Fatima Ajmal Abbasi (`26i-3093`) |
| Precious metals, gemstones, and purity comparison guide | Product Info | `pages/materials.html` | Fatima Ajmal Abbasi (`26i-3093`) |
| Ring, bangle, and necklace measurement guide & converter | Utility | `pages/size-guide.html` | Fatima Ajmal Abbasi (`26i-3093`) |
| Studio heritage story and artisan craftsperson profiles | Brand & Craft | `pages/about.html` | Muhammad Ali (`26i-3092`) |
| Recycled metals, fair wages, and eco-packaging pledges | Sustainability | `pages/sustainability.html` | Muhammad Ali (`26i-3092`) |
| Weekend bench workshop schedule and seat registration | Community | `pages/workshops.html` | Muhammad Ali (`26i-3092`) |
| Metal care instructions and repair/re-plating request form | Customer Care | `pages/care-repair.html` | Adeena Zaeem (`26i-3088`) |
| Searchable, categorized Frequently Asked Questions | Support | `pages/faqs.html` | Adeena Zaeem (`26i-3088`) |
| Studio inquiry form, consultation hours, and contact info | Support | `pages/contact.html` | Adeena Zaeem (`26i-3088`) |
| Persistent wishlist, move-to-cart, and recently viewed tray | Personalization | `pages/wishlist.html` | Haad Harris (`26i-3091`) |
| Multi-step style quiz with tailored jewellery matches | Personalization | `pages/style-quiz.html` | Haad Harris (`26i-3091`) |
| Verified customer ratings, filters, and review submission | Social Proof | `pages/reviews.html` | Haad Harris (`26i-3091`) |

---

## Contribution Table (Member 1–6 Order)

| Order | Member Name | Roll No | Branch | Assigned Pages (3 per Member) |
| :--- | :--- | :--- | :--- | :--- |
| Member 1 | Muhammad Bilal Mahad Sarwar | `26i-3090` | `i263090` | `index.html`, `pages/shop.html`, `pages/product-detail.html` |
| Member 2 | Hasana Fatima | `26i-3089` | `i263089` | `pages/cart.html`, `pages/checkout.html`, `pages/order-tracking.html` |
| Member 3 | Fatima Ajmal Abbasi | `26i-3093` | `i263093` | `pages/custom-builder.html`, `pages/materials.html`, `pages/size-guide.html` |
| Member 4 | Muhammad Ali | `26i-3092` | `i263092` | `pages/about.html`, `pages/sustainability.html`, `pages/workshops.html` |
| Member 5 | Adeena Zaeem | `26i-3088` | `i263088` | `pages/care-repair.html`, `pages/faqs.html`, `pages/contact.html` |
| Member 6 | Haad Harris | `26i-3091` | `i263091` | `pages/wishlist.html`, `pages/style-quiz.html`, `pages/reviews.html` |

---

## Repository Structure

```text
.
├── index.html
├── pages/                  # 17 assigned HTML pages
├── css/
│   └── style.css           # Shared brand CSS variables, navbar, footer & responsive layout
├── js/
│   ├── data.js             # Central jewellery, artisan, review & FAQ data
│   ├── storage.js          # localStorage helpers for cart, wishlist, quiz & builder state
│   └── app.js              # Shared navigation, hamburger menu & badge counter updates
├── images/
│   ├── logo.svg
│   ├── banners/
│   ├── products/
│   └── artisans/
├── docs/
│   ├── prototype-photos/   # Upload <rollnumber>_horizontal.jpg & <rollnumber>_vertical.jpg
│   ├── feedback-photos/    # Upload <rollnumber>_session1.jpg & <rollnumber>_session2.jpg
│   └── ai-logs/            # Session logs per member (<rollnumber>/session-01.md)
├── .gitignore
└── README.md
```

## Technical & Git Conventions

- **Tech Stack:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`), CSS3 (Flexbox/Grid), and Vanilla JavaScript only (no React, Vue, Angular, Tailwind, or jQuery).
- **Paths:** All links and assets use relative paths (e.g., `../index.html`, `../pages/shop.html` from inside `pages/`) for local and GitHub Pages compatibility.
- **Branching:** Each member develops on their roll-number branch (`i263090`, `i263089`, `i263093`, `i263092`, `i263088`, `i263091`) branched from `main`.
