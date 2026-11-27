/**
 * LUMIÈRE HANDMADE JEWELLERY - STORAGE & STATE MANAGER
 * Persistent state handling using localStorage with robust edge-case handling.
 */

const LumiereStorage = {
  KEYS: {
    CART: "lumiere_cart_v1",
    WISHLIST: "lumiere_wishlist_v1",
    REVIEWS: "lumiere_reviews_v1",
    ORDERS: "lumiere_orders_v1",
    CUSTOM: "lumiere_custom_v1",
    THEME: "lumiere_theme_mode",
    QUIZ: "lumiere_quiz_result_v1"
  },

  // ---------------- Cart Operations ----------------
  getCart() {
    try {
      const data = localStorage.getItem(this.KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not read cart from localStorage:", e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("lumiere:cartUpdated", { detail: { cart } }));
    } catch (e) {
      console.error("Could not write cart to localStorage:", e);
    }
  },

  addToCart(productId, quantity = 1, customOptions = null) {
    const cart = this.getCart();
    const product = LUMIERE_DATA.products.find(p => p.id === productId);
    if (!product) return { success: false, message: "Product not found" };

    const itemKey = customOptions ? `${productId}-${JSON.stringify(customOptions)}` : productId;
    const existingIndex = cart.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: Math.max(1, quantity),
        customOptions: customOptions || null
      });
    }

    this.saveCart(cart);
    return { success: true, message: `Added "${product.name}" to your shopping bag!` };
  },

  updateCartQty(key, quantity) {
    let cart = this.getCart();
    if (quantity <= 0) {
      return this.removeFromCart(key);
    }
    const item = cart.find(i => i.key === key);
    if (item) {
      item.quantity = Math.min(10, Math.max(1, quantity));
      this.saveCart(cart);
    }
    return cart;
  },

  removeFromCart(key) {
    let cart = this.getCart();
    cart = cart.filter(i => i.key !== key);
    this.saveCart(cart);
    return cart;
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getCartTotals(couponDiscountRate = 0) {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = Math.round(subtotal * couponDiscountRate);
    const discountedSubtotal = subtotal - discountAmount;
    
    // Free shipping if discountedSubtotal >= 3000, otherwise standard 250
    const shipping = discountedSubtotal >= 3000 || cart.length === 0 ? 0 : 250;
    const grandTotal = cart.length === 0 ? 0 : discountedSubtotal + shipping;

    return {
      subtotal,
      discountAmount,
      shipping,
      grandTotal,
      freeShippingThreshold: 3000,
      amountNeededForFreeShipping: Math.max(0, 3000 - discountedSubtotal)
    };
  },

  // ---------------- Wishlist Operations ----------------
  getWishlist() {
    try {
      const data = localStorage.getItem(this.KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(list) {
    try {
      localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("lumiere:wishlistUpdated", { detail: { list } }));
    } catch (e) {
      console.error(e);
    }
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.some(p => p.id === productId);
  },

  toggleWishlist(productId) {
    let list = this.getWishlist();
    const index = list.findIndex(p => p.id === productId);
    let added = false;

    if (index > -1) {
      list.splice(index, 1);
    } else {
      const product = LUMIERE_DATA.products.find(p => p.id === productId);
      if (product) {
        list.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          inStock: product.inStock
        });
        added = true;
      }
    }
    this.saveWishlist(list);
    return { added, count: list.length };
  },

  removeFromWishlist(productId) {
    let list = this.getWishlist();
    list = list.filter(p => p.id !== productId);
    this.saveWishlist(list);
    return list;
  },

  // ---------------- Reviews Operations ----------------
  getReviews() {
    try {
      const local = localStorage.getItem(this.KEYS.REVIEWS);
      const customReviews = local ? JSON.parse(local) : [];
      return [...customReviews, ...LUMIERE_DATA.reviews];
    } catch (e) {
      return LUMIERE_DATA.reviews;
    }
  },

  addReview(review) {
    try {
      const local = localStorage.getItem(this.KEYS.REVIEWS);
      const customReviews = local ? JSON.parse(local) : [];
      const newReview = {
        id: "rev-user-" + Date.now(),
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        verified: true,
        ...review
      };
      customReviews.unshift(newReview);
      localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(customReviews));
      return { success: true, review: newReview };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  // ---------------- Orders Operations ----------------
  getOrders() {
    try {
      const data = localStorage.getItem(this.KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  createOrder(orderData) {
    try {
      const orders = this.getOrders();
      const orderNumber = "LUM-" + Math.floor(100000 + Math.random() * 900000);
      const fullOrder = {
        orderId: orderNumber,
        date: new Date().toISOString(),
        status: "Crafting in Studio",
        estimatedDelivery: "3-4 Business Days",
        ...orderData
      };
      orders.unshift(fullOrder);
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
      this.clearCart();
      return { success: true, order: fullOrder };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  findOrder(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
  },

  // ---------------- Theme Management ----------------
  getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || "light";
  },

  setTheme(theme) {
    localStorage.setItem(this.KEYS.THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
};
