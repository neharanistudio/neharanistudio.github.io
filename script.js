/* Neha Rani Studio - consolidated storefront interactions */
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const $ = function (selector, root) { return (root || document).querySelector(selector); };
  const $$ = function (selector, root) { return Array.from((root || document).querySelectorAll(selector)); };
  const safeRead = function (key, fallback) {
    try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; }
    catch (_) { return fallback; }
  };
  const escapeHTML = function (value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  };

  let cart = safeRead("nrs_cart", safeRead("cart", []));
  let wishlist = safeRead("nrs_wishlist", safeRead("wishlist", []));
  const saveCart = function () {
    localStorage.setItem("nrs_cart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const saveWishlist = function () {
    localStorage.setItem("nrs_wishlist", JSON.stringify(wishlist));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const products = {
    "gift-box": { id: "gift-box", name: "Luxury Gift Box", price: "Rs. 2,999", image: "images/products/product1.jpg", category: "Gift Hampers" },
    "gift-hamper": { id: "gift-box", name: "Luxury Gift Box", price: "Rs. 2,999", image: "images/products/product1.jpg", category: "Gift Hampers" },
    "ribbon-bouquet": { id: "ribbon-bouquet", name: "Ribbon Bouquet", price: "Rs. 3,499", image: "images/categories/ribbon.jpg", category: "Ribbon Bouquets" },
    "bag-1": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/products/product2.jpg", category: "Bags" },
    "hand-bag": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/products/product2.jpg", category: "Bags" },
    "dress-1": { id: "dress-1", name: "Beautiful Dress", price: "Rs. 4,999", image: "images/products/product3.jpg", category: "Dresses" },
    "perfume-1": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/products/product4.jpg", category: "Perfumes" },
    "perfume": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/products/product4.jpg", category: "Perfumes" },
    "jewelry-1": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/products/product5.jpg", category: "Jewelry" },
    "jewelry": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/products/product5.jpg", category: "Jewelry" },
    "shoes-1": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/products/product6.jpg", category: "Shoes" },
    "shoes": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/products/product6.jpg", category: "Shoes" },
    "abaya": { id: "abaya", name: "Luxury Abaya", price: "Rs. 5,999", image: "images/categories/abayas.jpg", category: "Abayas" }
  };

  const cartPanel = $(".cart-panel");
  const wishlistPanel = $(".wishlist-panel");
  const cartItems = $(".cart-items");
  const wishlistItems = $(".wishlist-items");
  const cartCount = $(".cart-count");
  const wishlistButton = $(".wishlist-btn");
  const searchPopup = $(".search-popup");
  const searchInput = $("#searchInput");
  const sidebar = $(".sidebar");
  const menuOverlay = $(".menu-overlay");

  let wishlistCount = $(".wishlist-count");
  if (wishlistButton && !wishlistCount) {
    wishlistCount = document.createElement("span");
    wishlistCount.className = "wishlist-count";
    wishlistCount.textContent = "0";
    wishlistButton.appendChild(wishlistCount);
  }

  const updateCounts = function () {
    if (cartCount) cartCount.textContent = String(cart.length);
    if (wishlistCount) wishlistCount.textContent = String(wishlist.length);
  };
  const openPanel = function (panel) {
    if (panel) { panel.classList.add("active"); document.body.classList.add("panel-open"); }
  };
  const closePanel = function (panel) {
    if (!panel) return;
    panel.classList.remove("active");
    if (!$(".cart-panel.active") && !$(".wishlist-panel.active")) document.body.classList.remove("panel-open");
  };

  const renderCart = function () {
    if (cartItems) {
      if (!cart.length) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty 🛒</p>';
      } else {
        cartItems.innerHTML = cart.map(function (item, index) {
          return '<article class="cart-item"><img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.name) + '">' +
            '<div class="cart-info"><h4>' + escapeHTML(item.name) + '</h4><p>' + escapeHTML(item.price) + '</p>' +
            '<button type="button" class="remove-cart" data-index="' + index + '">Remove</button></div></article>';
        }).join("");
      }
    }
    updateCounts();
    saveCart();
  };

  const renderWishlist = function () {
    if (wishlistItems) {
      if (!wishlist.length) {
        wishlistItems.innerHTML = '<p class="empty-wishlist">Your wishlist is empty ❤️</p>';
      } else {
        wishlistItems.innerHTML = wishlist.map(function (item, index) {
          return '<article class="wishlist-item"><img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.name) + '">' +
            '<div class="wishlist-info"><h4>' + escapeHTML(item.name) + '</h4><p>' + escapeHTML(item.price) + '</p>' +
            '<button type="button" class="remove-wishlist" data-index="' + index + '">Remove</button></div></article>';
        }).join("");
      }
    }
    updateCounts();
    saveWishlist();
  };

  const productFromCard = function (card) {
    if (!card) return null;
    const title = $("h3", card) ? $("h3", card).textContent.trim() : "Product";
    return {
      id: card.dataset.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: title,
      price: $(".product-price", card) ? $(".product-price", card).textContent.trim() : "Price on request",
      image: $("img", card) ? $("img", card).getAttribute("src") : "",
      category: card.closest(".product-item") ? card.closest(".product-item").dataset.category : ""
    };
  };
  const addToCart = function (product) {
    if (!product) return;
    cart.push(product);
    renderCart();
    openPanel(cartPanel);
  };
  const addToWishlist = function (product) {
    if (!product) return;
    if (wishlist.some(function (item) { return item.id === product.id; })) {
      alert("This product is already in your wishlist ❤️");
      return;
    }
    wishlist.push(product);
    renderWishlist();
    openPanel(wishlistPanel);
  };

  // Populate the product detail page from its query-string product ID.
  const productName = $("#productName");
  if (productName) {
    const requestedId = new URLSearchParams(window.location.search).get("id") || "gift-box";
    const detailProduct = products[requestedId] || products[requestedId.toLowerCase()];
    const image = $("#mainProductImage");
    const price = $("#productPrice");
    const description = $("#productDescription");
    if (detailProduct) {
      productName.textContent = detailProduct.name;
      if (price) price.textContent = detailProduct.price;
      if (image) { image.src = detailProduct.image; image.alt = detailProduct.name; }
      if (description) description.textContent = detailProduct.name + " from our " + detailProduct.category +
        " collection. Contact us on WhatsApp for availability, delivery details and ordering assistance.";
      const thumbs = $("#productThumbnails");
      if (thumbs) thumbs.innerHTML = '<button type="button" class="product-thumb active"><img src="' +
        escapeHTML(detailProduct.image) + '" alt="' + escapeHTML(detailProduct.name) + '"></button>';
      const detailAdd = $("#detailAddCart");
      if (detailAdd) detailAdd.addEventListener("click", function () { addToCart(Object.assign({}, detailProduct)); });
      const detailWish = $("#detailWishlist");
      if (detailWish) detailWish.addEventListener("click", function () { addToWishlist(Object.assign({}, detailProduct)); });
      const buyNow = $("#whatsappBtn");
      if (buyNow) buyNow.href = "https://wa.me/923045255325?text=" + encodeURIComponent(
        "Assalam-o-Alaikum, I would like to order " + detailProduct.name + " (" + detailProduct.price +
        "). Please share availability and delivery details."
      );
    } else {
      productName.textContent = "Product not found";
      if (description) description.textContent = "This product link may be outdated. Please return to the homepage to browse available products.";
    }
  }

  let detailImageIndex = 0;
  const mainImage = $("#mainProductImage");
  window.prevImage = function () { if (mainImage) detailImageIndex = Math.max(0, detailImageIndex - 1); };
  window.nextImage = function () { if (mainImage) detailImageIndex = detailImageIndex + 1; };

  const closeSearchPopup = function () {
    if (searchPopup) searchPopup.classList.remove("active");
    if (searchInput) searchInput.value = "";
    showAllProducts();
  };
  const filterProducts = function (category) {
    $$(".product-item").forEach(function (item) {
      item.style.display = category === "all" || item.dataset.category === category ? "" : "none";
    });
    if (searchInput) searchInput.value = "";
    $("#featured-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const filterBySearch = function (term) {
    const value = term.trim().toLowerCase();
    $$(".product-item").forEach(function (item) {
      item.style.display = item.textContent.toLowerCase().includes(value) ? "" : "none";
    });
  };
  function showAllProducts() {
    $$(".product-item").forEach(function (item) { item.style.display = ""; });
  }

  document.addEventListener("click", function (event) {
    const addButton = event.target.closest(".add-cart");
    if (addButton && !addButton.id) {
      event.preventDefault(); event.stopPropagation();
      addToCart(productFromCard(addButton.closest(".product-card")));
      return;
    }
    const wishButton = event.target.closest(".wishlist-add");
    if (wishButton && !wishButton.id) {
      event.preventDefault(); event.stopPropagation();
      addToWishlist(productFromCard(wishButton.closest(".product-card")));
      return;
    }
    const removeCart = event.target.closest(".remove-cart");
    if (removeCart) { cart.splice(Number(removeCart.dataset.index), 1); renderCart(); return; }
    const removeWish = event.target.closest(".remove-wishlist");
    if (removeWish) { wishlist.splice(Number(removeWish.dataset.index), 1); renderWishlist(); return; }

    const card = event.target.closest(".product-card");
    if (card && !event.target.closest("button") && card.dataset.id) {
      window.location.href = "product.html?id=" + encodeURIComponent(card.dataset.id);
      return;
    }
    const categoryCard = event.target.closest(".category-card");
    if (categoryCard && categoryCard.dataset.category) filterProducts(categoryCard.dataset.category);

    if (event.target.closest(".cart-btn")) openPanel(cartPanel);
    if (event.target.closest(".wishlist-btn")) openPanel(wishlistPanel);
    if (event.target.closest(".close-cart")) closePanel(cartPanel);
    if (event.target.closest(".close-wishlist")) closePanel(wishlistPanel);
    if (event.target.closest(".close-search")) closeSearchPopup();
    if (event.target === searchPopup) closeSearchPopup();
    if (event.target.closest(".search-btn") && searchPopup) {
      searchPopup.classList.add("active");
      setTimeout(function () { if (searchInput) searchInput.focus(); }, 100);
    }
    if (event.target.closest(".search-submit")) {
      filterBySearch(searchInput ? searchInput.value : "");
      closeSearchPopup();
      $("#featured-products")?.scrollIntoView({ behavior: "smooth" });
    }
    if (event.target.closest("#viewAllProducts")) {
      event.preventDefault();
      filterProducts("all");
    }
    if (event.target.closest(".checkout-btn")) {
      if (!cart.length) {
        alert("Your cart is empty. Please add a product first.");
      } else {
        const orderLines = cart.map(function (item, index) {
          return (index + 1) + ". " + item.name + " - " + item.price;
        }).join("\n");
        const message = "Assalam-o-Alaikum Neha Rani Studio! I would like to place an order:\n" +
          orderLines + "\n\nPlease confirm availability, total and delivery details.";
        window.open("https://wa.me/923045255325?text=" + encodeURIComponent(message), "_blank", "noopener");
      }
    }
    if (event.target.closest("#menuBtn")) {
      sidebar?.classList.add("active"); menuOverlay?.classList.add("active");
      document.body.classList.add("menu-open");
    }
    if (event.target === menuOverlay || event.target.closest(".sidebar a")) {
      sidebar?.classList.remove("active"); menuOverlay?.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
    if (event.target.closest("#topBtn")) window.scrollTo({ top: 0, behavior: "smooth" });
    if (event.target.closest("#trackOrder")) {
      event.preventDefault(); $(".order-popup")?.classList.add("active");
    }
    if (event.target.closest(".close-order")) $(".order-popup")?.classList.remove("active");
    if (event.target.closest(".track-btn")) {
      const orderId = $("#trackingNumber") ? $("#trackingNumber").value.trim() : "";
      if (!orderId) alert("Please enter your order ID.");
      else window.open("https://wa.me/923045255325?text=" + encodeURIComponent(
        "Assalam-o-Alaikum, I would like an update on my order. Order ID: " + orderId
      ), "_blank", "noopener");
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () { filterBySearch(searchInput.value); });
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        filterBySearch(searchInput.value); closeSearchPopup();
        $("#featured-products")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
  $$(".sidebar [data-category]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      $$(".sidebar [data-category]").forEach(function (item) { item.classList.remove("active"); });
      link.classList.add("active");
      filterProducts(link.dataset.category || "all");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePanel(cartPanel); closePanel(wishlistPanel); closeSearchPopup();
      sidebar?.classList.remove("active"); menuOverlay?.classList.remove("active");
      $(".order-popup")?.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
  document.addEventListener("click", function (event) {
    if (cartPanel?.classList.contains("active") && !cartPanel.contains(event.target) && !event.target.closest(".cart-btn")) closePanel(cartPanel);
    if (wishlistPanel?.classList.contains("active") && !wishlistPanel.contains(event.target) && !event.target.closest(".wishlist-btn")) closePanel(wishlistPanel);
  });

  if (window.Swiper) {
    if ($(".heroSwiper")) new Swiper(".heroSwiper", {
      loop: true, speed: 700, autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".heroSwiper .swiper-pagination", clickable: true }
    });
    if ($(".categorySwiper")) new Swiper(".categorySwiper", {
      slidesPerView: 4, spaceBetween: 12, freeMode: true,
      breakpoints: { 480: { slidesPerView: 4.5, spaceBetween: 14 }, 768: { slidesPerView: 6, spaceBetween: 18 }, 1024: { slidesPerView: 8, spaceBetween: 20 } }
    });
  }

  const topButton = $("#topBtn");
  const header = $(".header");
  const updateScrollUI = function () {
    if (topButton) topButton.classList.toggle("show", window.scrollY > 350);
    if (header) header.classList.toggle("header-scroll", window.scrollY > 40);
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("fade-show"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    $$(".product-card, .category-card, .review-card, .offer-content").forEach(function (element) {
      element.classList.add("fade-hidden"); observer.observe(element);
    });
  }
  $$("img").forEach(function (img) {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });

  renderCart();
  renderWishlist();
});
