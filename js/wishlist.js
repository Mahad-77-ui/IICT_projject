/**
 * Zaverat — Wishlist & Recently Viewed Page Logic
 * Member 6 (Haad Harris, Roll No: 26i-3091)
 * Manages dynamic wishlist rendering, sorting, cart/wishlist state actions,
 * bulk actions, feedback notifications, and the recently viewed tray.
 */

(function () {
  "use strict";

  const PRODUCT_SVG_FALLBACKS = {
    "images/products/placeholder-necklace.jpg": "images/products/placeholder-necklace.svg",
    "images/products/placeholder-earrings.jpg": "images/products/placeholder-earrings.svg",
    "images/products/placeholder-cuff.jpg": "images/products/placeholder-cuff.svg",
    "images/products/placeholder-ring.jpg": "images/products/placeholder-ring.svg"
  };

  let feedbackTimerId = null;

  /**
   * Escapes HTML special characters to prevent markup injection.
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
   * Resolves a relative image path from pages/ and maps starter .jpg paths to local SVGs.
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
   * Formats a numeric amount in Pakistani Rupees (PKR).
   * @param {number} price
   * @returns {string}
   */
  function formatPKR(price) {
    return "PKR " + Number(price || 0).toLocaleString("en-PK");
  }

  /**
   * Returns the full product catalog array from window.ZAVERAT_DATA.
   * @returns {Array<Object>}
   */
  function getCatalogProducts() {
    if (!window.ZAVERAT_DATA || !Array.isArray(window.ZAVERAT_DATA.products)) {
      return [];
    }
    return window.ZAVERAT_DATA.products;
  }

  /**
   * Looks up a single product by ID from the catalog.
   * @param {string} productId
   * @returns {Object|undefined}
   */
  function findProductById(productId) {
    return getCatalogProducts().find((product) => product.id === productId);
  }

  /**
   * Resolves stored product IDs against the catalog, ignoring invalid or missing entries.
   * @param {Array<string>} ids
   * @returns {Array<Object>}
   */
  function resolveValidProducts(ids) {
    if (!Array.isArray(ids)) return [];
    const seen = new Set();
    const resolved = [];

    ids.forEach((id) => {
      if (typeof id !== "string" || seen.has(id)) return;
      const product = findProductById(id);
      if (product) {
        seen.add(id);
        resolved.push(product);
      }
    });

    return resolved;
  }

  /**
   * Sorts wishlist products according to the selected sort mode.
   * Note: toggleWishlist appends newly added IDs to the end, so "recent" reverses storage order.
   * @param {Array<Object>} products
   * @param {string} sortMode
   * @returns {Array<Object>}
   */
  function sortWishlistProducts(products, sortMode) {
    const copy = products.slice();
    if (sortMode === "price-asc") {
      return copy.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    }
    if (sortMode === "price-desc") {
      return copy.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }
    return copy.reverse();
  }

  /**
   * Synchronizes the navbar #wishlist-count and #cart-count badges with localStorage.
   */
  function syncHeaderBadges() {
    if (!window.ZaveratStorage) return;

    const wishlistBadge = document.getElementById("wishlist-count");
    const cartBadge = document.getElementById("cart-count");

    if (wishlistBadge) {
      const validWishlistCount = resolveValidProducts(window.ZaveratStorage.getWishlist()).length;
      wishlistBadge.textContent = String(validWishlistCount);
    }
    if (cartBadge) {
      cartBadge.textContent = String(window.ZaveratStorage.getCartCount());
    }
  }

  /**
   * Displays an accessible feedback banner message inside #wishlist-feedback.
   * @param {string} message
   * @param {"success"|"warning"|"danger"|"info"} [tone="success"]
   */
  function showFeedback(message, tone = "success") {
    const banner = document.getElementById("wishlist-feedback");
    if (!banner) return;

    const messageEl = banner.querySelector(".wishlist-feedback-message");
    if (messageEl) {
      messageEl.textContent = message;
    }

    banner.classList.remove("is-success", "is-warning", "is-danger");
    if (tone === "success" || tone === "warning" || tone === "danger") {
      banner.classList.add("is-" + tone);
    }

    banner.hidden = false;

    if (feedbackTimerId) {
      window.clearTimeout(feedbackTimerId);
    }
    feedbackTimerId = window.setTimeout(hideFeedback, 5000);
  }

  /**
   * Hides the #wishlist-feedback banner.
   */
  function hideFeedback() {
    const banner = document.getElementById("wishlist-feedback");
    if (banner) {
      banner.hidden = true;
    }
    if (feedbackTimerId) {
      window.clearTimeout(feedbackTimerId);
      feedbackTimerId = null;
    }
  }

  /**
   * Builds the shared product card shell with custom footer actions.
   * @param {Object} product
   * @param {string} actionsMarkup
   * @returns {string}
   */
  function buildProductCard(product, actionsMarkup) {
    const safeId = escapeHtml(product.id);
    const safeName = escapeHtml(product.name);
    const safeCategory = escapeHtml(product.category);
    const safeMaterial = escapeHtml(product.material);
    const detailUrl = "product-detail.html?id=" + encodeURIComponent(product.id);
    const imageUrl = escapeHtml(resolveProductImage(product.image));
    const stockClass = product.inStock ? "in-stock" : "out-of-stock";
    const stockLabel = product.inStock ? "In Stock" : "Out of Stock";

    return (
      '<article class="card product-card" data-product-id="' + safeId + '">' +
        '<div class="product-media">' +
          '<a href="' + detailUrl + '">' +
            '<img src="' + imageUrl + '" alt="' + safeName + " — " + safeMaterial + '" loading="lazy">' +
          "</a>" +
        "</div>" +
        '<div class="product-info">' +
          '<p class="product-meta">' + safeCategory + " &middot; " + safeMaterial + "</p>" +
          '<h3 class="product-title"><a href="' + detailUrl + '">' + safeName + "</a></h3>" +
          '<div class="product-pricing">' +
            '<strong class="product-price">' + escapeHtml(formatPKR(product.price)) + "</strong>" +
            '<span class="meta-pill stock-badge ' + stockClass + '">' + stockLabel + "</span>" +
          "</div>" +
          '<div class="wishlist-card-actions">' +
            actionsMarkup +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /**
   * Builds the HTML markup for a saved wishlist product card.
   * @param {Object} product
   * @returns {string}
   */
  function buildWishlistCardMarkup(product) {
    const safeId = escapeHtml(product.id);
    const actionsMarkup =
      '<button type="button" class="btn btn-primary" data-action="move-to-cart" data-product-id="' + safeId + '"' +
        (product.inStock ? "" : " disabled") + ">" +
        (product.inStock ? "Move to Cart" : "Out of Stock") +
      "</button>" +
      '<button type="button" class="btn btn-outline wishlist-clear-btn" data-action="remove-wishlist" data-product-id="' + safeId + '">' +
        "Remove" +
      "</button>";

    return buildProductCard(product, actionsMarkup);
  }

  /**
   * Builds the HTML markup for a recently viewed tray card.
   * @param {Object} product
   * @param {boolean} isSavedInWishlist
   * @returns {string}
   */
  function buildRecentlyViewedCardMarkup(product, isSavedInWishlist) {
    const safeId = escapeHtml(product.id);
    const detailUrl = "product-detail.html?id=" + encodeURIComponent(product.id);
    const actionsMarkup =
      '<button type="button" class="btn ' + (isSavedInWishlist ? "btn-outline" : "btn-primary") + '" ' +
        'data-action="toggle-wishlist" data-product-id="' + safeId + '" aria-pressed="' + String(isSavedInWishlist) + '">' +
        (isSavedInWishlist ? "Saved in Wishlist" : "Add to Wishlist") +
      "</button>" +
      '<a class="btn btn-outline" href="' + detailUrl + '">View Details</a>';

    return buildProductCard(product, actionsMarkup);
  }

  /**
   * Updates the summary counter text and bulk control disabled states.
   * @param {number} count
   */
  function updateSummaryAndControls(count) {
    const summaryTextEl = document.getElementById("wishlist-summary-text");
    const moveAllBtn = document.getElementById("wishlist-move-all-btn");
    const clearBtn = document.getElementById("wishlist-clear-btn");
    const sortSelect = document.getElementById("wishlist-sort");

    if (summaryTextEl) {
      const noun = count === 1 ? "piece" : "pieces";
      summaryTextEl.innerHTML = 'Showing <strong id="wishlist-summary-count">' + count + "</strong> saved " + noun;
    }

    const isEmpty = count === 0;
    if (moveAllBtn) moveAllBtn.disabled = isEmpty;
    if (clearBtn) clearBtn.disabled = isEmpty;
    if (sortSelect) sortSelect.disabled = isEmpty;
  }

  /**
   * Renders the saved wishlist grid or displays the empty state when no valid items are saved.
   */
  function renderWishlist() {
    if (!window.ZaveratStorage) return;

    const gridEl = document.getElementById("wishlist-grid");
    const emptyEl = document.getElementById("wishlist-empty-state");
    const sortSelect = document.getElementById("wishlist-sort");
    if (!gridEl || !emptyEl) return;

    const rawIds = window.ZaveratStorage.getWishlist();
    const validProducts = resolveValidProducts(rawIds);
    const sortMode = sortSelect ? sortSelect.value : "recent";
    const sortedProducts = sortWishlistProducts(validProducts, sortMode);

    updateSummaryAndControls(sortedProducts.length);

    if (sortedProducts.length === 0) {
      gridEl.innerHTML = "";
      gridEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    gridEl.hidden = false;
    gridEl.innerHTML = sortedProducts.map(buildWishlistCardMarkup).join("");
  }

  /**
   * Renders up to 4 recently viewed products in #recently-viewed-grid or shows fallback text.
   */
  function renderRecentlyViewed() {
    if (!window.ZaveratStorage) return;

    const gridEl = document.getElementById("recently-viewed-grid");
    const emptyEl = document.getElementById("recently-viewed-empty");
    if (!gridEl || !emptyEl) return;

    const recentIds = window.ZaveratStorage.getRecentlyViewed();
    const validRecent = resolveValidProducts(recentIds).slice(0, 4);

    if (validRecent.length === 0) {
      gridEl.innerHTML = "";
      gridEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }

    const savedSet = new Set(window.ZaveratStorage.getWishlist());
    emptyEl.hidden = true;
    gridEl.hidden = false;
    gridEl.innerHTML = validRecent
      .map((product) => buildRecentlyViewedCardMarkup(product, savedSet.has(product.id)))
      .join("");
  }

  /**
   * Removes a product ID from the saved wishlist without affecting other valid items.
   * @param {string} productId
   */
  function removeFromWishlistStorage(productId) {
    const nextIds = window.ZaveratStorage.getWishlist().filter((id) => id !== productId);
    window.ZaveratStorage.saveWishlist(nextIds);
  }

  /**
   * Moves a single product from the wishlist into the shopping cart.
   * @param {string} productId
   */
  function handleMoveToCart(productId) {
    const product = findProductById(productId);
    if (!product) {
      removeFromWishlistStorage(productId);
      refreshPageUI();
      showFeedback("This piece is no longer available and was removed from your wishlist.", "warning");
      return;
    }

    if (!product.inStock) {
      showFeedback(product.name + " is currently out of stock.", "warning");
      return;
    }

    const alreadyInCart = window.ZaveratStorage.getCart().some((item) => item.productId === productId);
    window.ZaveratStorage.addToCart(productId, 1);
    removeFromWishlistStorage(productId);
    refreshPageUI();

    if (alreadyInCart) {
      showFeedback(product.name + " was already in your cart — quantity updated and removed from Wishlist.", "info");
    } else {
      showFeedback(product.name + " moved to Shopping Bag.", "success");
    }
  }

  /**
   * Removes a single product from the wishlist and updates the UI.
   * @param {string} productId
   */
  function handleRemoveFromWishlist(productId) {
    const product = findProductById(productId);
    removeFromWishlistStorage(productId);
    refreshPageUI();
    showFeedback(
      (product ? product.name : "Item") + " removed from Wishlist.",
      "info"
    );
  }

  /**
   * Toggles a product in the wishlist from the Recently Viewed tray.
   * @param {string} productId
   */
  function handleToggleFromRecentlyViewed(productId) {
    const product = findProductById(productId);
    if (!product) return;

    const updatedWishlist = window.ZaveratStorage.toggleWishlist(productId);
    const isAdded = updatedWishlist.includes(productId);
    refreshPageUI();

    showFeedback(
      isAdded
        ? product.name + " added to your Wishlist."
        : product.name + " removed from your Wishlist.",
      isAdded ? "success" : "info"
    );
  }

  /**
   * Moves all in-stock wishlist items into the shopping cart.
   */
  function handleMoveAllToCart() {
    const validProducts = resolveValidProducts(window.ZaveratStorage.getWishlist());
    if (validProducts.length === 0) {
      showFeedback("Your wishlist is already empty.", "warning");
      return;
    }

    const inStockProducts = validProducts.filter((product) => product.inStock);
    if (inStockProducts.length === 0) {
      showFeedback("Saved pieces are currently out of stock and could not be moved.", "warning");
      return;
    }

    inStockProducts.forEach((product) => {
      window.ZaveratStorage.addToCart(product.id, 1);
    });

    const movedIds = new Set(inStockProducts.map((product) => product.id));
    const remainingIds = window.ZaveratStorage
      .getWishlist()
      .filter((id) => findProductById(id) && !movedIds.has(id));
    window.ZaveratStorage.saveWishlist(remainingIds);

    refreshPageUI();

    const movedCount = inStockProducts.length;
    const skippedCount = validProducts.length - movedCount;
    const noun = movedCount === 1 ? "piece" : "pieces";

    if (skippedCount > 0) {
      showFeedback(
        "Moved " + movedCount + " " + noun + " to Shopping Bag (" + skippedCount + " out-of-stock item kept).",
        "warning"
      );
    } else {
      showFeedback("Moved all " + movedCount + " " + noun + " to your Shopping Bag.", "success");
    }
  }

  /**
   * Clears all saved items from the wishlist after user confirmation.
   */
  function handleClearWishlist() {
    const validProducts = resolveValidProducts(window.ZaveratStorage.getWishlist());
    if (validProducts.length === 0) {
      showFeedback("Your wishlist is already empty.", "warning");
      return;
    }

    const confirmed = window.confirm("Remove all saved pieces from your wishlist?");
    if (!confirmed) return;

    window.ZaveratStorage.saveWishlist([]);
    refreshPageUI();
    showFeedback("Your wishlist has been cleared.", "danger");
  }

  /**
   * Re-renders wishlist, recently viewed tray, and header badge counts together.
   */
  function refreshPageUI() {
    renderWishlist();
    renderRecentlyViewed();
    syncHeaderBadges();
  }

  /**
   * Wires up event listeners for sorting, bulk actions, card actions, and cross-tab sync.
   */
  function bindEvents() {
    const sortSelect = document.getElementById("wishlist-sort");
    const moveAllBtn = document.getElementById("wishlist-move-all-btn");
    const clearBtn = document.getElementById("wishlist-clear-btn");
    const wishlistGrid = document.getElementById("wishlist-grid");
    const recentGrid = document.getElementById("recently-viewed-grid");
    const feedbackBanner = document.getElementById("wishlist-feedback");

    if (sortSelect) {
      sortSelect.addEventListener("change", renderWishlist);
    }

    if (moveAllBtn) {
      moveAllBtn.addEventListener("click", handleMoveAllToCart);
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", handleClearWishlist);
    }

    if (wishlistGrid) {
      wishlistGrid.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const action = button.dataset.action;
        const productId = button.dataset.productId;
        if (!productId) return;

        if (action === "move-to-cart") {
          handleMoveToCart(productId);
        } else if (action === "remove-wishlist") {
          handleRemoveFromWishlist(productId);
        }
      });
    }

    if (recentGrid) {
      recentGrid.addEventListener("click", (event) => {
        const button = event.target.closest('button[data-action="toggle-wishlist"]');
        if (!button) return;

        const productId = button.dataset.productId;
        if (productId) {
          handleToggleFromRecentlyViewed(productId);
        }
      });
    }

    if (feedbackBanner) {
      const closeBtn = feedbackBanner.querySelector(".wishlist-feedback-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", hideFeedback);
      }
    }

    window.addEventListener("storage", (event) => {
      if (!window.ZaveratStorage) return;
      const keys = Object.values(window.ZaveratStorage.KEYS);
      if (!event.key || keys.includes(event.key)) {
        refreshPageUI();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    refreshPageUI();
    bindEvents();
  });
})();
