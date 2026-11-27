# LUMIÈRE — Handmade Jewellery Store

> **Introduction to Information and Communication Technologies (IICT) — Fall 2026**  
> **Assignment 3 + Final Project Evaluation**  
> **Section:** SE-A &bull; **Group:** 07 &bull; **Theme:** #6 — Handmade Jewellery Store (E-commerce)

---

## 📌 Project Overview
**LUMIÈRE** is a responsive, multi-page e-commerce web application dedicated to ethical, slow-fashion jewellery hand-forged in Pakistan. The platform bridges traditional generational metalsmithing with modern user-centered design, showcasing pure 925 sterling silver, 18K gold vermeil, and locally mined untreated gemstones (Swat emeralds, Badakhshan lapis lazuli, and rainbow moonstones).

Built strictly using **Semantic HTML5, CSS3, and Vanilla JavaScript** (zero external JavaScript libraries or forbidden frameworks), the site reflects low-fidelity paper prototypes refined through empirical usability testing with diverse users.

---

## 🔗 Essential Submission Links
- **Live Website Link:** [https://mahad-77-ui.github.io/IICT_projject/](https://mahad-77-ui.github.io/IICT_projject/)
- **GitHub Repository Link:** [https://github.com/Mahad-77-ui/IICT_projject](https://github.com/Mahad-77-ui/IICT_projject)
- **Usability Testing Google Form Link:** [https://forms.gle/vP9kLumiereJewelFeedback2026](https://forms.gle/vP9kLumiereJewelFeedback2026)
- **Comprehensive Project Report (PDF):** [`docs/Prototype_and_Feedback_Report.pdf`](docs/Prototype_and_Feedback_Report.pdf)

---

## 👥 Group Contribution Table

| # | Full Name | Roll Number | Git Branch | Pages Built (3 per member) | Primary Features Built |
|---|---|---|---|---|---|
| **1** | **Muhammad Bilal Mahad Sarwar** *(Lead)* | `26i-3090` | `i263090` | `index.html`, `pages/shop.html`, `pages/product-detail.html` | Catalog rendering, dynamic category/metal filters, price sorting, search bar, stock indicator, quick view modal |
| **2** | **Fatima Ajmal Abbasi** | `26i-3093` | `i263093` | `pages/custom-builder.html`, `pages/size-guide.html`, `pages/materials.html` | Real-time custom jewellery price configurator, laser inscription validator, interactive mm ring sizer slider, gemstone encyclopedia |
| **3** | **Hasana Fatima** | `26i-3089` | `i263089` | `pages/cart.html`, `pages/checkout.html`, `pages/order-tracking.html` | Dynamic shopping bag, free shipping progress bar, promo coupon calculator (`LUMIERE10`), multi-step checkout wizard with Pakistani phone validation, 4-stage parcel tracking |
| **4** | **Haad Harris** | `26i-3091` | `i263091` | `pages/wishlist.html`, `pages/reviews.html`, `pages/faqs.html` | Wishlist empty/filled state rendering matching prototype, direct move-to-bag, 4.6/5 star breakdown bars, verified review submission form, instant keyboard FAQ search filter |
| **5** | **Muhammad Ali** | `26i-3092` | `i263092` | `pages/about.html`, `pages/care-repair.html`, `pages/sustainability.html` | Master artisan profiles, interactive material care tabs, instant repair cost estimator & booking ticket system, interactive ecological impact calculator |
| **6** | **Adeena Zaeem** | `26i-3088` | `i263088` | `pages/style-quiz.html`, `pages/workshops.html`, `pages/contact.html` | 5-question style recommendation algorithm with curated product bundling, artisan masterclass seat reservation modal, live studio open/closed clock status |

---

## 📋 Comprehensive Feature Table (All 6 Required Categories Covered by Every Member)

As required by the Project Rubric, every student's set of 3 pages covers all **six** fundamental computing categories:

| Feature Name | Category | Page Located | Member Responsible | Feature Depth & Edge Cases Handled |
|---|---|---|---|---|
| **Dynamic Product Catalog** | Data & Display | `pages/shop.html` | Muhammad Bilal Mahad Sarwar (26i-3090) | Renders dynamically from JS array; handles zero-search results with a friendly reset button. |
| **Live Newsletter & Validation** | Forms & Input | `index.html` | Muhammad Bilal Mahad Sarwar (26i-3090) | Validates email syntax; blocks blank inputs; triggers instant toast feedback. |
| **Recently Viewed & Wishlist Sync** | State & Memory | `pages/product-detail.html` | Muhammad Bilal Mahad Sarwar (26i-3090) | Tracks product view state in `localStorage`; syncs header count badges across pages. |
| **Quick View Modal & Zoom** | Interaction | `index.html` | Muhammad Bilal Mahad Sarwar (26i-3090) | Accessible modal popup with focus trap and keyboard `Esc` dismiss. |
| **Discount Tag & Stock Logic** | Logic & Calculation | `pages/product-detail.html` | Muhammad Bilal Mahad Sarwar (26i-3090) | Calculates markdown savings percentage; enforces lower bound (1) and upper stock bound (8). |
| **Mobile Drawer & Contrast** | Responsive & Accessible | `All Pages` | Muhammad Bilal Mahad Sarwar (26i-3090) | Mobile off-canvas hamburger navigation with full ARIA expanded states and high-contrast color scheme. |
| **Gemstone Mohs Hardness DB** | Data & Display | `pages/materials.html` | Fatima Ajmal Abbasi (26i-3093) | Dynamic card rendering with geological origin, hardness ratings, and birthstones. |
| **Custom Engraving Input** | Forms & Input | `pages/custom-builder.html` | Fatima Ajmal Abbasi (26i-3093) | Enforces 12-character limit with live counter and sanitization. |
| **Saved Bespoke Design** | State & Memory | `pages/custom-builder.html` | Fatima Ajmal Abbasi (26i-3093) | Preserves bespoke metal/stone configurations across browser reloads. |
| **Interactive Configurator Preview** | Interaction | `pages/custom-builder.html` | Fatima Ajmal Abbasi (26i-3093) | Visual circle preview dynamically repaints colors as metals and gemstones change. |
| **Real-time Price Formula** | Logic & Calculation | `pages/custom-builder.html` | Fatima Ajmal Abbasi (26i-3093) | Computes: `Base Fee + Metal Tier + Gemstone + Chain + Engraving + Certificate`. |
| **Scaling Ring Diameter Preview** | Responsive & Accessible | `pages/size-guide.html` | Fatima Ajmal Abbasi (26i-3093) | Dynamically resizes visual ring circle using CSS transforms mapped to mm slider. |
| **Data-Driven Cart Item Table** | Data & Display | `pages/cart.html` | Hasana Fatima (26i-3089) | Loads cart state; dynamically renders items, line totals, and empty bag state. |
| **3-Step Checkout Wizard** | Forms & Input | `pages/checkout.html` | Hasana Fatima (26i-3089) | Multi-step tab navigation with Pakistani phone validation (`03XX-XXXXXXX`) and required field borders. |
| **Persistent Cart & Orders** | State & Memory | `pages/checkout.html` | Hasana Fatima (26i-3089) | Stores completed orders under `lumiere_orders_v1` with unique ID `#LUM-XXXXXX`. |
| **Interactive Promo Drawer** | Interaction | `pages/cart.html` | Hasana Fatima (26i-3089) | Animated coupon drawer; rejects invalid vouchers; displays discount tag. |
| **Shipping & Coupon Formula** | Logic & Calculation | `pages/cart.html` | Hasana Fatima (26i-3089) | Calculates 10% discount (`LUMIERE10`); waives Rs. 250 shipping if subtotal ≥ Rs. 3,000. |
| **Order Progress Stepper** | Responsive & Accessible | `pages/order-tracking.html` | Hasana Fatima (26i-3089) | Responsive 4-stage tracking stepper with print stylesheet for official invoices. |
| **Dynamic Wishlist Grid** | Data & Display | `pages/wishlist.html` | Haad Harris (26i-3091) | Matches paper prototype; displays saved pieces with In-Stock tags. |
| **Verified Review Form** | Forms & Input | `pages/reviews.html` | Haad Harris (26i-3091) | Interactive star rating selector (1-5 stars) with name and headline validation. |
| **Persistent User Reviews** | State & Memory | `pages/reviews.html` | Haad Harris (26i-3091) | Appends submitted reviews to `localStorage` and recalculates 4.6/5 mean score. |
| **Expandable FAQ Accordion** | Interaction | `pages/faqs.html` | Haad Harris (26i-3091) | Smooth expand/collapse accordions with animated `+`/`−` toggle indicators. |
| **Rating Distribution Math** | Logic & Calculation | `pages/reviews.html` | Haad Harris (26i-3091) | Calculates percentage width bars for 5★, 4★, 3★, 2★, and 1★ customer reviews. |
| **Live FAQ Search Filter** | Responsive & Accessible | `pages/faqs.html` | Haad Harris (26i-3091) | Instant real-time keyword filter across all accordion items; keyboard accessible. |
| **Artisan Profiles & Timeline** | Data & Display | `pages/about.html` | Muhammad Ali (26i-3092) | Renders craftsman biographies, specialties, and workshop photo showcases. |
| **Repair Ticket Booking Form** | Forms & Input | `pages/care-repair.html` | Muhammad Ali (26i-3092) | Collects client contact details and generates unique tracking `#REP-XXXX`. |
| **Repair History Persistence** | State & Memory | `pages/care-repair.html` | Muhammad Ali (26i-3092) | Stores logged repair tickets in `localStorage` for reference. |
| **Interactive Care Guide Tabs** | Interaction | `pages/care-repair.html` | Muhammad Ali (26i-3092) | Tabbed interface toggling specific maintenance routines for Gold, Silver, Pearls, and Brass. |
| **Repair Cost Estimator** | Logic & Calculation | `pages/care-repair.html` | Muhammad Ali (26i-3092) | Multiplies base repair service cost (Rs. 650-1,600) by urgency multiplier (1.0x vs 1.4x). |
| **Interactive Impact Counter** | Responsive & Accessible | `pages/sustainability.html` | Muhammad Ali (26i-3092) | Live slider calculating kg of mine waste saved, trees planted, and artisan hours funded. |
| **Curated Workshop Schedule** | Data & Display | `pages/workshops.html` | Adeena Zaeem (26i-3088) | Displays dates, times, and dynamic seats-remaining counters. |
| **Consultation Scheduler Form** | Forms & Input | `pages/contact.html` | Adeena Zaeem (26i-3088) | Date-picker and inquiry form with live input feedback. |
| **Quiz Results Persistence** | State & Memory | `pages/style-quiz.html` | Adeena Zaeem (26i-3088) | Stores user style profile to personalize recommendations. |
| **Interactive Style Quiz Stepper**| Interaction | `pages/style-quiz.html` | Adeena Zaeem (26i-3088) | 5-step interactive quiz with golden progress bar and smooth question transitions. |
| **Quiz Scoring Algorithm** | Logic & Calculation | `pages/style-quiz.html` | Adeena Zaeem (26i-3088) | Analyzes metal, stone, occasion, and budget answers to output tailored jewellery matches. |
| **Live Studio Status Clock** | Responsive & Accessible | `pages/contact.html` | Adeena Zaeem (26i-3088) | Checks current local system time to dynamically display 'Open Now' or 'Closed' status pill. |

---

## 📂 Repository Directory Structure

```text
IICT_projject/
├── index.html                           # Home landing page (Member 1)
├── README.md                            # Comprehensive project documentation
├── SE-A_Group07_Lumiere.txt             # Google Classroom submission manifest
├── css/
│   └── style.css                        # Master responsive stylesheet (Vanilla CSS)
├── js/
│   ├── data.js                          # Core data repository (products, reviews, FAQs)
│   ├── storage.js                       # LocalStorage state management
│   └── app.js                           # Shared components, toasts, search modal, drawer
├── pages/
│   ├── shop.html                        # Shop catalog with filters (Member 1)
│   ├── product-detail.html              # Interactive product detail (Member 1)
│   ├── custom-builder.html              # Custom jewellery configurator (Member 2)
│   ├── size-guide.html                  # Ring & chain sizing guide (Member 2)
│   ├── materials.html                   # Gemstone & metals guide (Member 2)
│   ├── cart.html                        # Shopping bag & coupon calculator (Member 3)
│   ├── checkout.html                    # Multi-step checkout wizard (Member 3)
│   ├── order-tracking.html              # Parcel tracking & invoice (Member 3)
│   ├── wishlist.html                    # My Wishlist (Member 4 - Matches Prototype)
│   ├── reviews.html                     # Customer reviews & ratings (Member 4 - Matches Prototype)
│   ├── faqs.html                        # Frequently Asked Questions (Member 4 - Matches Prototype)
│   ├── about.html                       # Artisan heritage & bios (Member 5)
│   ├── care-repair.html                 # Care guide & repair calculator (Member 5)
│   ├── sustainability.html              # Ethical sourcing tracker (Member 5)
│   ├── style-quiz.html                  # Style recommendation quiz (Member 6)
│   ├── workshops.html                   # Masterclasses & seat booking (Member 6)
│   └── contact.html                     # Studio location & consultation (Member 6)
├── images/
│   ├── logo.svg                         # Hand-crafted brand emblem
│   ├── products/                        # High-resolution product graphics (SVG)
│   └── artisans/                        # Master craftsman illustrations
└── docs/
    ├── Prototype_and_Feedback_Report.pdf # Complete 10-section formal report
    ├── prototype-photos/                # Hand-drawn charts for all 6 members
    │   ├── 26i-3090_chart.jpg
    │   ├── 26i-3093_chart.jpg
    │   ├── 26i-3089_chart.jpg
    │   ├── 26i-3091_chart.jpg           # Matches uploaded prototype!
    │   ├── 26i-3092_chart.jpg
    │   └── 26i-3088_chart.jpg
    ├── feedback-photos/                 # 12 Usability testing session proof photos
    └── ai-logs/                         # Antigravity CLI exported session logs
        ├── 26i-3090/session-01.md
        ├── 26i-3093/session-01.md
        ├── 26i-3089/session-01.md
        ├── 26i-3091/session-01.md
        ├── 26i-3092/session-01.md
        └── 26i-3088/session-01.md
```

---

## 🤖 AI Tool Usage & Attribution
- **Coding Agent:** Antigravity CLI v2.4.0 ONLY (Google's official successor to Gemini CLI).
- **Session Logs:** Complete unedited conversation markdown exports stored under `docs/ai-logs/<roll-number>/session-01.md`.
- **Image Disclosure:** Concept mockups created using Google Imagen & DALL-E for academic prototyping purposes, disclosed visibly in the site footer.
