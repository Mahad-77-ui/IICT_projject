/**
 * Zaverat — Shopping Cart Interactive Controller
 * Handles cart state, localStorage sync, quantity steppers, promo codes,
 * gift note toggle, wishlist transfer, upsells, and checkout review modal.
 */

(function () {
  const FREE_SHIPPING_THRESHOLD = 3000;
  const STANDARD_SHIPPING_FEE = 250;

  // Clean data model for cart & upsell products
  const CART_PRODUCTS = [
    {
      id: "zv-001",
      name: "Mehrunisa Kundan Choker",
      category: "Necklaces",
      price: 14500,
      material: "22k Gold-Plated Brass & Kundan Stones",
      specsExtra: "",
      // Update 'image' path here when adding your own product photos
      image: "images/products/placeholder-necklace.jpg",
      fallbackImage: "images/products/placeholder-necklace.svg",
      inStock: true
    },
    {
      id: "zv-002",
      name: "Lahori Jhumka Drops",
      category: "Earrings",
      price: 4800,
      material: "925 Sterling Silver & Freshwater Pearls",
      specsExtra: "",
      // Update 'image' path here when adding your own product photos
      image: "images/products/placeholder-earrings.jpg",
      fallbackImage: "images/products/placeholder-earrings.svg",
      inStock: true
    },
    {
      id: "zv-003",
      name: "Chitrali Filigree Cuff",
      category: "Bracelets",
      price: 6200,
      material: "Hammered Recycled Brass & Turquoise",
      specsExtra: "",
      // Update 'image' path here when adding your own product photos
      image: "images/products/placeholder-cuff.jpg",
      fallbackImage: "images/products/placeholder-cuff.svg",
      inStock: true
    },
    {
      id: "zv-004",
      name: "Sufi Signet Ring",
      category: "Rings",
      price: 3900,
      material: "925 Sterling Silver & Onyx",
      specsExtra: "Size: 7",
      // Update 'image' path here when adding your own product photos
      image: "images/products/placeholder-ring.jpg",
      fallbackImage: "images/products/placeholder-ring.svg",
      inStock: true
    },
    {
      id: "zv-pearl",
      name: "Pearl Elegance Necklace",
      category: "Necklaces",
      price: 2850,
      material: "18k Gold Vermeil & Natural Freshwater Pearls",
      specsExtra: "",
      // Update 'image' path here when adding your own product photos
      image: "images/products/pearl-elegance.jpg",
      fallbackImage: "images/products/pearl-elegance.svg",
      inStock: true
    },
    {
      id: "zv-studs",
      name: "Multani Turquoise Studs",
      category: "Earrings",
      price: 2450,
      material: "925 Sterling Silver & Natural Turquoise",
      specsExtra: "",
      // Update 'image' path here when adding your own product photos
      image: "images/products/placeholder-earrings.jpg",
      fallbackImage: "images/products/placeholder-earrings.svg",
      inStock: true
    }
  ];

  const DEFAULT_SEED_CART = [
    { productId: "zv-001", quantity: 1 },
    { productId: "zv-002", quantity: 1 },
    { productId: "zv-004", quantity: 1 }
  ];

  let activePromo = null;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatRs(amount) {
    return "Rs. " + Number(amount || 0).toLocaleString("en-PK");
  }

  function formatPkr(amount) {
    return "PKR " + Number(amount || 0).toLocaleString("en-PK");
  }

  function getCatalog() {
    const merged = CART_PRODUCTS.slice();
    const shared = (window.ZAVERAT_DATA && Array.isArray(window.ZAVERAT_DATA.products))
      ? window.ZAVERAT_DATA.products
      : [];

    shared.forEach(function (sharedItem) {
      if (!merged.some(function (item) { return item.id === sharedItem.id; })) {
        merged.push(sharedItem);
      }
    });

    return merged;
  }

  function findProduct(productId) {
    return getCatalog().find(function (item) { return item.id === productId; }) || null;
  }

  function resolveAssetFromPage(relPath) {
    const clean = String(relPath || "images/products/placeholder-necklace.svg").replace(/^\.\.\//, "");
    if (/^(https?:|data:|\/)/i.test(clean)) return clean;
    return "../" + clean;
  }

  function showCartToast(message) {
    const container = document.querySelector(".cart-toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    container.appendChild(toast);

    window.setTimeout(function () {
      toast.remove();
    }, 2800);
  }

  function ensureInitialCartSeeded() {
    if (!window.ZaveratStorage) return;
    try {
      const existingRaw = window.localStorage.getItem(window.ZaveratStorage.KEYS.CART);
      if (existingRaw === null) {
        window.ZaveratStorage.saveCart(DEFAULT_SEED_CART.slice());
      }
    } catch (err) {
      // Ignore storage errors in restricted environments
    }
  }

  function getCartItemsWithProducts() {
    const rawCart = window.ZaveratStorage ? window.ZaveratStorage.getCart() : DEFAULT_SEED_CART;
    return rawCart
      .map(function (entry) {
        const product = findProduct(entry.productId);
        if (!product) return null;
        return {
          product: product,
          quantity: Math.max(1, Number(entry.quantity) || 1)
        };
      })
      .filter(Boolean);
  }

  function calculateDiscount(subtotal) {
    if (!activePromo || subtotal <= 0) return 0;
    if (activePromo.type === "percent") {
      return Math.round(subtotal * (activePromo.value / 100));
    }
    if (activePromo.type === "flat") {
      return Math.min(subtotal, activePromo.value);
    }
    return 0;
  }

  function getOrderTotals() {
    const items = getCartItemsWithProducts();
    const totalPieces = items.reduce(function (sum, entry) { return sum + entry.quantity; }, 0);
    const subtotal = items.reduce(function (sum, entry) {
      return sum + Number(entry.product.price || 0) * entry.quantity;
    }, 0);
    const shippingCost = subtotal === 0 ? 0 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE);
    const discount = calculateDiscount(subtotal);
    const grandTotal = Math.max(0, subtotal - discount + shippingCost);

    return {
      items: items,
      totalPieces: totalPieces,
      subtotal: subtotal,
      shippingCost: shippingCost,
      discount: discount,
      grandTotal: grandTotal
    };
  }

  function updateShippingMeter(subtotal) {
    const statusEl = document.getElementById("cartShippingStatus");
    const badgeEl = document.getElementById("cartShippingBadge");
    const barEl = document.getElementById("cartShippingProgressBar");
    const fillEl = document.getElementById("cartShippingFill");
    if (!statusEl || !badgeEl || !barEl || !fillEl) return;

    const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    fillEl.style.width = pct + "%";
    barEl.setAttribute("aria-valuenow", String(Math.min(subtotal, FREE_SHIPPING_THRESHOLD)));

    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      statusEl.innerHTML = 'You have unlocked <strong>Complimentary Insured Nationwide Shipping over Rs. 3,000</strong>';
      badgeEl.textContent = "Free Shipping Active";
      badgeEl.classList.remove("is-pending");
      fillEl.classList.add("is-complete");
    } else if (subtotal === 0) {
      statusEl.innerHTML = 'Enjoy <strong>Complimentary Insured Nationwide Shipping over Rs. 3,000</strong>';
      badgeEl.textContent = "Rs. 3,000 Goal";
      badgeEl.classList.add("is-pending");
      fillEl.classList.remove("is-complete");
    } else {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      statusEl.innerHTML = 'Add <strong>' + formatRs(remaining) + '</strong> more for <strong>Complimentary Insured Nationwide Shipping over Rs. 3,000</strong>';
      badgeEl.textContent = pct + "% Unlocked";
      badgeEl.classList.add("is-pending");
      fillEl.classList.remove("is-complete");
    }
  }

  function syncNavbarBadges(totalPieces) {
    const cartBadge = document.getElementById("cart-count");
    if (cartBadge) {
      cartBadge.textContent = String(totalPieces);
    }

    const wishBadge = document.getElementById("wishlist-count");
    if (wishBadge && window.ZaveratStorage) {
      wishBadge.textContent = String(window.ZaveratStorage.getWishlistCount());
    }
  }

  function renderCart() {
    const listEl = document.getElementById("cartItemsList");
    const emptyEl = document.getElementById("cartEmptyState");
    const countLabelEl = document.getElementById("cartItemCountLabel");
    const clearBtn = document.getElementById("cartClearBtn");
    const subtotalLabelEl = document.getElementById("cartSummarySubtotalLabel");
    const subtotalEl = document.getElementById("cartSummarySubtotal");
    const shippingEl = document.getElementById("cartSummaryShipping");
    const discountRowEl = document.getElementById("cartDiscountRow");
    const discountLabelEl = document.getElementById("cartDiscountLabel");
    const discountAmountEl = document.getElementById("cartDiscountAmount");
    const totalEl = document.getElementById("cartSummaryTotal");
    const checkoutBtn = document.getElementById("cartCheckoutBtn");

    const summary = getOrderTotals();
    const items = summary.items;
    const totalPieces = summary.totalPieces;
    const subtotal = summary.subtotal;

    if (countLabelEl) {
      countLabelEl.textContent = totalPieces === 1
        ? "1 handcrafted piece ready for insured dispatch"
        : totalPieces + " handcrafted pieces ready for insured dispatch";
    }

    if (clearBtn) {
      clearBtn.hidden = items.length === 0;
    }

    if (listEl && emptyEl) {
      if (!items.length) {
        listEl.innerHTML = "";
        listEl.hidden = true;
        emptyEl.hidden = false;
      } else {
        emptyEl.hidden = true;
        listEl.hidden = false;
        listEl.innerHTML = items.map(function (entry) {
          const p = entry.product;
          const qty = entry.quantity;
          const lineTotal = Number(p.price || 0) * qty;
          const sizeExtra = p.specsExtra ? " &bull; " + escapeHtml(p.specsExtra) : "";
          const stockText = p.inStock === false ? "Made to Order" : "In Stock";
          const imgSrc = resolveAssetFromPage(p.image);
          const fallbackSrc = resolveAssetFromPage(p.fallbackImage || "images/products/placeholder-necklace.svg");

          return (
            '<article class="cart-item-row" data-product-id="' + escapeHtml(p.id) + '">' +
              '<div class="cart-item-thumb">' +
                '<!-- REPLACE IMAGE: swap src with your own product photo -->' +
                '<img src="' + escapeHtml(imgSrc) + '" alt="' + escapeHtml(p.name) + '" onerror="this.onerror=null;this.src=\'' + escapeHtml(fallbackSrc) + '\';">' +
              '</div>' +
              '<div class="cart-item-details">' +
                '<h3 class="cart-item-name">' +
                  '<a href="../pages/product-detail.html?id=' + encodeURIComponent(p.id) + '">' + escapeHtml(p.name) + '</a>' +
                '</h3>' +
                '<p class="cart-item-specs">' +
                  escapeHtml(p.material) + sizeExtra + ' &bull; <span class="cart-stock-tag">' + stockText + '</span>' +
                '</p>' +
                '<p class="cart-item-unit-price">' + formatRs(p.price) + ' each</p>' +
                '<div class="cart-item-actions">' +
                  '<button type="button" class="cart-action-link" data-action="wishlist" data-id="' + escapeHtml(p.id) + '">Move to Wishlist</button>' +
                  '<span class="cart-action-sep" aria-hidden="true">&middot;</span>' +
                  '<button type="button" class="cart-action-link cart-remove-link" data-action="remove" data-id="' + escapeHtml(p.id) + '">Remove</button>' +
                '</div>' +
              '</div>' +
              '<div class="cart-item-controls">' +
                '<div class="cart-qty-stepper" aria-label="Quantity for ' + escapeHtml(p.name) + '">' +
                  '<button type="button" class="cart-qty-btn" data-action="decrease" data-id="' + escapeHtml(p.id) + '" aria-label="Decrease quantity"' + (qty <= 1 ? ' disabled' : '') + '>&minus;</button>' +
                  '<span class="cart-qty-value">' + qty + '</span>' +
                  '<button type="button" class="cart-qty-btn" data-action="increase" data-id="' + escapeHtml(p.id) + '" aria-label="Increase quantity">+</button>' +
                '</div>' +
                '<strong class="cart-item-subtotal">' + formatRs(lineTotal) + '</strong>' +
              '</div>' +
            '</article>'
          );
        }).join("");
      }
    }

    if (subtotalLabelEl) {
      subtotalLabelEl.textContent = "Subtotal (" + totalPieces + (totalPieces === 1 ? " item)" : " items)");
    }
    if (subtotalEl) {
      subtotalEl.textContent = formatRs(subtotal);
    }
    if (shippingEl) {
      if (subtotal === 0) {
        shippingEl.textContent = "Rs. 0";
        shippingEl.classList.remove("cart-shipping-free");
      } else if (summary.shippingCost === 0) {
        shippingEl.textContent = "FREE";
        shippingEl.classList.add("cart-shipping-free");
      } else {
        shippingEl.textContent = formatRs(summary.shippingCost);
        shippingEl.classList.remove("cart-shipping-free");
      }
    }
    if (discountRowEl && discountLabelEl && discountAmountEl) {
      if (summary.discount > 0 && activePromo) {
        discountRowEl.classList.add("is-applied");
        discountLabelEl.textContent = "Promo Discount (" + activePromo.code + ")";
        discountAmountEl.textContent = "\u2212 " + formatRs(summary.discount);
      } else {
        discountRowEl.classList.remove("is-applied");
        discountLabelEl.textContent = "Promo Discount";
        discountAmountEl.textContent = "Rs. 0";
      }
    }
    if (totalEl) {
      totalEl.textContent = formatPkr(summary.grandTotal);
    }
    if (checkoutBtn) {
      if (items.length === 0) {
        checkoutBtn.classList.add("is-disabled");
        checkoutBtn.setAttribute("aria-disabled", "true");
      } else {
        checkoutBtn.classList.remove("is-disabled");
        checkoutBtn.removeAttribute("aria-disabled");
      }
    }

    updateShippingMeter(subtotal);
    syncNavbarBadges(totalPieces);
  }

  function updateItemQuantity(productId, delta) {
    if (!window.ZaveratStorage) return;
    const cart = window.ZaveratStorage.getCart();
    const item = cart.find(function (entry) { return entry.productId === productId; });
    if (!item) return;

    item.quantity = Math.max(1, (Number(item.quantity) || 1) + delta);
    window.ZaveratStorage.saveCart(cart);
    renderCart();
  }

  function handleCartItemClick(event) {
    const btn = event.target.closest("[data-action][data-id]");
    if (!btn || !window.ZaveratStorage) return;

    const action = btn.getAttribute("data-action");
    const productId = btn.getAttribute("data-id");
    const product = findProduct(productId);
    const productName = product ? product.name : "Piece";

    if (action === "increase") {
      updateItemQuantity(productId, 1);
    } else if (action === "decrease") {
      updateItemQuantity(productId, -1);
    } else if (action === "remove") {
      window.ZaveratStorage.removeFromCart(productId);
      renderCart();
      showCartToast(productName + " removed from your bag.");
    } else if (action === "wishlist") {
      const wishlist = window.ZaveratStorage.getWishlist();
      if (!wishlist.includes(productId)) {
        window.ZaveratStorage.toggleWishlist(productId);
      }
      window.ZaveratStorage.removeFromCart(productId);
      renderCart();
      showCartToast(productName + " moved to your wishlist.");
    }
  }

  function initPromoForm() {
    const form = document.getElementById("cartPromoForm");
    const input = document.getElementById("cartPromoInput");
    const feedback = document.getElementById("cartPromoFeedback");
    if (!form || !input || !feedback) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const code = input.value.trim().toUpperCase();

      if (!code) {
        activePromo = null;
        feedback.textContent = "Please enter a promo code (e.g., ZAVERAT10).";
        feedback.className = "cart-promo-feedback is-error";
        renderCart();
        return;
      }

      if (code === "ZAVERAT10") {
        activePromo = { code: "ZAVERAT10", type: "percent", value: 10 };
        feedback.textContent = "ZAVERAT10 applied — 10% artisan discount unlocked.";
        feedback.className = "cart-promo-feedback is-success";
      } else {
        activePromo = null;
        feedback.textContent = "Invalid promo code. Enter ZAVERAT10 for 10% off.";
        feedback.className = "cart-promo-feedback is-error";
      }

      renderCart();
    });
  }

  function initGiftOptions() {
    const checkbox = document.getElementById("cartGiftCheckbox");
    const noteWrap = document.getElementById("cartGiftNoteWrap");
    const noteInput = document.getElementById("cartGiftNoteInput");
    if (!checkbox || !noteWrap || !noteInput) return;

    function syncVisibility() {
      if (checkbox.checked) {
        noteWrap.hidden = false;
        noteWrap.classList.add("is-open");
      } else {
        noteWrap.classList.remove("is-open");
        noteWrap.hidden = true;
      }
    }

    function persistGiftState() {
      try {
        window.localStorage.setItem("zaverat_gift_options", JSON.stringify({
          enabled: checkbox.checked,
          note: noteInput.value
        }));
      } catch (err) {
        // Ignore storage error
      }
    }

    try {
      const saved = JSON.parse(window.localStorage.getItem("zaverat_gift_options") || "null");
      if (saved && typeof saved === "object") {
        checkbox.checked = Boolean(saved.enabled);
        noteInput.value = saved.note ? String(saved.note) : "";
      }
    } catch (err) {
      // Ignore storage error
    }

    syncVisibility();

    checkbox.addEventListener("change", function () {
      syncVisibility();
      if (checkbox.checked) {
        noteInput.focus();
      }
      persistGiftState();
    });

    noteInput.addEventListener("input", persistGiftState);
  }

  function initUpsellStrip() {
    const strip = document.getElementById("cartUpsellStrip");
    if (!strip) return;

    strip.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-upsell-id]");
      if (!btn || !window.ZaveratStorage) return;

      const productId = btn.getAttribute("data-upsell-id");
      const product = findProduct(productId);
      window.ZaveratStorage.addToCart(productId, 1);
      renderCart();
      showCartToast((product ? product.name : "Piece") + " added to your bag.");
    });
  }

  function initClearAndRestore() {
    const clearBtn = document.getElementById("cartClearBtn");
    if (clearBtn && window.ZaveratStorage) {
      clearBtn.addEventListener("click", function () {
        window.ZaveratStorage.clearCart();
        activePromo = null;
        const feedback = document.getElementById("cartPromoFeedback");
        if (feedback) {
          feedback.textContent = "";
          feedback.className = "cart-promo-feedback";
        }
        renderCart();
        showCartToast("Shopping bag cleared.");
      });
    }

    const restoreBtn = document.getElementById("cartRestoreDefaultBtn");
    if (restoreBtn && window.ZaveratStorage) {
      restoreBtn.addEventListener("click", function () {
        window.ZaveratStorage.saveCart(DEFAULT_SEED_CART.slice());
        renderCart();
        showCartToast("Restored 3 signature Zaverat pieces to your bag.");
      });
    }
  }

  function initCheckoutConfirmationModal() {
    const trigger = document.getElementById("cartCheckoutBtn");
    const modal = document.getElementById("cartCheckoutModal");
    if (!trigger || !modal) return;

    const closeBtns = modal.querySelectorAll("[data-checkout-close]");
    const itemsCountEl = document.getElementById("cartModalItemCount");
    const shippingStatusEl = document.getElementById("cartModalShippingStatus");
    const giftRowEl = document.getElementById("cartModalGiftRow");
    const giftNoteEl = document.getElementById("cartModalGiftNote");
    const totalEl = document.getElementById("cartModalTotal");
    const confirmLink = document.getElementById("cartModalConfirmBtn");

    function openModal() {
      const summary = getOrderTotals();
      if (!summary.items.length) {
        showCartToast("Add at least one piece before proceeding to checkout.");
        return;
      }

      if (itemsCountEl) {
        itemsCountEl.textContent = summary.totalPieces === 1
          ? "1 handcrafted piece"
          : summary.totalPieces + " handcrafted pieces";
      }

      if (shippingStatusEl) {
        shippingStatusEl.textContent = summary.shippingCost === 0
          ? "Complimentary Insured Shipping (FREE)"
          : "Standard Insured Shipping (" + formatRs(summary.shippingCost) + ")";
      }

      const giftCheck = document.getElementById("cartGiftCheckbox");
      const giftInput = document.getElementById("cartGiftNoteInput");
      if (giftRowEl && giftNoteEl) {
        if (giftCheck && giftCheck.checked) {
          giftRowEl.hidden = false;
          const noteVal = giftInput ? giftInput.value.trim() : "";
          giftNoteEl.textContent = noteVal
            ? '"' + noteVal + '"'
            : "Complimentary heirloom gift box included (no custom message)";
        } else {
          giftRowEl.hidden = true;
        }
      }

      if (totalEl) {
        totalEl.textContent = formatPkr(summary.grandTotal);
      }

      modal.hidden = false;
      if (confirmLink) confirmLink.focus();
    }

    function closeModal() {
      modal.hidden = true;
      trigger.focus();
    }

    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      openModal();
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) {
        closeModal();
      }
    });
  }

  function initThemeToggle() {
    const btn = document.getElementById("cartThemeToggle");
    if (!btn) return;

    try {
      if (window.localStorage.getItem("zaverat_theme") === "dark") {
        document.body.classList.add("cart-theme-dark");
        btn.setAttribute("aria-pressed", "true");
      }
    } catch (err) {
      // Ignore storage error
    }

    btn.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("cart-theme-dark");
      btn.setAttribute("aria-pressed", String(isDark));
      try {
        window.localStorage.setItem("zaverat_theme", isDark ? "dark" : "light");
      } catch (err) {
        // Ignore storage error
      }
    });
  }

  function initSearchModal() {
    const trigger = document.getElementById("cartSearchTrigger");
    const modal = document.getElementById("cartSearchModal");
    const input = document.getElementById("cartSearchInput");
    const resultsEl = document.getElementById("cartSearchResults");
    if (!trigger || !modal || !input || !resultsEl) return;

    const closeBtn = modal.querySelector(".cart-modal-close");

    function renderSearchResults(query) {
      const term = String(query || "").trim().toLowerCase();
      const matches = getCatalog().filter(function (p) {
        if (!term) return true;
        return (
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.material.toLowerCase().includes(term)
        );
      });

      if (!matches.length) {
        resultsEl.innerHTML = '<p class="cart-search-empty">No handcrafted pieces matched "' + escapeHtml(query) + '".</p>';
        return;
      }

      resultsEl.innerHTML = matches.map(function (p) {
        return (
          '<div class="cart-search-result-row">' +
            '<div>' +
              '<strong>' + escapeHtml(p.name) + '</strong>' +
              '<span>' + escapeHtml(p.material) + ' &bull; ' + formatRs(p.price) + '</span>' +
            '</div>' +
            '<button type="button" class="btn btn-outline cart-search-add-btn" data-search-add="' + escapeHtml(p.id) + '">+ Add</button>' +
          '</div>'
        );
      }).join("");
    }

    function openModal() {
      modal.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      renderSearchResults(input.value);
      input.focus();
    }

    function closeModal() {
      modal.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) closeModal();
    });

    input.addEventListener("input", function () {
      renderSearchResults(input.value);
    });

    resultsEl.addEventListener("click", function (event) {
      const addBtn = event.target.closest("[data-search-add]");
      if (!addBtn || !window.ZaveratStorage) return;
      const id = addBtn.getAttribute("data-search-add");
      const product = findProduct(id);
      window.ZaveratStorage.addToCart(id, 1);
      renderCart();
      showCartToast((product ? product.name : "Piece") + " added to your bag.");
      closeModal();
    });
  }

  function initNewsletterForm() {
    const form = document.getElementById("cartNewsletterForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      showCartToast("Subscribed to Zaverat studio dispatches.");
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureInitialCartSeeded();
    renderCart();

    const listEl = document.getElementById("cartItemsList");
    if (listEl) {
      listEl.addEventListener("click", handleCartItemClick);
    }

    initPromoForm();
    initGiftOptions();
    initUpsellStrip();
    initClearAndRestore();
    initCheckoutConfirmationModal();
    initThemeToggle();
    initSearchModal();
    initNewsletterForm();

    window.addEventListener("zaverat:storage-updated", renderCart);
  });
})();
