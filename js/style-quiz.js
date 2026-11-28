/**
 * Zaverat — Personal Jewellery Style Quiz Engine
 * Member 6 (Haad Harris, Roll No: 26i-3091)
 * Manages the 5-step style quiz flow, validation, persona & product scoring,
 * wishlist/cart actions, and persistence via ZaveratStorage.
 */

(function () {
  "use strict";

  const PRODUCT_SVG_FALLBACKS = {
    "images/products/placeholder-necklace.jpg": "images/products/placeholder-necklace.svg",
    "images/products/placeholder-earrings.jpg": "images/products/placeholder-earrings.svg",
    "images/products/placeholder-cuff.jpg": "images/products/placeholder-cuff.svg",
    "images/products/placeholder-ring.jpg": "images/products/placeholder-ring.svg"
  };

  /**
   * 5-question handcrafted jewellery style quiz configuration.
   * Each option contributes persona points and product-matching preference tags.
   */
  const QUIZ_QUESTIONS = [
    {
      id: "occasion",
      title: "1. Where will you wear your Zaverat piece most often?",
      hint: "Choose the setting that best matches how you style your jewellery.",
      options: [
        {
          id: "festive-bridal",
          title: "Festive & Bridal Celebrations",
          description: "Weddings, dholkis, and grand family evenings where heritage pieces shine.",
          tag: "Statement Heritage",
          personaWeights: { "royal-heritage": 3, "everyday-classic": 1 },
          matchPrefs: { badgeKeywords: ["bestseller"], categories: ["Necklaces", "Earrings"] }
        },
        {
          id: "everyday-signature",
          title: "Everyday Signature Wear",
          description: "Effortless pieces for studio days, university, and coffee meetups.",
          tag: "Daily Comfort",
          personaWeights: { "modern-minimalist": 3, "everyday-classic": 2 },
          matchPrefs: { badgeKeywords: ["new", "handmade"], categories: ["Rings", "Earrings"] }
        },
        {
          id: "cultural-evening",
          title: "Art Galleries & Cultural Gatherings",
          description: "Distinctive artisanal silhouettes that spark conversation.",
          tag: "Artisan Craft",
          personaWeights: { "bohemian-gemstone": 3, "royal-heritage": 1 },
          matchPrefs: { badgeKeywords: ["limited"], categories: ["Bracelets", "Necklaces"] }
        },
        {
          id: "timeless-gifting",
          title: "Timeless Keepsake & Gifting",
          description: "Versatile classics suited for anniversaries, milestones, and heirloom wear.",
          tag: "Versatile Classic",
          personaWeights: { "everyday-classic": 3, "modern-minimalist": 1 },
          matchPrefs: { badgeKeywords: ["handmade", "bestseller"], categories: ["Earrings", "Rings"] }
        }
      ]
    },
    {
      id: "metal",
      title: "2. Which metal tone feels most like you?",
      hint: "Select the finish that complements your wardrobe and skin undertone.",
      options: [
        {
          id: "antique-gold",
          title: "22k Gold-Plated Heritage",
          description: "Warm, luminous gold plating inspired by traditional Lahore ateliers.",
          tag: "Warm Gold",
          personaWeights: { "royal-heritage": 3, "everyday-classic": 1 },
          matchPrefs: { materialKeywords: ["22k", "gold-plated", "gold"] }
        },
        {
          id: "sterling-silver",
          title: "925 Sterling Silver",
          description: "Cool, luminous sterling silver with delicate oxidized or polished detail.",
          tag: "Cool Silver",
          personaWeights: { "modern-minimalist": 3, "everyday-classic": 2 },
          matchPrefs: { materialKeywords: ["925", "sterling", "silver"] }
        },
        {
          id: "recycled-brass",
          title: "Hammered Recycled Brass",
          description: "Earthy, hand-forged golden-bronze patina crafted from reclaimed brass.",
          tag: "Artisan Brass",
          personaWeights: { "bohemian-gemstone": 3 },
          matchPrefs: { materialKeywords: ["recycled brass", "hammered", "brass"] }
        },
        {
          id: "mixed-metals",
          title: "Open to Mixed Metals",
          description: "I love layering silver, brass, and gold tones depending on my mood.",
          tag: "Flexible Tone",
          personaWeights: { "everyday-classic": 2, "bohemian-gemstone": 1, "modern-minimalist": 1 },
          matchPrefs: { materialKeywords: ["silver", "brass", "gold"] }
        }
      ]
    },
    {
      id: "craft",
      title: "3. Which stone or craftsmanship detail draws you in?",
      hint: "Each Zaverat piece showcases a signature regional artisan technique.",
      options: [
        {
          id: "kundan-foil",
          title: "Hand-Set Kundan Stones",
          description: "Traditional foil-backed glass gemstones with royal Mughal symmetry.",
          tag: "Kundan & Meenakari",
          personaWeights: { "royal-heritage": 3 },
          matchPrefs: { materialKeywords: ["kundan", "foil"], categories: ["Necklaces"] }
        },
        {
          id: "freshwater-pearls",
          title: "Freshwater Pearls & Bell Drops",
          description: "Soft natural lustre paired with airy, hand-strung silver movement.",
          tag: "Pearl Elegance",
          personaWeights: { "everyday-classic": 3, "royal-heritage": 1 },
          matchPrefs: { materialKeywords: ["pearl", "freshwater"], categories: ["Earrings"] }
        },
        {
          id: "turquoise-filigree",
          title: "Turquoise & Twisted Wire Filigree",
          description: "Vibrant natural cabochon stone framed by hand-twisted Chitrali wirework.",
          tag: "Stone & Filigree",
          personaWeights: { "bohemian-gemstone": 3 },
          matchPrefs: { materialKeywords: ["turquoise", "filigree", "cabochon"], categories: ["Bracelets"] }
        },
        {
          id: "onyx-engraving",
          title: "Matte Onyx & Clean Engraving",
          description: "Sculptural dark stone accents with crisp, minimalist hand-carved lines.",
          tag: "Minimalist Stone",
          personaWeights: { "modern-minimalist": 3 },
          matchPrefs: { materialKeywords: ["onyx", "engraved"], categories: ["Rings"] }
        }
      ]
    },
    {
      id: "scale",
      title: "4. What jewellery silhouette do you reach for first?",
      hint: "Pick the piece type and visual scale you most want to add to your collection.",
      options: [
        {
          id: "statement-choker",
          title: "Statement Choker or Necklace",
          description: "A regal focal piece that frames the collarbone and anchors an outfit.",
          tag: "Necklaces",
          personaWeights: { "royal-heritage": 3 },
          matchPrefs: { categories: ["Necklaces"] }
        },
        {
          id: "graceful-jhumkas",
          title: "Graceful Jhumkas & Earrings",
          description: "Lightweight, expressive ear drops that brighten your face with movement.",
          tag: "Earrings",
          personaWeights: { "everyday-classic": 3 },
          matchPrefs: { categories: ["Earrings"] }
        },
        {
          id: "sculpted-cuff",
          title: "Sculpted Wrist Cuff or Bracelet",
          description: "An adjustable open cuff with tactile hammered texture on the wrist.",
          tag: "Bracelets",
          personaWeights: { "bohemian-gemstone": 3 },
          matchPrefs: { categories: ["Bracelets"] }
        },
        {
          id: "signet-ring",
          title: "Sleek Signet or Everyday Ring",
          description: "A refined, stackable band designed to be worn comfortably every day.",
          tag: "Rings",
          personaWeights: { "modern-minimalist": 3 },
          matchPrefs: { categories: ["Rings"] }
        }
      ]
    },
    {
      id: "budget",
      title: "5. What is your ideal investment range in PKR?",
      hint: "We will prioritize handcrafted pieces tailored to your preferred price tier.",
      options: [
        {
          id: "under-5000",
          title: "Under PKR 5,000",
          description: "Accessible artisan treasures ideal for everyday wear and thoughtful gifts.",
          tag: "Budget Friendly",
          personaWeights: { "modern-minimalist": 2, "everyday-classic": 2 },
          matchPrefs: { minPrice: 0, maxPrice: 5000 }
        },
        {
          id: "5000-to-10000",
          title: "PKR 5,000 – PKR 10,000",
          description: "Mid-tier handcrafted cuffs and silver heirlooms with intricate detail.",
          tag: "Artisan Mid-Range",
          personaWeights: { "bohemian-gemstone": 2, "everyday-classic": 1 },
          matchPrefs: { minPrice: 5000, maxPrice: 10000 }
        },
        {
          id: "above-10000",
          title: "PKR 10,000 & Above",
          description: "Showstopping heirloom pieces eligible for free insured shipping.",
          tag: "Heirloom Tier",
          personaWeights: { "royal-heritage": 3 },
          matchPrefs: { minPrice: 10000, maxPrice: Infinity }
        },
        {
          id: "flexible-budget",
          title: "Flexible — Craftsmanship First",
          description: "Show me the strongest aesthetic matches regardless of price bracket.",
          tag: "Any Budget",
          personaWeights: { "royal-heritage": 1, "bohemian-gemstone": 1, "everyday-classic": 1, "modern-minimalist": 1 },
          matchPrefs: { minPrice: 0, maxPrice: Infinity }
        }
      ]
    }
  ];

  /**
   * Persona profiles mapped by persona ID.
   */
  const STYLE_PERSONAS = {
    "royal-heritage": {
      id: "royal-heritage",
      title: "Royal Heritage Connoisseur",
      description:
        "You gravitate toward heirloom grandeur, warm 22k gold-plated finishes, and traditional Kundan stone setting that turns festive occasions into timeless memories.",
      tags: ["22k Gold-Plated", "Kundan Craft", "Festive Statement", "Heirloom Silhouette"]
    },
    "modern-minimalist": {
      id: "modern-minimalist",
      title: "Modern Minimalist Artisan",
      description:
        "You appreciate quiet luxury—cool 925 sterling silver, sharp hand-engraved geometry, and matte onyx accents built for effortless daily wear.",
      tags: ["925 Sterling Silver", "Matte Onyx", "Clean Silhouette", "Everyday Signature"]
    },
    "bohemian-gemstone": {
      id: "bohemian-gemstone",
      title: "Bohemian Gemstone Collector",
      description:
        "You are drawn to tactile metalwork, reclaimed hammered brass, twisted wire filigree, and natural turquoise cabochons rich with regional character.",
      tags: ["Recycled Brass", "Natural Turquoise", "Twisted Filigree", "Artisan Statement"]
    },
    "everyday-classic": {
      id: "everyday-classic",
      title: "Everyday Classic",
      description:
        "You cherish graceful balance—luminous freshwater pearls, airy bell silhouettes, and versatile sterling silver crafts that transition seamlessly from day to evening.",
      tags: ["Freshwater Pearls", "Sterling Silver", "Timeless Balance", "Lightweight Craft"]
    }
  };

  /**
   * Runtime state for the current quiz session.
   */
  const quizState = {
    currentStep: 0,
    answers: {}
  };

  const cartButtonTimers = new WeakMap();

  /**
   * Escapes HTML characters before interpolating text into templates.
   * @param {string} value
   * @returns {string}
   */
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * Formats a numeric amount in Pakistani Rupees (PKR).
   * @param {number} price
   * @returns {string}
   */
  function formatPKR(price) {
    return "PKR " + Number(price || 0).toLocaleString("en-PK");
  }

  /**
   * Resolves a product image path relative to pages/ with SVG fallback support.
   * @param {string} rawPath
   * @returns {string}
   */
  function resolveProductImage(rawPath) {
    if (!rawPath) return "../images/logo.svg";
    const normalized = PRODUCT_SVG_FALLBACKS[rawPath] || rawPath;
    if (/^(https?:|data:|\/|\.\.\/)/i.test(normalized)) {
      return normalized;
    }
    return "../" + String(normalized).replace(/^\.?\//, "");
  }

  /**
   * Returns the product catalog array from window.ZAVERAT_DATA.
   * @returns {Array<Object>}
   */
  function getCatalogProducts() {
    if (!window.ZAVERAT_DATA || !Array.isArray(window.ZAVERAT_DATA.products)) {
      return [];
    }
    return window.ZAVERAT_DATA.products;
  }

  /**
   * Finds a product by ID in ZAVERAT_DATA.products.
   * @param {string} productId
   * @returns {Object|undefined}
   */
  function findProductById(productId) {
    return getCatalogProducts().find((product) => product.id === productId);
  }

  /**
   * Synchronizes header #wishlist-count and #cart-count badges with ZaveratStorage.
   */
  function syncHeaderBadges() {
    if (!window.ZaveratStorage) return;

    const wishlistBadge = document.getElementById("wishlist-count");
    const cartBadge = document.getElementById("cart-count");

    if (wishlistBadge) {
      wishlistBadge.textContent = String(window.ZaveratStorage.getWishlistCount());
    }
    if (cartBadge) {
      cartBadge.textContent = String(window.ZaveratStorage.getCartCount());
    }
  }

  /**
   * Shows or hides the inline validation message.
   * @param {string} [message]
   */
  function showValidationMessage(message) {
    const msgEl = document.getElementById("quiz-validation-msg");
    if (!msgEl) return;
    msgEl.textContent = message || "Please select an option before continuing.";
    msgEl.hidden = false;
  }

  function hideValidationMessage() {
    const msgEl = document.getElementById("quiz-validation-msg");
    if (!msgEl) return;
    msgEl.hidden = true;
  }

  /**
   * Renders the current question step, progress indicators, options, and navigation buttons.
   */
  function renderCurrentQuestion() {
    const totalSteps = QUIZ_QUESTIONS.length;
    const question = QUIZ_QUESTIONS[quizState.currentStep];
    if (!question) return;

    const stepNumber = quizState.currentStep + 1;
    const progressPercent = Math.round((stepNumber / totalSteps) * 100);
    const selectedOptionId = quizState.answers[question.id] || null;

    const stepLabelEl = document.getElementById("quiz-step-label");
    const percentEl = document.getElementById("quiz-progress-percent");
    const trackEl = document.getElementById("quiz-progress-track");
    const fillEl = document.getElementById("quiz-progress-fill");
    const titleEl = document.getElementById("quiz-question-title");
    const hintEl = document.getElementById("quiz-question-hint");
    const optionsGridEl = document.getElementById("quiz-options-grid");
    const prevBtn = document.getElementById("quiz-prev-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    const submitBtn = document.getElementById("quiz-submit-btn");

    if (stepLabelEl) {
      stepLabelEl.textContent = "Question " + stepNumber + " of " + totalSteps;
    }
    if (percentEl) {
      percentEl.textContent = progressPercent + "%";
    }
    if (trackEl) {
      trackEl.setAttribute("aria-valuemax", String(totalSteps));
      trackEl.setAttribute("aria-valuenow", String(stepNumber));
    }
    if (fillEl) {
      fillEl.style.width = progressPercent + "%";
    }
    if (titleEl) {
      titleEl.textContent = question.title;
    }
    if (hintEl) {
      hintEl.textContent = question.hint;
    }

    if (optionsGridEl) {
      optionsGridEl.innerHTML = question.options
        .map((option, index) => {
          const isSelected = option.id === selectedOptionId;
          const tabIndex = isSelected || (!selectedOptionId && index === 0) ? "0" : "-1";
          return (
            '<button type="button" class="quiz-option-card' + (isSelected ? " is-selected" : "") + '" ' +
              'role="radio" aria-checked="' + String(isSelected) + '" ' +
              'tabindex="' + tabIndex + '" ' +
              'data-option-id="' + escapeHtml(option.id) + '">' +
              '<span class="quiz-option-indicator" aria-hidden="true"></span>' +
              '<span class="quiz-option-content">' +
                '<span class="quiz-option-title">' + escapeHtml(option.title) + "</span>" +
                '<span class="quiz-option-desc">' + escapeHtml(option.description) + "</span>" +
                '<span class="quiz-option-tag">' + escapeHtml(option.tag) + "</span>" +
              "</span>" +
            "</button>"
          );
        })
        .join("");
    }

    if (prevBtn) {
      prevBtn.disabled = quizState.currentStep === 0;
    }

    const isLastStep = quizState.currentStep === totalSteps - 1;
    if (nextBtn) {
      nextBtn.hidden = isLastStep;
    }
    if (submitBtn) {
      submitBtn.hidden = !isLastStep;
    }

    hideValidationMessage();
  }

  /**
   * Records the user's selected option for the active question and updates UI state.
   * @param {string} optionId
   * @param {boolean} [focusOption=false]
   */
  function selectOption(optionId, focusOption = false) {
    const question = QUIZ_QUESTIONS[quizState.currentStep];
    if (!question) return;

    const isValidOption = question.options.some((opt) => opt.id === optionId);
    if (!isValidOption) return;

    quizState.answers[question.id] = optionId;
    hideValidationMessage();

    const optionsGridEl = document.getElementById("quiz-options-grid");
    if (!optionsGridEl) return;

    const cards = optionsGridEl.querySelectorAll(".quiz-option-card");
    cards.forEach((card) => {
      const cardOptionId = card.dataset.optionId;
      const selected = cardOptionId === optionId;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-checked", String(selected));
      card.setAttribute("tabindex", selected ? "0" : "-1");
      if (selected && focusOption) {
        card.focus();
      }
    });
  }

  /**
   * Computes the winning Style Persona based on weighted option scores.
   * @param {Object<string, string>} answers
   * @returns {Object}
   */
  function calculateStylePersona(answers) {
    const scores = {
      "royal-heritage": 0,
      "modern-minimalist": 0,
      "bohemian-gemstone": 0,
      "everyday-classic": 0
    };

    QUIZ_QUESTIONS.forEach((question) => {
      const selectedId = answers[question.id];
      const option = question.options.find((opt) => opt.id === selectedId);
      if (!option || !option.personaWeights) return;

      Object.keys(option.personaWeights).forEach((personaKey) => {
        if (Object.prototype.hasOwnProperty.call(scores, personaKey)) {
          scores[personaKey] += option.personaWeights[personaKey];
        }
      });
    });

    // Deterministic tie-breaker ordered by persona richness
    const personaOrder = [
      "royal-heritage",
      "bohemian-gemstone",
      "everyday-classic",
      "modern-minimalist"
    ];

    let bestPersonaId = personaOrder[0];
    let bestScore = -1;

    personaOrder.forEach((personaId) => {
      if (scores[personaId] > bestScore) {
        bestScore = scores[personaId];
        bestPersonaId = personaId;
      }
    });

    return STYLE_PERSONAS[bestPersonaId] || STYLE_PERSONAS["everyday-classic"];
  }

  /**
   * Scores every product in ZAVERAT_DATA.products against the user's quiz answers
   * and returns the top 3 matches (with graceful fallback to featured pieces).
   * @param {Object<string, string>} answers
   * @param {Object} persona
   * @returns {{ products: Array<Object>, reasons: Object<string, string> }}
   */
  function matchCatalogProducts(answers, persona) {
    const catalog = getCatalogProducts();
    if (catalog.length === 0) {
      return { products: [], reasons: {} };
    }

    const occasionOpt = QUIZ_QUESTIONS[0].options.find((o) => o.id === answers.occasion);
    const metalOpt = QUIZ_QUESTIONS[1].options.find((o) => o.id === answers.metal);
    const craftOpt = QUIZ_QUESTIONS[2].options.find((o) => o.id === answers.craft);
    const scaleOpt = QUIZ_QUESTIONS[3].options.find((o) => o.id === answers.scale);
    const budgetOpt = QUIZ_QUESTIONS[4].options.find((o) => o.id === answers.budget);

    const personaCategoryAffinity = {
      "royal-heritage": "Necklaces",
      "everyday-classic": "Earrings",
      "bohemian-gemstone": "Bracelets",
      "modern-minimalist": "Rings"
    };

    const scored = catalog.map((product, index) => {
      let score = 0;
      const reasons = [];
      const searchableText = [
        product.name,
        product.category,
        product.material,
        product.badge,
        product.description
      ]
        .join(" ")
        .toLowerCase();

      // 1. Metal tone match
      if (metalOpt && metalOpt.matchPrefs && Array.isArray(metalOpt.matchPrefs.materialKeywords)) {
        const matchedMetal = metalOpt.matchPrefs.materialKeywords.some((kw) =>
          searchableText.includes(kw.toLowerCase())
        );
        if (matchedMetal) {
          score += metalOpt.id === "mixed-metals" ? 1 : 4;
          if (metalOpt.id !== "mixed-metals") {
            reasons.push(metalOpt.tag);
          }
        }
      }

      // 2. Stone & craftsmanship detail match
      if (craftOpt && craftOpt.matchPrefs && Array.isArray(craftOpt.matchPrefs.materialKeywords)) {
        const matchedCraft = craftOpt.matchPrefs.materialKeywords.some((kw) =>
          searchableText.includes(kw.toLowerCase())
        );
        if (matchedCraft) {
          score += 5;
          reasons.push(craftOpt.tag);
        }
      }

      // 3. Silhouette / category match
      if (scaleOpt && scaleOpt.matchPrefs && Array.isArray(scaleOpt.matchPrefs.categories)) {
        if (scaleOpt.matchPrefs.categories.includes(product.category)) {
          score += 4;
          reasons.push(product.category);
        }
      }

      // 4. Occasion & badge alignment
      if (occasionOpt && occasionOpt.matchPrefs) {
        const cats = occasionOpt.matchPrefs.categories || [];
        const badges = occasionOpt.matchPrefs.badgeKeywords || [];
        if (cats.includes(product.category)) {
          score += 2;
        }
        if (badges.includes(String(product.badge || "").toLowerCase())) {
          score += 1;
        }
      }

      // 5. Budget fit in PKR
      if (budgetOpt && budgetOpt.matchPrefs) {
        const price = Number(product.price || 0);
        const { minPrice, maxPrice } = budgetOpt.matchPrefs;
        if (price >= minPrice && price <= maxPrice) {
          score += budgetOpt.id === "flexible-budget" ? 1 : 3;
          if (budgetOpt.id !== "flexible-budget") {
            reasons.push(budgetOpt.tag);
          }
        }
      }

      // 6. Persona affinity tie-breaker
      if (persona && personaCategoryAffinity[persona.id] === product.category) {
        score += 2;
      }

      // In-stock preference
      if (product.inStock) {
        score += 0.5;
      }

      return {
        product,
        score,
        originalIndex: index,
        reasonText:
          reasons.length > 0
            ? "Matches: " + reasons.slice(0, 2).join(" • ")
            : "Curated for " + (persona ? persona.title : "your style")
      };
    });

    // Sort highest score first, preserving catalog order for ties
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.originalIndex - b.originalIndex;
    });

    const targetCount = Math.min(3, catalog.length);
    const strongMatches = scored.filter((entry) => entry.score >= 3);
    const selectedEntries = [];
    const seenIds = new Set();

    strongMatches.slice(0, targetCount).forEach((entry) => {
      selectedEntries.push(entry);
      seenIds.add(entry.product.id);
    });

    // Graceful fallback: fill up to targetCount with top-scored / featured catalog pieces
    if (selectedEntries.length < targetCount) {
      scored.forEach((entry) => {
        if (selectedEntries.length >= targetCount) return;
        if (!seenIds.has(entry.product.id)) {
          seenIds.add(entry.product.id);
          selectedEntries.push({
            product: entry.product,
            reasonText:
              entry.score > 1.5
                ? entry.reasonText
                : "Featured Artisan Pick"
          });
        }
      });
    }

    const reasonsMap = {};
    selectedEntries.forEach((entry) => {
      reasonsMap[entry.product.id] = entry.reasonText;
    });

    return {
      products: selectedEntries.map((entry) => entry.product),
      reasons: reasonsMap
    };
  }

  /**
   * Renders the persona summary and matched product cards into #quiz-results-section.
   * @param {Object} resultState
   */
  function renderResultsSection(resultState) {
    const quizContainer = document.getElementById("quiz-container");
    const resultsSection = document.getElementById("quiz-results-section");
    const personaTitleEl = document.getElementById("persona-title");
    const personaDescEl = document.getElementById("persona-description");
    const personaTagsEl = document.getElementById("persona-tags");
    const productsGridEl = document.getElementById("quiz-matched-products");

    if (!resultsSection || !productsGridEl) return;

    if (personaTitleEl) {
      personaTitleEl.textContent = resultState.personaTitle || "Your Zaverat Style";
    }
    if (personaDescEl) {
      personaDescEl.textContent = resultState.personaDescription || "";
    }
    if (personaTagsEl) {
      const tags = Array.isArray(resultState.personaTags) ? resultState.personaTags : [];
      personaTagsEl.innerHTML = tags
        .map((tag) => '<li class="persona-tag">' + escapeHtml(tag) + "</li>")
        .join("");
    }

    const wishlistSet = new Set(
      window.ZaveratStorage ? window.ZaveratStorage.getWishlist() : []
    );

    const matchedProducts = (resultState.matchedProductIds || [])
      .map((id) => findProductById(id))
      .filter(Boolean);

    // Fallback if stored product IDs are missing/stale
    const productsToRender =
      matchedProducts.length > 0
        ? matchedProducts
        : getCatalogProducts().slice(0, 3);

    const reasonsMap = resultState.matchReasons || {};

    if (productsToRender.length === 0) {
      productsGridEl.innerHTML =
        '<div class="card"><p>No handcrafted products are currently available in the catalogue.</p></div>';
    } else {
      productsGridEl.innerHTML = productsToRender
        .map((product) => buildMatchedProductCard(product, wishlistSet.has(product.id), reasonsMap[product.id]))
        .join("");
    }

    if (quizContainer) {
      quizContainer.hidden = true;
    }
    resultsSection.hidden = false;
  }

  /**
   * Builds HTML markup for a single matched product card.
   * @param {Object} product
   * @param {boolean} isSavedInWishlist
   * @param {string} [matchReason]
   * @returns {string}
   */
  function buildMatchedProductCard(product, isSavedInWishlist, matchReason) {
    const safeId = escapeHtml(product.id);
    const safeName = escapeHtml(product.name);
    const safeCategory = escapeHtml(product.category);
    const safeMaterial = escapeHtml(product.material);
    const detailUrl = "product-detail.html?id=" + encodeURIComponent(product.id);
    const imageUrl = escapeHtml(resolveProductImage(product.image));
    const reasonText = matchReason || "Featured Artisan Pick";
    const stockClass = product.inStock ? "in-stock" : "out-of-stock";
    const stockLabel = product.inStock ? "In Stock" : "Out of Stock";

    return (
      '<article class="card product-card" data-product-id="' + safeId + '">' +
        '<div class="product-media">' +
          '<a href="' + detailUrl + '">' +
            '<img src="' + imageUrl + '" alt="' + safeName + " — " + safeMaterial + '" loading="lazy">' +
          "</a>" +
          '<button type="button" class="product-wish-btn' + (isSavedInWishlist ? " is-active" : "") + '" ' +
            'data-action="toggle-wishlist" data-product-id="' + safeId + '" ' +
            'aria-label="' + (isSavedInWishlist ? "Remove " + safeName + " from wishlist" : "Add " + safeName + " to wishlist") + '" ' +
            'aria-pressed="' + String(isSavedInWishlist) + '">' +
            (isSavedInWishlist ? "&#9829;" : "&#9825;") +
          "</button>" +
        "</div>" +
        '<div class="product-info">' +
          '<p class="product-meta">' + safeCategory + " &middot; " + safeMaterial + "</p>" +
          '<h3 class="product-title"><a href="' + detailUrl + '">' + safeName + "</a></h3>" +
          '<div class="quiz-match-reason">' +
            '<span class="meta-pill">' + escapeHtml(reasonText) + "</span>" +
          "</div>" +
          '<div class="product-pricing">' +
            '<strong class="product-price">' + escapeHtml(formatPKR(product.price)) + "</strong>" +
            '<span class="meta-pill stock-badge ' + stockClass + '">' + stockLabel + "</span>" +
          "</div>" +
          '<div class="quiz-card-actions">' +
            '<button type="button" class="btn btn-primary product-add-btn" ' +
              'data-action="add-to-cart" data-product-id="' + safeId + '"' +
              (product.inStock ? "" : " disabled") + ">" +
              (product.inStock ? "Add to Cart" : "Out of Stock") +
            "</button>" +
            '<button type="button" class="btn btn-outline" ' +
              'data-action="toggle-wishlist" data-product-id="' + safeId + '" ' +
              'aria-pressed="' + String(isSavedInWishlist) + '">' +
              (isSavedInWishlist ? "Saved in Wishlist" : "Add to Wishlist") +
            "</button>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /**
   * Updates the saved quiz banner UI when a valid quiz state exists in storage.
   * @param {Object|null} savedState
   */
  function updateSavedBanner(savedState) {
    const bannerEl = document.getElementById("saved-quiz-banner");
    const personaNameEl = document.getElementById("saved-persona-name");
    const personaSummaryEl = document.getElementById("saved-persona-summary");
    if (!bannerEl) return;

    if (!savedState || !savedState.personaTitle) {
      bannerEl.hidden = true;
      return;
    }

    if (personaNameEl) {
      personaNameEl.textContent = savedState.personaTitle;
    }
    if (personaSummaryEl) {
      const count = Array.isArray(savedState.matchedProductIds) ? savedState.matchedProductIds.length : 0;
      const pieceLabel = count === 1 ? "piece" : "pieces";
      personaSummaryEl.textContent =
        count > 0
          ? "You have " + count + " saved handcrafted " + pieceLabel + " matched to your profile. View your results or retake the quiz anytime."
          : "You previously completed the Zaverat Style Quiz. Jump straight to your curated pieces or retake the quiz anytime.";
    }

    bannerEl.hidden = false;
  }

  /**
   * Validates the current step and advances to the next question.
   */
  function handleNextStep() {
    const question = QUIZ_QUESTIONS[quizState.currentStep];
    if (!question) return;

    if (!quizState.answers[question.id]) {
      showValidationMessage("Please select an option before continuing to the next question.");
      return;
    }

    if (quizState.currentStep < QUIZ_QUESTIONS.length - 1) {
      quizState.currentStep += 1;
      renderCurrentQuestion();
      focusFirstOrSelectedOption();
    }
  }

  /**
   * Returns to the previous question while preserving all selected answers.
   */
  function handlePrevStep() {
    if (quizState.currentStep > 0) {
      quizState.currentStep -= 1;
      renderCurrentQuestion();
      focusFirstOrSelectedOption();
    }
  }

  /**
   * Validates the final question, calculates persona & matches, persists state, and displays results.
   */
  function handleSubmitQuiz() {
    const question = QUIZ_QUESTIONS[quizState.currentStep];
    if (!question) return;

    if (!quizState.answers[question.id]) {
      showValidationMessage("Please select an option before viewing your curated matches.");
      return;
    }

    const persona = calculateStylePersona(quizState.answers);
    const { products, reasons } = matchCatalogProducts(quizState.answers, persona);

    const completedState = {
      answers: Object.assign({}, quizState.answers),
      personaId: persona.id,
      personaTitle: persona.title,
      personaDescription: persona.description,
      personaTags: persona.tags.slice(),
      matchedProductIds: products.map((product) => product.id),
      matchReasons: reasons,
      completedAt: new Date().toISOString()
    };

    if (window.ZaveratStorage) {
      window.ZaveratStorage.saveQuizState(completedState);
    }

    updateSavedBanner(completedState);
    renderResultsSection(completedState);

    const resultsSection = document.getElementById("quiz-results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /**
   * Restores saved quiz results straight into the results section.
   */
  function handleViewSavedMatches() {
    if (!window.ZaveratStorage) return;
    const savedState = window.ZaveratStorage.getQuizState();
    if (!savedState || !savedState.personaTitle) return;

    renderResultsSection(savedState);

    const resultsSection = document.getElementById("quiz-results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /**
   * Clears saved quiz state and restarts the quiz cleanly from Question 1.
   */
  function handleRetakeQuiz() {
    quizState.currentStep = 0;
    quizState.answers = {};

    if (window.ZaveratStorage) {
      window.ZaveratStorage.saveQuizState(null);
    }

    const bannerEl = document.getElementById("saved-quiz-banner");
    const resultsSection = document.getElementById("quiz-results-section");
    const quizContainer = document.getElementById("quiz-container");

    if (bannerEl) bannerEl.hidden = true;
    if (resultsSection) resultsSection.hidden = true;
    if (quizContainer) quizContainer.hidden = false;

    renderCurrentQuestion();
    focusFirstOrSelectedOption();

    if (quizContainer) {
      quizContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /**
   * Toggles a recommended product in ZaveratStorage wishlist and refreshes its card buttons.
   * @param {string} productId
   */
  function handleToggleWishlist(productId) {
    if (!window.ZaveratStorage) return;
    const product = findProductById(productId);
    if (!product) return;

    const updatedWishlist = window.ZaveratStorage.toggleWishlist(productId);
    const isSaved = updatedWishlist.includes(productId);
    syncHeaderBadges();
    syncCardWishlistButtons(productId, isSaved, product.name);
  }

  /**
   * Adds a recommended product to ZaveratStorage cart and updates the header badge and button state.
   * @param {string} productId
   * @param {HTMLButtonElement} buttonEl
   */
  function handleAddToCart(productId, buttonEl) {
    if (!window.ZaveratStorage) return;
    const product = findProductById(productId);
    if (!product || !product.inStock) return;

    window.ZaveratStorage.addToCart(productId, 1);
    syncHeaderBadges();

    if (buttonEl) {
      const existingTimer = cartButtonTimers.get(buttonEl);
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }
      buttonEl.textContent = "Added to Cart \u2713";
      const timerId = window.setTimeout(() => {
        buttonEl.textContent = "Add to Cart";
      }, 1800);
      cartButtonTimers.set(buttonEl, timerId);
    }
  }

  /**
   * Updates all wishlist button states for a specific product card without rebuilding the grid.
   * @param {string} productId
   * @param {boolean} isSaved
   * @param {string} productName
   */
  function syncCardWishlistButtons(productId, isSaved, productName) {
    const card = Array.from(
      document.querySelectorAll("#quiz-matched-products .product-card[data-product-id]")
    ).find((el) => el.dataset.productId === productId);
    if (!card) return;

    const iconBtn = card.querySelector('.product-wish-btn[data-action="toggle-wishlist"]');
    const textBtn = card.querySelector('.quiz-card-actions button[data-action="toggle-wishlist"]');

    if (iconBtn) {
      iconBtn.classList.toggle("is-active", isSaved);
      iconBtn.setAttribute("aria-pressed", String(isSaved));
      iconBtn.setAttribute(
        "aria-label",
        isSaved ? "Remove " + productName + " from wishlist" : "Add " + productName + " to wishlist"
      );
      iconBtn.innerHTML = isSaved ? "&#9829;" : "&#9825;";
    }

    if (textBtn) {
      textBtn.setAttribute("aria-pressed", String(isSaved));
      textBtn.textContent = isSaved ? "Saved in Wishlist" : "Add to Wishlist";
    }
  }

  /**
   * Refreshes all matched cards' wishlist button states (e.g. after cross-tab storage update).
   */
  function syncAllRenderedWishlistStates() {
    if (!window.ZaveratStorage) return;
    const savedSet = new Set(window.ZaveratStorage.getWishlist());
    const cards = document.querySelectorAll("#quiz-matched-products .product-card[data-product-id]");
    cards.forEach((card) => {
      const productId = card.dataset.productId;
      const product = findProductById(productId);
      if (product) {
        syncCardWishlistButtons(productId, savedSet.has(productId), product.name);
      }
    });
  }

  /**
   * Moves keyboard focus to the currently selected option card, or the first option card.
   */
  function focusFirstOrSelectedOption() {
    const optionsGridEl = document.getElementById("quiz-options-grid");
    if (!optionsGridEl) return;
    const target =
      optionsGridEl.querySelector(".quiz-option-card.is-selected") ||
      optionsGridEl.querySelector(".quiz-option-card");
    if (target) {
      target.focus();
    }
  }

  /**
   * Supports WAI-ARIA radiogroup arrow-key navigation across option cards.
   * @param {KeyboardEvent} event
   */
  function handleOptionsKeydown(event) {
    const currentCard = event.target.closest(".quiz-option-card");
    if (!currentCard) return;

    const optionsGridEl = document.getElementById("quiz-options-grid");
    if (!optionsGridEl) return;

    const cards = Array.from(optionsGridEl.querySelectorAll(".quiz-option-card"));
    if (cards.length === 0) return;

    const currentIndex = cards.indexOf(currentCard);
    let nextIndex = -1;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % cards.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + cards.length) % cards.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = cards.length - 1;
    }

    if (nextIndex !== -1) {
      event.preventDefault();
      const targetCard = cards[nextIndex];
      if (targetCard && targetCard.dataset.optionId) {
        selectOption(targetCard.dataset.optionId, true);
      }
    }
  }

  /**
   * Attaches all DOM and storage event listeners for the Style Quiz page.
   */
  function bindEvents() {
    const optionsGridEl = document.getElementById("quiz-options-grid");
    const prevBtn = document.getElementById("quiz-prev-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    const submitBtn = document.getElementById("quiz-submit-btn");
    const viewSavedBtn = document.getElementById("view-saved-matches-btn");
    const bannerRetakeBtn = document.getElementById("banner-retake-quiz-btn");
    const resultsRetakeBtn = document.getElementById("retake-quiz-btn");
    const matchedProductsEl = document.getElementById("quiz-matched-products");

    if (optionsGridEl) {
      optionsGridEl.addEventListener("click", (event) => {
        const card = event.target.closest(".quiz-option-card");
        if (!card || !card.dataset.optionId) return;
        selectOption(card.dataset.optionId, false);
      });

      optionsGridEl.addEventListener("keydown", handleOptionsKeydown);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", handlePrevStep);
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", handleNextStep);
    }
    if (submitBtn) {
      submitBtn.addEventListener("click", handleSubmitQuiz);
    }
    if (viewSavedBtn) {
      viewSavedBtn.addEventListener("click", handleViewSavedMatches);
    }
    if (bannerRetakeBtn) {
      bannerRetakeBtn.addEventListener("click", handleRetakeQuiz);
    }
    if (resultsRetakeBtn) {
      resultsRetakeBtn.addEventListener("click", handleRetakeQuiz);
    }

    if (matchedProductsEl) {
      matchedProductsEl.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const action = button.dataset.action;
        const productId = button.dataset.productId;
        if (!productId) return;

        if (action === "toggle-wishlist") {
          handleToggleWishlist(productId);
        } else if (action === "add-to-cart") {
          handleAddToCart(productId, button);
        }
      });
    }

    window.addEventListener("storage", (event) => {
      if (!window.ZaveratStorage) return;
      const keys = Object.values(window.ZaveratStorage.KEYS);
      if (!event.key || keys.includes(event.key)) {
        syncHeaderBadges();
        syncAllRenderedWishlistStates();
      }
    });
  }

  /**
   * Initializes the Style Quiz page on DOMContentLoaded.
   */
  function initStyleQuiz() {
    renderCurrentQuestion();
    syncHeaderBadges();

    if (window.ZaveratStorage) {
      const savedState = window.ZaveratStorage.getQuizState();
      if (savedState && savedState.personaTitle) {
        updateSavedBanner(savedState);
      }
    }

    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", initStyleQuiz);
})();
