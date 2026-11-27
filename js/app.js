/**
 * LUMIÈRE HANDMADE JEWELLERY - MAIN APPLICATION CONTROLLER
 * Shared components, navigation, notifications, search & cart drawer
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHeaderBadges();
  initNavigation();
  initSearch();
  initCartDrawer();
  initNewsletter();
});

// Format Price to Pakistani Rupees format
function formatPrice(num) {
  return "Rs. " + Number(num).toLocaleString("en-PK");
}

// 1. Theme Initializer
function initTheme() {
  const savedTheme = LumiereStorage.getTheme();
  document.documentElement.setAttribute("data-theme", savedTheme);

  const toggleBtns = document.querySelectorAll(".theme-toggle");
  toggleBtns.forEach(btn => {
    btn.innerHTML = savedTheme === "dark" ? "☀️" : "🌙";
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      LumiereStorage.setTheme(next);
      toggleBtns.forEach(b => b.innerHTML = next === "dark" ? "☀️" : "🌙");
      showToast(`Switched to ${next} mode`, "gold");
    });
  });
}

// 2. Header Badges & Updates
function initHeaderBadges() {
  updateBadges();
  window.addEventListener("lumiere:cartUpdated", updateBadges);
  window.addEventListener("lumiere:wishlistUpdated", updateBadges);
}

function updateBadges() {
  const cartCount = LumiereStorage.getCartCount();
  const wishCount = LumiereStorage.getWishlist().length;

  document.querySelectorAll(".cart-count-badge").forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? "flex" : "none";
  });

  document.querySelectorAll(".wish-count-badge").forEach(el => {
    el.textContent = wishCount;
    el.style.display = wishCount > 0 ? "flex" : "none";
  });
}

// 3. Navigation & Mobile Drawer
function initNavigation() {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen);
      mobileToggle.innerHTML = isOpen ? "✕" : "☰";
    });
  }

  // Active Link Highlight
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href && (href.endsWith(currentPath) || (currentPath === "" && href === "index.html"))) {
      link.classList.add("active");
    }
  });
}

// 4. Global Search Modal
function initSearch() {
  const searchBtns = document.querySelectorAll(".search-trigger");
  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchClose = document.getElementById("searchClose");

  if (!searchModal) return;

  searchBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      searchModal.classList.add("open");
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
        renderSearchResults("");
      }
    });
  });

  if (searchClose) {
    searchClose.addEventListener("click", () => searchModal.classList.remove("open"));
  }

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) searchModal.classList.remove("open");
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderSearchResults(e.target.value.trim().toLowerCase());
    });
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    if (!query) {
      searchResults.innerHTML = `<p class="text-muted" style="text-align: center; padding: 2rem 0;">Type jewellery name, gemstone (e.g. emerald, pearl), or category...</p>`;
      return;
    }

    const matches = LUMIERE_DATA.products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.gemstone.toLowerCase().includes(query) ||
      p.metal.toLowerCase().includes(query) ||
      p.tags.some(t => t.includes(query))
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
          <p style="font-weight: 600; margin-bottom: 0.5rem;">No artisanal pieces found matching "${query}"</p>
          <p class="text-muted" style="font-size: 0.85rem;">Try searching for "ring", "pearl", "silver", or "earrings".</p>
        </div>
      `;
      return;
    }

    const isInsidePages = window.location.pathname.includes("/pages/");
    const productDetailUrl = isInsidePages ? "product-detail.html?id=" : "pages/product-detail.html?id=";

    searchResults.innerHTML = matches.map(p => `
      <div class="search-result-item" style="display: flex; gap: 1rem; align-items: center; padding: 0.75rem; border-bottom: 1px solid var(--border-light);">
        <img src="${getAssetUrl(p.image)}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover; background: var(--bg-secondary);">
        <div style="flex: 1;">
          <a href="${productDetailUrl + p.id}" style="font-weight: 600; font-family: var(--font-serif);">${p.name}</a>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${p.category} • ${p.gemstone}</div>
        </div>
        <div style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">${formatPrice(p.price)}</div>
      </div>
    `).join("");
  }
}

// 5. Cart Drawer
function initCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const openBtns = document.querySelectorAll(".cart-drawer-trigger");
  const closeBtn = document.getElementById("cartDrawerClose");

  if (!drawer) return;

  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      renderDrawerCart();
      drawer.classList.add("open");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
  }

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("open") && !drawer.contains(e.target) && !e.target.closest(".cart-drawer-trigger")) {
      drawer.classList.remove("open");
    }
  });

  window.addEventListener("lumiere:cartUpdated", () => {
    if (drawer.classList.contains("open")) {
      renderDrawerCart();
    }
  });
}

function renderDrawerCart() {
  const container = document.getElementById("cartDrawerItems");
  const footerContainer = document.getElementById("cartDrawerFooter");
  if (!container) return;

  const cart = LumiereStorage.getCart();

  if (cart.length === 0) {
    const isInsidePages = window.location.pathname.includes("/pages/");
    const shopUrl = isInsidePages ? "shop.html" : "pages/shop.html";

    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--color-gold);">💎</div>
        <h4 style="font-family: var(--font-serif); margin-bottom: 0.5rem;">Your Cart is Empty</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Discover our handcrafted collections of sterling silver and gold vermeil.</p>
        <a href="${shopUrl}" class="btn btn-primary btn-sm">Explore Jewellery</a>
      </div>
    `;
    if (footerContainer) footerContainer.style.display = "none";
    return;
  }

  if (footerContainer) footerContainer.style.display = "block";

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${getAssetUrl(item.image)}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div style="font-weight: 600; font-family: var(--font-serif); font-size: 0.95rem;">${item.name}</div>
        <div style="font-size: 0.8rem; color: var(--color-primary); font-weight: 700; margin-bottom: 0.4rem;">${formatPrice(item.price)}</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="cart-qty-ctrl">
            <button class="cart-qty-btn" onclick="handleDrawerQty('${item.key}', ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
            <span class="cart-qty-input">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="handleDrawerQty('${item.key}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
          </div>
          <button onclick="handleDrawerRemove('${item.key}')" style="color: var(--color-accent); font-size: 0.75rem; text-decoration: underline;" aria-label="Remove item">Remove</button>
        </div>
      </div>
    </div>
  `).join("");

  const totals = LumiereStorage.getCartTotals();
  const subtotalEl = document.getElementById("drawerSubtotal");
  if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);
}

function handleDrawerQty(key, qty) {
  LumiereStorage.updateCartQty(key, qty);
  renderDrawerCart();
}

function handleDrawerRemove(key) {
  LumiereStorage.removeFromCart(key);
  showToast("Item removed from cart", "gold");
  renderDrawerCart();
}

// 6. Global Toast Notification System
function showToast(message, type = "primary") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.1rem;">${type === "error" ? "⚠️" : type === "gold" ? "✨" : "✓"}</span>
    <span style="flex: 1;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 7. Newsletter Subscription with Validation
function initNewsletter() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input || !input.value.trim() || !input.value.includes("@")) {
        showToast("Please enter a valid email address.", "error");
        return;
      }
      showToast("Thank you for joining the Lumière Inner Circle! Welcome gift code: LUMIERE10", "gold");
      input.value = "";
    });
  });
}
