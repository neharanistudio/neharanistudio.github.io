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
    "gift-box": { id: "gift-box", name: "Luxury Gift Box", price: "Rs. 2,999", image: "images/product1-1.jpg", images: ["images/product1-1.jpg","images/product1-2.jpg","images/product1-3.jpg","images/product1-4.jpg"], category: "Gift Hampers" },
    "gift-hamper": { id: "gift-box", name: "Luxury Gift Box", price: "Rs. 2,999", image: "images/product1-1.jpg", images: ["images/product1-1.jpg","images/product1-2.jpg","images/product1-3.jpg","images/product1-4.jpg"], category: "Gift Hampers" },
    "ribbon-bouquet": { id: "ribbon-bouquet", name: "Ribbon Bouquet", price: "Rs. 3,499", image: "images/flowers.jpg", images: ["images/flowers.jpg"], category: "Ribbon Bouquets" },
    "bag-1": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "hand-bag": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "bag": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "dress-1": { id: "dress-1", name: "Beautiful Dress", price: "Rs. 4,999", image: "images/dresses.jpg", images: ["images/dresses.jpg"], category: "Dresses" },
    "perfume-1": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/perfumes.jpg", images: ["images/perfumes.jpg"], category: "Perfumes" },
    "perfume": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/perfumes.jpg", images: ["images/perfumes.jpg"], category: "Perfumes" },
    "jewelry-1": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/jewellery.jpg", images: ["images/jewellery.jpg"], category: "Jewelry" },
    "jewelry": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/jewellery.jpg", images: ["images/jewellery.jpg"], category: "Jewelry" },
    "shoes-1": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/shoes.jpg", images: ["images/shoes.jpg"], category: "Shoes" },
    "shoes": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/shoes.jpg", images: ["images/shoes.jpg"], category: "Shoes" },
    "abaya": { id: "abaya", name: "Luxury Abaya", price: "Rs. 5,999", image: "images/abayas.jpg", images: ["images/abayas.jpg"], category: "Abayas" }
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
    // Do not open/shift the cart drawer automatically; shoppers can open it
    // themselves from the header cart icon when they are ready.
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

  // Product details: working gallery and quick-order header.
  const productName = $("#productName");
  let detailProduct = null, detailImages = [], detailImageIndex = 0;
  const mainImage = $("#mainProductImage"), thumbnails = $("#productThumbnails");
  if (mainImage) mainImage.addEventListener("error", function () { this.onerror = null; this.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700"><rect width="100%" height="100%" fill="#fff0f6"/><text x="50%" y="48%" text-anchor="middle" font-family="Arial" font-size="32" fill="#b83f78">Product photo</text><text x="50%" y="56%" text-anchor="middle" font-family="Arial" font-size="18" fill="#8b6476">Upload product images to display here</text></svg>'); });
  const renderGallery = function () {
    if (!mainImage || !detailImages.length) return;
    detailImageIndex = (detailImageIndex + detailImages.length) % detailImages.length;
    mainImage.src = detailImages[detailImageIndex];
    mainImage.alt = (detailProduct ? detailProduct.name : "Product") + " photo " + (detailImageIndex + 1);
    if (thumbnails) thumbnails.innerHTML = detailImages.map(function(src,index) {
      return '<button type="button" class="product-thumb'+(index===detailImageIndex?' active':'')+'" data-gallery-index="'+index+'" aria-label="View photo '+(index+1)+'"><img src="'+escapeHTML(src)+'" alt=""></button>';
    }).join("");
    $$(".image-buttons button").forEach(function(btn){btn.disabled=detailImages.length<2;});
  };
  const showDetailImage = function(index){if(!detailImages.length)return;detailImageIndex=(index+detailImages.length)%detailImages.length;renderGallery();};
  // Keep galleries ready for up to six genuine product photos.
  const galleryTouchStart = { x: 0, y: 0 };
  if (mainImage) {
    mainImage.setAttribute("tabindex", "0");
    mainImage.setAttribute("role", "button");
    mainImage.setAttribute("aria-label", "Product photo. Swipe left or right to view more photos.");
    mainImage.addEventListener("touchstart", function(event) {
      if (!event.touches || !event.touches.length) return;
      galleryTouchStart.x = event.touches[0].clientX;
      galleryTouchStart.y = event.touches[0].clientY;
    }, { passive: true });
    mainImage.addEventListener("touchend", function(event) {
      if (!event.changedTouches || !event.changedTouches.length || detailImages.length < 2) return;
      const dx = event.changedTouches[0].clientX - galleryTouchStart.x;
      const dy = event.changedTouches[0].clientY - galleryTouchStart.y;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) showDetailImage(detailImageIndex + (dx < 0 ? 1 : -1));
    }, { passive: true });
    mainImage.addEventListener("keydown", function(event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); showDetailImage(detailImageIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showDetailImage(detailImageIndex + 1); }
    });
  }
  window.prevImage=function(){showDetailImage(detailImageIndex-1);};
  window.nextImage=function(){showDetailImage(detailImageIndex+1);};
  if(productName){
    const requestedId=new URLSearchParams(window.location.search).get("id")||"gift-box";
    detailProduct=products[requestedId]||products[requestedId.toLowerCase()];
    const price=$("#productPrice"),description=$("#productDescription");
    if(detailProduct){
      productName.textContent=detailProduct.name;
      if(price)price.textContent=detailProduct.price;
      detailImages=(detailProduct.images||[detailProduct.image]).filter(Boolean).slice(0,6);renderGallery();
      const productDescriptions = {
        "Gift Hampers": "Make every celebration memorable with this thoughtfully presented gift hamper. Its elegant arrangement makes it a lovely choice for birthdays, weddings, anniversaries and special surprises.",
        "Ribbon Bouquets": "A charming ribbon bouquet designed to add a graceful touch to meaningful moments. A beautiful keepsake-style gift for birthdays, celebrations, anniversaries and heartfelt surprises.",
        "Bags": "Complete your everyday and occasion looks with this elegant handbag. Its versatile design pairs effortlessly with a range of outfits, making it a stylish accessory for day-to-day use and outings.",
        "Dresses": "Refresh your wardrobe with this stylish outfit, selected for its graceful look and versatile appeal. A lovely option for gatherings, festive moments and polished everyday dressing.",
        "Perfumes": "Add a refined finishing touch to your routine with this fragrance. A thoughtful choice for personal use or gifting, ideal for those who enjoy a fresh and memorable scent.",
        "Jewelry": "Elevate your look with this elegant jewelry piece. Its decorative detailing makes it a beautiful finishing touch for festive outfits, celebrations and special occasions.",
        "Shoes": "Step out in style with this versatile pair of ladies' shoes. Designed to complement a variety of looks, it is a lovely choice for everyday wear and casual outings.",
        "Abayas": "A graceful abaya that brings together modest styling and timeless elegance. A versatile wardrobe choice for everyday wear, gatherings and occasions.",
      };
      if(description) description.textContent = productDescriptions[detailProduct.category] || "Explore this thoughtfully selected piece from Neha Rani Studio. For product details, availability and ordering assistance, contact our team on WhatsApp.";
      const productHighlights = {
        "gift-box": [
          ["Beautiful presentation", "A thoughtfully arranged gift box that makes the unboxing feel like part of the celebration."],
          ["Made for meaningful moments", "A lovely gifting choice for birthdays, weddings, anniversaries and heartfelt surprises."],
          ["A gift to remember", "An elegant way to make someone feel special on an important day."]
        ],
        "ribbon-bouquet": [
          ["Charming ribbon details", "A decorative bouquet with a soft, graceful look that stands out from traditional flowers."],
          ["A keepsake-style surprise", "A sweet choice when you want your gift to feel memorable beyond the occasion."],
          ["Perfect for celebrations", "A thoughtful pick for birthdays, anniversaries and little moments worth celebrating."]
        ],
        "bag-1": [
          ["Easy to style", "A versatile handbag that can complement both everyday outfits and dressed-up looks."],
          ["A polished finishing touch", "An accessory that adds a neat, elegant detail to your overall outfit."],
          ["For everyday moments", "A stylish pick for outings, meet-ups and occasions when you want to carry your essentials."]
        ],
        "dress-1": [
          ["Graceful look", "A stylish outfit chosen for an elegant look at gatherings and special moments."],
          ["Easy outfit inspiration", "Pair it with your favourite accessories to create a look that feels your own."],
          ["For special plans", "A lovely wardrobe choice for festive moments, get-togethers and occasions."]
        ],
        "perfume-1": [
          ["A finishing touch", "A fragrance choice to complete your getting-ready routine."],
          ["Lovely gifting idea", "A thoughtful option for someone who enjoys adding fragrance to their day."],
          ["Everyday or occasion", "A little extra detail for daily routines, celebrations and special plans."]
        ],
        "jewelry-1": [
          ["Decorative detail", "A beautiful finishing touch to bring extra interest to your favourite outfits."],
          ["Occasion-ready styling", "A lovely accessory choice for festive looks, celebrations and gatherings."],
          ["Easy to pair", "Style it with traditional or modern outfits to make the look your own."]
        ],
        "shoes-1": [
          ["Versatile styling", "A pair that can be styled with a range of casual and dressed-up outfits."],
          ["A complete look", "The finishing detail that helps bring your outfit together."],
          ["For your plans", "A style choice for everyday outings, meet-ups and special occasions."]
        ],
        "abaya": [
          ["Modest elegance", "A graceful style that brings a refined touch to modest dressing."],
          ["Timeless wardrobe choice", "An easy piece to reach for when you want a simple, elegant look."],
          ["Versatile styling", "A lovely option for everyday wear, gatherings and special occasions."]
        ]
      };
      const reviewGrid = $("#productReviewGrid");
      if (reviewGrid) {
        const highlights = productHighlights[detailProduct.id] || [
          ["Thoughtfully selected", "A considered addition to the Neha Rani Studio collection."],
          ["Style it your way", "Make this piece your own with the accessories and details you love."],
          ["A lovely choice", "Explore this item for everyday moments, gifting or a special occasion."]
        ];
        reviewGrid.innerHTML = highlights.map(function (item) {
          return '<article class="review-card product-highlight-card"><span class="product-highlight-icon" aria-hidden="true">✧</span><p>' + escapeHTML(item[1]) + '</p><h4>' + escapeHTML(item[0]) + '</h4></article>';
        }).join("");
      }

      const detailAdd=$("#detailAddCart");
      if(detailAdd)detailAdd.addEventListener("click",function(){addToCart(Object.assign({},detailProduct));});
      const message="Assalam-o-Alaikum, I would like to order "+detailProduct.name+" ("+detailProduct.price+"). Please share availability and delivery details.";
      const orderMessage=message+"\nProduct link: "+window.location.href;
      const waHref="https://wa.me/923045255325?text="+encodeURIComponent(orderMessage);
      const buyNow=$("#whatsappBtn"),headerWA=$(".product-header-whatsapp"),floatingWA=$("#floatingProductWhatsApp");
      if(buyNow)buyNow.href=waHref;
      if(headerWA)headerWA.href=waHref;
      if(floatingWA)floatingWA.href=waHref;
    }else{productName.textContent="Product not found";if(description)description.textContent="This product link may be outdated. Please return to the homepage to browse available products.";}
  }
  if(thumbnails)thumbnails.addEventListener("click",function(event){const thumb=event.target.closest("[data-gallery-index]");if(thumb)showDetailImage(Number(thumb.dataset.galleryIndex));});
  const topAddCart=$("#topAddCart"), floatingAddCart=$("#floatingAddCart"), floatingWishlist=$("#floatingWishlist");
  const addCurrentProductToCart=function(){if(detailProduct)addToCart(Object.assign({},detailProduct));};
  if(topAddCart)topAddCart.addEventListener("click",addCurrentProductToCart);
  if(floatingAddCart)floatingAddCart.addEventListener("click",addCurrentProductToCart);
  const closeSearchPopup = function () {
    if (searchPopup) searchPopup.classList.remove("active");
  };
  const filterProducts = function (category) {
    $$(".product-item").forEach(function (item) {
      const visible = category === "all" || item.dataset.category === category;
      item.hidden = !visible;
      item.style.display = visible ? "" : "none";
    });
    if (searchInput) searchInput.value = "";
    $("#featured-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const normalizeSearch = function (value) {
    return String(value || "").toLowerCase().trim()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };
  const filterBySearch = function (term) {
    const value = normalizeSearch(term);
    const words = value.split(" ").filter(Boolean);
    const items = $$(".product-item");
    const details = items.map(function (item) {
      const card = $(".product-card", item);
      const image = $("img", card || item);
      return {
        item: item,
        category: normalizeSearch(item.dataset.category || ""),
        name: normalizeSearch($("h3", card || item)?.textContent || ""),
        alt: normalizeSearch(image?.alt || ""),
        id: normalizeSearch(card?.dataset.id || "")
      };
    });
    // If the search matches a category, show every product in that category only.
    const matchingCategories = details.map(function (p) { return p.category; }).filter(function (category, index, all) {
      return category && all.indexOf(category) === index &&
        words.length && words.every(function (word) { return category.includes(word); });
    });
    let matches = 0;
    details.forEach(function (p) {
      const categoryMatch = matchingCategories.length
        ? matchingCategories.includes(p.category)
        : (!value || words.every(function (word) {
            return (p.name + " " + p.alt + " " + p.id).includes(word);
          }));
      const visible = !value || categoryMatch;
      p.item.hidden = !visible;
      p.item.style.display = visible ? "" : "none";
      if (visible && value) matches++;
    });
    const empty = $("#noSearchResults");
    if (empty) empty.hidden = matches > 0 || !value;
    return matches;
  };
  const submitProductSearch = function (term) {
    const query = String(term || "").trim();
    if (!query) return;
    if (!$("#featured-products") && !$(".product-item").length) {
      window.location.href = "index.html?search=" + encodeURIComponent(query) + "#featured-products";
      return;
    }
    filterBySearch(query);
    if (searchInput) searchInput.value = query;
    const heading = $("#featured-products .section-heading h2");
    if (heading) heading.textContent = 'Search Results for "' + query + '"';
    $("#featured-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  function showAllProducts() {
    $(".product-item").forEach(function (item) { item.hidden = false; item.style.display = ""; });
  }

  document.addEventListener("click", function (event) {
    const buyNowButton = event.target.closest(".buy-now");
    if (buyNowButton) {
      event.preventDefault(); event.stopPropagation();
      const product = productFromCard(buyNowButton.closest(".product-card"));
      if (product) {
        const message = "Assalam-o-Alaikum Neha Rani Studio! I would like to buy " + product.name + " (" + product.price + "). Please confirm availability and delivery details.";
        window.open("https://wa.me/923045255325?text=" + encodeURIComponent(message), "_blank", "noopener");
      }
      return;
    }
    const addButton = event.target.closest(".add-cart");
    if (addButton && !addButton.id) {
      event.preventDefault(); event.stopPropagation();
      addToCart(productFromCard(addButton.closest(".product-card")));
      return;
    }
    const wishButton = event.target.closest(".wishlist-add, #floatingWishlist");
    if (wishButton) {
      event.preventDefault();
      event.stopPropagation();
      const product = wishButton.id === "floatingWishlist" || wishButton.id === "detailWishlist"
        ? detailProduct
        : productFromCard(wishButton.closest(".product-card"));
      addToWishlist(product ? Object.assign({}, product) : null);
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
    const collectionShortcut = event.target.closest(".collection-shortcuts a[data-category]");
    if (collectionShortcut) {
      event.preventDefault();
      filterProducts(collectionShortcut.dataset.category);
      window.location.hash = "featured-products";
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
      submitProductSearch(searchInput ? searchInput.value : "");
      closeSearchPopup();
    }
    if (event.target.closest(".mobile-search-submit")) runSearchFromMobile();
    const footerCategory = event.target.closest(".footer-box a[data-category]");
    if (footerCategory) {
      event.preventDefault();
      filterProducts(footerCategory.dataset.category);
      window.location.hash = "featured-products";
    }
    if (event.target.closest("#viewAllReviews")) {
      event.preventDefault();
      $("#reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (event.target.closest("#viewAllProducts, #footerAllProducts")) {
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
  });  if (searchInput) {
    searchInput.addEventListener("input", function () { filterBySearch(searchInput.value); });
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        submitProductSearch(searchInput.value); closeSearchPopup();
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
      document.body.classList.remove("menu-open");
    }
  });
  document.addEventListener("click", function (event) {
    const clickedWishlistControl = event.target.closest(".wishlist-btn, .wishlist-add, #detailWishlist, #floatingWishlist");
    const clickedCartControl = event.target.closest(".cart-btn, .add-cart, #detailAddCart, #topAddCart, #floatingAddCart");
    if (cartPanel?.classList.contains("active") && !cartPanel.contains(event.target) && !clickedCartControl) closePanel(cartPanel);
    if (wishlistPanel?.classList.contains("active") && !wishlistPanel.contains(event.target) && !clickedWishlistControl) closePanel(wishlistPanel);
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

  const initialSearch = new URLSearchParams(window.location.search).get("search");
  if (initialSearch) submitProductSearch(initialSearch);
  renderCart();
  renderWishlist();
});
