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
    "gift-box": { id: "gift-box", name: "Floral Rose Jewelry Gift Box", price: "Rs. 2,500", image: "38e741213269e58e0f0808eecdb54bd2.avif", images: ["38e741213269e58e0f0808eecdb54bd2.avif","3e660d84b622b7e3cd41db9b79707c9a.avif","708f803e62acd1dff76a167189b64b1c.avif","d39364e4-1667-11ee-8fd0-0a580a698dd1.avif","e4af9116843812b5625fb6820142e44d.avif"], category: "Gift Hampers" },
    "gift-hamper": { id: "gift-box", name: "Floral Rose Jewelry Gift Box", price: "Rs. 2,500", image: "38e741213269e58e0f0808eecdb54bd2.avif", images: ["38e741213269e58e0f0808eecdb54bd2.avif","3e660d84b622b7e3cd41db9b79707c9a.avif","708f803e62acd1dff76a167189b64b1c.avif","d39364e4-1667-11ee-8fd0-0a580a698dd1.avif","e4af9116843812b5625fb6820142e44d.avif"], category: "Gift Hampers" },
    "red-rose-bear": { id: "red-rose-bear", name: "Red Rose Bear Rotating Gift Box", price: "Rs. 5,000", image: "1ac13be0-8fd5-4936-b6c2-5b711d608318.avif", images: ["1ac13be0-8fd5-4936-b6c2-5b711d608318.avif","30eda5da-edef-4179-84c1-e84ec5ba2e9f.avif","667bd30e-1053-40df-9a04-572cb88428fc.avif","819c467e-29c9-48d7-b054-fc57b20ef7ff.avif","8edb78cd-3c97-4e36-b7ac-1b7c97afdbf9.avif","e0e61986-831b-4eed-805b-9cf3df2a91ea.avif"], category: "Gift Hampers" },
    "glow-rose-dome": { id: "glow-rose-dome", name: "Glow Rose Dome with LED Lights", price: "Rs. 2,500", image: "2494cdfc379a07711a3b05b87f82b635.avif", images: ["2494cdfc379a07711a3b05b87f82b635.avif","360580c0-8d2a-4eba-8299-6f168c49bd96.avif","c76adbeb-a54f-4d46-b544-34680dc2dba8.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953 (1).avif","f0248652-13c6-4e20-a1fa-c4b4f50d91bb.avif"], variants: [{name:"White Rose",images:["c76adbeb-a54f-4d46-b544-34680dc2dba8.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953.avif"]},{name:"Pink Rose",images:["2494cdfc379a07711a3b05b87f82b635.avif","360580c0-8d2a-4eba-8299-6f168c49bd96.avif"]},{name:"Red Rose",images:["dbe1bd57-c5eb-4541-8bc6-49f85d1cf953 (1).avif","f0248652-13c6-4e20-a1fa-c4b4f50d91bb.avif"]}], category: "Gift Hampers" },
    "surprise-explosion-box": { id: "surprise-explosion-box", name: "5-Layer Surprise Explosion Gift Box", price: "Rs. 2,800", image: "a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif", images: ["a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif","01d65959-9f0b-4d27-bbc0-323414ec71ce.avif","2fb0de8e-e329-420e-b06e-baea1b747f0a.avif","5462fba9-7634-468b-801f-c9498c203949.avif","594299bc-ddc7-46aa-b566-c96ebe36012f.avif","b7d68682-40a2-4c90-b259-c589417f2053.avif","d2032f3b-bed3-408c-bc5c-c54ebdb73a0c.avif","d6168c1c-809d-4241-b506-ee49550c4ee6.avif"], variants: [{name:"Pink Pack",images:["a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif"]},{name:"Santa Pack",images:["b7d68682-40a2-4c90-b259-c589417f2053.avif"]}], category: "Gift Hampers", description: "Make birthdays and special celebrations unforgettable with this five-layer surprise explosion gift box. Choose from Pink Pack or Santa Pack. The Santa Pack features the red open gift box. A thoughtful surprise for birthdays, Valentine’s Day, anniversaries and special celebrations." },
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
    detailImageIndex = Math.max(0, Math.min(detailImageIndex, detailImages.length - 1));
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
      detailImages=(detailProduct.images||[detailProduct.image]).filter(Boolean);renderGallery();
      const variantPicker=$("#productVariantPicker"),variantOptions=$("#productVariantOptions"),variantNote=$("#variantSelectionNote");
      if(detailProduct.variants && variantPicker && variantOptions){
        variantPicker.hidden=false;
        let selectedVariant=null;
        const renderVariantOptions=function(){
          variantOptions.innerHTML=detailProduct.variants.map(function(variant,index){
            const selected=!!selectedVariant && variant.name===selectedVariant.name;
            const swatch=variant.name.toLowerCase().includes("white")?"#fff":variant.name.toLowerCase().includes("pink")?"#f3a6c5":"#d71935";
            return '<button type="button" class="product-variant-option'+(selected?' active':'')+'" data-variant-index="'+index+'" aria-pressed="'+selected+'"><span class="variant-swatch" style="--variant-swatch:'+swatch+'"></span>'+escapeHTML(variant.name)+'</button>';
          }).join("");
          if(variantNote)variantNote.textContent=selectedVariant ? "Selected: "+selectedVariant.name : "Choose Pink Pack or Santa Pack to view its product photo.";
        };
        variantOptions.addEventListener("click",function(event){
          const button=event.target.closest("[data-variant-index]");
          if(!button)return;
          selectedVariant=detailProduct.variants[Number(button.dataset.variantIndex)];
          detailProduct.selectedVariant=selectedVariant.name;
          const selectedPhoto=selectedVariant.images && selectedVariant.images[0];
          detailProduct.image=selectedPhoto || detailProduct.image;
          // Keep every uploaded photo in the gallery, but immediately show the selected pack's exact photo.
          detailImages=(detailProduct.images||[]).filter(Boolean);
          let selectedPhotoIndex=detailImages.indexOf(selectedPhoto);
          if(selectedPhotoIndex<0 && selectedPhoto){detailImages.unshift(selectedPhoto);selectedPhotoIndex=0;}
          detailImageIndex=selectedPhotoIndex>=0?selectedPhotoIndex:0;
          renderGallery();renderVariantOptions();
        });
        renderGallery();renderVariantOptions();
      }
      const productDescriptions = {
        "surprise-explosion-box": "Make birthdays and special celebrations unforgettable with this five-layer surprise explosion gift box. Open it to reveal a playful layered surprise, perfect for birthdays, Valentine’s Day, anniversaries and thoughtful gifting. Choose between Pink Pack and Santa Pack. Pink Pack shows the pink box, while Santa Pack shows the red open box.",
        "glow-rose-dome": "Bring a soft romantic glow to any room with this elegant artificial rose displayed inside a clear decorative dome. A beautiful tabletop keepsake for birthdays, anniversaries, weddings, Valentine’s Day, Mother’s Day and festive gifting. Choose your favourite rose colour: white, pink or red. (Battery: AAA, not included.)",
        "red-rose-bear": "Surprise someone special with this charming red artificial rose bear, beautifully presented in a decorative gift box with a 360° rotating display. A romantic keepsake and thoughtful gift for your girlfriend, wife or mother, perfect for birthdays, anniversaries, weddings, Valentine’s Day and Mother’s Day.",
        "Gift Hampers": "Add a graceful floral touch to your special moments with this rose-decorated jewelry gift box. Its elegant presentation makes it a lovely choice for storing or gifting earrings, rings and necklaces, and for birthdays, weddings, anniversaries and celebrations.",
        "Ribbon Bouquets": "A charming ribbon bouquet designed to add a graceful touch to meaningful moments. A beautiful keepsake-style gift for birthdays, celebrations, anniversaries and heartfelt surprises.",
        "Bags": "Complete your everyday and occasion looks with this elegant handbag. Its versatile design pairs effortlessly with a range of outfits, making it a stylish accessory for day-to-day use and outings.",
        "Dresses": "Refresh your wardrobe with this stylish outfit, selected for its graceful look and versatile appeal. A lovely option for gatherings, festive moments and polished everyday dressing.",
        "Perfumes": "Add a refined finishing touch to your routine with this fragrance. A thoughtful choice for personal use or gifting, ideal for those who enjoy a fresh and memorable scent.",
        "Jewelry": "Elevate your look with this elegant jewelry piece. Its decorative detailing makes it a beautiful finishing touch for festive outfits, celebrations and special occasions.",
        "Shoes": "Step out in style with this versatile pair of ladies' shoes. Designed to complement a variety of looks, it is a lovely choice for everyday wear and casual outings.",
        "Abayas": "A graceful abaya that brings together modest styling and timeless elegance. A versatile wardrobe choice for everyday wear, gatherings and occasions.",
      };
      if(description) description.textContent = productDescriptions[detailProduct.id] || productDescriptions[detailProduct.category] || "Explore this thoughtfully selected piece from Neha Rani Studio. For product details, availability and ordering assistance, contact our team on WhatsApp.";
      const productHighlights = {
        "red-rose-bear": [
          ["Romantic rose bear design", "A charming bear made with artificial red roses for a memorable gifting moment."],
          ["360° rotating display", "A decorative rotating display box that lets the rose bear be admired from every angle."],
          ["Made for special occasions", "A thoughtful gift for birthdays, anniversaries, weddings, Valentine’s Day and Mother’s Day."]
        ],
        "gift-box": [
          ["Elegant rose decoration", "A pretty floral design that gives this jewelry gift box a romantic, gift-ready look."],
          ["For jewelry keepsakes", "A lovely box for presenting or keeping earrings, rings and necklaces together."],
          ["Perfect for special occasions", "A thoughtful choice for birthdays, weddings, anniversaries and celebration gifting."]
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
      slidesPerView: "auto",
      slidesPerGroup: 1,
      spaceBetween: 10,
      freeMode: false,
      watchOverflow: false,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      simulateTouch: true,
      allowTouchMove: true,
      grabCursor: true,
      touchRatio: 1,
      touchAngle: 45,
      threshold: 3,
      longSwipes: true,
      shortSwipes: true,
      resistance: true,
      resistanceRatio: 0.85,
      touchStartPreventDefault: false,
      preventInteractionOnTransition: false,
      breakpoints: {
        0: { spaceBetween: 10 },
        481: { spaceBetween: 14 },
        769: { spaceBetween: 18 },
        1025: { spaceBetween: 20 }
      }
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
