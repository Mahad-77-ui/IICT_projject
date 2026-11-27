/**
 * Zaverat — LocalStorage State Helper
 * Manages cart, wishlist, recently viewed, quiz, and custom builder state across pages.
 */

(function (window) {
  const KEYS = {
    CART: "zaverat_cart",
    WISHLIST: "zaverat_wishlist",
    RECENTLY_VIEWED: "zaverat_recently_viewed",
    QUIZ_STATE: "zaverat_quiz_state",
    BUILDER_STATE: "zaverat_builder_state"
  };

  function readJSON(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent("zaverat:storage-updated", { detail: { key } }));
    } catch (err) {
      // Ignore storage quota / private mode failures gracefully
    }
  }

  const ZaveratStorage = {
    KEYS,

    // Cart
    getCart() {
      return readJSON(KEYS.CART, []);
    },
    saveCart(items) {
      writeJSON(KEYS.CART, Array.isArray(items) ? items : []);
    },
    addToCart(productId, quantity = 1) {
      const cart = this.getCart();
      const existing = cart.find((item) => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }
      this.saveCart(cart);
      return cart;
    },
    removeFromCart(productId) {
      const next = this.getCart().filter((item) => item.productId !== productId);
      this.saveCart(next);
      return next;
    },
    clearCart() {
      this.saveCart([]);
    },
    getCartCount() {
      return this.getCart().reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    },

    // Wishlist
    getWishlist() {
      return readJSON(KEYS.WISHLIST, []);
    },
    saveWishlist(ids) {
      writeJSON(KEYS.WISHLIST, Array.isArray(ids) ? ids : []);
    },
    toggleWishlist(productId) {
      const list = this.getWishlist();
      const exists = list.includes(productId);
      const next = exists ? list.filter((id) => id !== productId) : [...list, productId];
      this.saveWishlist(next);
      return next;
    },
    getWishlistCount() {
      return this.getWishlist().length;
    },

    // Recently Viewed
    getRecentlyViewed() {
      return readJSON(KEYS.RECENTLY_VIEWED, []);
    },
    addRecentlyViewed(productId, maxItems = 6) {
      const current = this.getRecentlyViewed().filter((id) => id !== productId);
      current.unshift(productId);
      writeJSON(KEYS.RECENTLY_VIEWED, current.slice(0, maxItems));
    },

    // Style Quiz State
    getQuizState() {
      return readJSON(KEYS.QUIZ_STATE, null);
    },
    saveQuizState(state) {
      writeJSON(KEYS.QUIZ_STATE, state);
    },

    // Custom Builder State
    getBuilderState() {
      return readJSON(KEYS.BUILDER_STATE, null);
    },
    saveBuilderState(state) {
      writeJSON(KEYS.BUILDER_STATE, state);
    }
  };

  window.ZaveratStorage = ZaveratStorage;
})(window);
