/**
 * Zaverat — Shared Application UI Logic
 * Handles mobile hamburger menu toggle, active nav link, badge counters, and footer year.
 */

(function () {
  function initMobileNav() {
    const toggleBtn = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (!toggleBtn || !navMenu) return;

    function closeMenu() {
      navMenu.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }

    toggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target) && !toggleBtn.contains(event.target)) {
        closeMenu();
      }
    });
  }

  function highlightActiveNav() {
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const linkFile = href.split("/").pop();
      if (linkFile === currentFile) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function updateBadgeCounters() {
    if (!window.ZaveratStorage) return;

    const cartBadge = document.getElementById("cart-count");
    const wishlistBadge = document.getElementById("wishlist-count");

    if (cartBadge) {
      cartBadge.textContent = String(window.ZaveratStorage.getCartCount());
    }
    if (wishlistBadge) {
      wishlistBadge.textContent = String(window.ZaveratStorage.getWishlistCount());
    }
  }

  function setFooterYear() {
    const yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    highlightActiveNav();
    updateBadgeCounters();
    setFooterYear();

    window.addEventListener("zaverat:storage-updated", updateBadgeCounters);
  });
})();
