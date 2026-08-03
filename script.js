/* ==========================================
   NEHA RANI STUDIO
   SCRIPT.JS
   PART 1.1
   INITIAL SETUP + HERO SLIDER
========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    console.log("Neha Rani Studio Loaded ❤️");

    /* =====================================
       HERO SLIDER
    ===================================== */

    const heroSlider = document.querySelector(".heroSwiper");

    if (heroSlider) {

        new Swiper(".heroSwiper", {

            loop: true,

            speed: 800,

            spaceBetween: 0,

            autoplay: {

                delay: 3500,

                disableOnInteraction: false,

            },

            pagination: {

                el: ".swiper-pagination",

                clickable: true,

            },

            navigation: {

                nextEl: ".swiper-button-next",

                prevEl: ".swiper-button-prev",

            },

        });

    }

    /* =====================================
       GLOBAL VARIABLES
    ===================================== */

    const body = document.body;

    const menuBtn = document.querySelector(".menu-icon");

    const sidebar = document.querySelector(".sidebar");

    const overlay = document.querySelector(".menu-overlay");

    const cartPanel = document.querySelector(".cart-panel");

    const wishlistPanel = document.querySelector(".wishlist-panel");

    const searchPopup = document.querySelector(".search-popup");

    const orderPopup = document.querySelector(".order-popup");

    /* =====================================
       LOCAL STORAGE
    ===================================== */

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    /* =====================================
       SAVE FUNCTIONS
    ===================================== */

    function saveCart() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }

    function saveWishlist() {

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    }
    /* =====================================
       SIDEBAR MENU
    ===================================== */

    function openSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("active");
        overlay.classList.add("active");

        body.style.overflow = "hidden";

    }

    function closeSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

        body.style.overflow = "";

    }

    /* ==========================
       MENU BUTTON
    ========================== */

    if (menuBtn) {

        menuBtn.addEventListener("click", openSidebar);

    }

    /* ==========================
       OVERLAY CLICK
    ========================== */

    if (overlay) {

        overlay.addEventListener("click", closeSidebar);

    }

    /* ==========================
       ESC KEY CLOSE
    ========================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeSidebar();

        }

    });

    /* ==========================
       SIDEBAR LINKS
    ========================== */

    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeSidebar();

        });

    });
       /* =====================================
       CATEGORY FILTER SYSTEM
    ===================================== */

    const productItems = document.querySelectorAll(".product-item");

    function filterProducts(category) {

        productItems.forEach(product => {

            const productCategory = product.dataset.category;

            if (category === "all") {

                product.style.display = "block";

                return;

            }

            if (productCategory === category) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    }

    /* =====================================
       SIDEBAR CATEGORY FILTER
    ===================================== */

    sidebarLinks.forEach(link => {

        link.addEventListener("click", (e) => {

            const category = link.dataset.category;

            if (!category) return;

            e.preventDefault();

            filterProducts(category);

            closeSidebar();

            const featured = document.querySelector("#featured");

            if (featured) {

                featured.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    /* =====================================
       VIEW ALL PRODUCTS BUTTON
    ===================================== */

    const viewAllBtn = document.querySelector("#viewAllProducts");

    if (viewAllBtn) {

        viewAllBtn.addEventListener("click", (e) => {

            e.preventDefault();

            filterProducts("all");

            const featured = document.querySelector("#featured");

            if (featured) {

                featured.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }
       /* =====================================
       PRODUCT CARD NAVIGATION
    ===================================== */

    const productLinks = {

        "gift-box": "gift-box",

        "bag-1": "hand-bag",

        "dress-1": "dress-1",

        "perfume-1": "perfume",

        "jewelry-1": "watch",

        "shoes-1": "shoes"

    };

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {

        card.addEventListener("click", (e) => {

            // Don't open detail page when clicking buttons
            if (
                e.target.closest(".add-cart") ||
                e.target.closest(".wishlist-add") ||
                e.target.closest(".product-btn") ||
                e.target.closest(".wishlist-btn")
            ) {
                return;
            }

            const productId = card.dataset.id;

            if (!productId) return;

            if (productLinks[productId]) {

                window.location.href =
                    `product.html?id=${productLinks[productId]}`;

            }

        });

    });

    /* =====================================
       PRODUCT IMAGE HOVER EFFECT
    ===================================== */

    productCards.forEach(card => {

        const image = card.querySelector(".product-image img");

        if (!image) return;

        card.addEventListener("mouseenter", () => {

            image.style.transform = "scale(1.05)";
            image.style.transition = "0.3s ease";

        });

        card.addEventListener("mouseleave", () => {

            image.style.transform = "scale(1)";

        });

    });

    /* =====================================
       PRODUCT BUTTON STOP PROPAGATION
    ===================================== */

    document.querySelectorAll(".add-cart").forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

        });

    });

    document.querySelectorAll(".wishlist-add").forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

        });

    });

    document.querySelectorAll(".product-btn").forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

        });

    });
       /* =====================================
       INITIAL FUNCTIONS
    ===================================== */

    function initializeWebsite() {

        console.log("================================");
        console.log(" Neha Rani Studio Loaded ❤️ ");
        console.log(" Version 2.0");
        console.log("================================");

    }

    /* =====================================
       CLOSE PANELS WHEN CLICKING OUTSIDE
    ===================================== */

    document.addEventListener("click", (e) => {

        // Cart Panel
        if (
            cartPanel &&
            cartPanel.classList.contains("active") &&
            !cartPanel.contains(e.target) &&
            !e.target.closest(".cart-btn")
        ) {

            cartPanel.classList.remove("active");

        }

        // Wishlist Panel
        if (
            wishlistPanel &&
            wishlistPanel.classList.contains("active") &&
            !wishlistPanel.contains(e.target) &&
            !e.target.closest(".wishlist-btn")
        ) {

            wishlistPanel.classList.remove("active");

        }

    });

    /* =====================================
       IMAGE LOADING EFFECT
    ===================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("load", () => {

            img.classList.add("loaded");

        });

    });

    /* =====================================
       SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

    /* =====================================
       START WEBSITE
    ===================================== */

    initializeWebsite();

}); // DOMContentLoaded END
/* =====================================
   PART 2.1
   CART DATA & SAVE FUNCTIONS
===================================== */

// Cart Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartPanel = document.querySelector(".cart-panel");
const cartBtn = document.querySelector(".cart-btn");
const closeCart = document.querySelector(".close-cart");

/* =====================================
   SAVE CART
===================================== */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/* =====================================
   UPDATE CART COUNT
===================================== */

function updateCartCount(){

    if(!cartCount) return;

    let total = 0;

    cart.forEach(item=>{

        total += item.qty;

    });

    cartCount.textContent = total;

}

/* =====================================
   UPDATE CART PANEL
===================================== */

function updateCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `

        <div class="empty-cart">

            <h3>Your cart is empty 🛍</h3>

            <p>Add products to continue shopping.</p>

        </div>

        `;

        updateCartCount();
        saveCart();

        return;

    }

    cart.forEach((item,index)=>{

        cartItems.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p class="cart-price">${item.price}</p>

                <div class="qty-box">

                    <button class="minus" data-index="${index}">
                        -
                    </button>

                    <span>${item.qty}</span>

                    <button class="plus" data-index="${index}">
                        +
                    </button>

                </div>

                <button
                    class="remove-cart"
                    data-index="${index}"
                >
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    updateCartCount();

    saveCart();

}
/* =====================================
   PART 2.2
   ADD TO CART FUNCTIONS
===================================== */

/* ===============================
   ADD PRODUCT TO CART
================================ */

function addToCart(product){

    let existing = cart.find(item => item.name === product.name);

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            ...product,
            qty:1
        });

    }

    updateCart();

}

/* ===============================
   HOME PAGE ADD CART BUTTON
================================ */

document.querySelectorAll(".add-cart").forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        const card = button.closest(".product-card");

        if(!card) return;

        const product={

            name: card.querySelector("h3").textContent.trim(),

            price: card.querySelector(".product-price").textContent.trim(),

            image: card.querySelector("img").src

        };

        addToCart(product);

    });

});


/* ===============================
   CART PLUS / MINUS / REMOVE
================================ */

if(cartItems){

    cartItems.addEventListener("click",(e)=>{

        const index = Number(e.target.dataset.index);

        if(isNaN(index)) return;

        /* PLUS */

        if(e.target.classList.contains("plus")){

            cart[index].qty++;

            updateCart();

        }

        /* MINUS */

        if(e.target.classList.contains("minus")){

            if(cart[index].qty > 1){

                cart[index].qty--;

            }else{

                cart.splice(index,1);

            }

            updateCart();

        }

        /* REMOVE */

        if(e.target.classList.contains("remove-cart")){

            cart.splice(index,1);

            updateCart();

        }

    });

}
/* =====================================
   PART 2.3
   CART PANEL + CHECKOUT
===================================== */

/* ===============================
   OPEN CART
================================ */

if(cartBtn){

    cartBtn.addEventListener("click",()=>{

        cartPanel.classList.add("active");

        updateCart();

    });

}

/* ===============================
   CLOSE CART
================================ */

if(closeCart){

    closeCart.addEventListener("click",()=>{

        cartPanel.classList.remove("active");

    });

}

/* ===============================
   CLOSE WHEN CLICK OUTSIDE
================================ */

document.addEventListener("click",(e)=>{

    if(
        cartPanel &&
        cartPanel.classList.contains("active") &&
        !cartPanel.contains(e.target) &&
        !e.target.closest(".cart-btn")
    ){

        cartPanel.classList.remove("active");

    }

});

/* ===============================
   CHECKOUT WHATSAPP
================================ */

const checkoutBtn = document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        if(cart.length===0){

            alert("🛒 Your cart is empty.");

            return;

        }

        let message =
`🌸 Assalam-o-Alaikum

I would like to place an order from *Neha Rani Studio*.

--------------------------------

`;

        cart.forEach((item,index)=>{

            message +=
`${index+1}. ${item.name}
Price: ${item.price}
Quantity: ${item.qty}

`;

        });

        message +=
`--------------------------------

Please confirm my order.

Thank you 🤍`;

        const whatsappURL =
"https://wa.me/923045255325?text=" +
encodeURIComponent(message);

        window.open(
            whatsappURL,
            "_blank"
        );

    });

}

/* ===============================
   LOAD CART ON PAGE OPEN
================================ */

updateCart();
updateCartCount();

console.log("✅ Cart System Loaded");
/* =====================================
   PART 3.1
   WISHLIST DATA
===================================== */

// Wishlist Data
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Elements
const wishlistBtn = document.querySelector(".wishlist-btn");
const wishlistPanel = document.querySelector(".wishlist-panel");
const wishlistItems = document.querySelector(".wishlist-items");
const closeWishlist = document.querySelector(".close-wishlist");

/* =====================================
   SAVE WISHLIST
===================================== */

function saveWishlist(){

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}

/* =====================================
   UPDATE WISHLIST
===================================== */

function updateWishlist(){

    if(!wishlistItems) return;

    wishlistItems.innerHTML = "";

    if(wishlist.length===0){

        wishlistItems.innerHTML=`

        <div class="empty-wishlist">

            <h3>❤️ Wishlist is Empty</h3>

            <p>Add your favourite products.</p>

        </div>

        `;

        saveWishlist();

        return;

    }

    wishlist.forEach((item,index)=>{

        wishlistItems.innerHTML += `

        <div class="wishlist-product">

            <img src="${item.image}" alt="${item.name}">

            <div class="wishlist-info">

                <h4>${item.name}</h4>

                <p>${item.price}</p>

                <button
                    class="remove-wishlist"
                    data-index="${index}">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    saveWishlist();

    /* ===============================
       HOME HEART COLOR
    ============================== */

    document.querySelectorAll(".wishlist-add").forEach(btn=>{

        const card = btn.closest(".product-card");

        if(!card) return;

        const name = card.querySelector("h3").textContent.trim();

        const found = wishlist.find(item=>item.name===name);

        if(found){

            btn.classList.add("liked");

        }else{

            btn.classList.remove("liked");

        }

    });

}
/* =====================================
   PART 3.2
   WISHLIST FUNCTIONS
===================================== */

/* ===============================
   ADD / REMOVE WISHLIST
================================ */

function toggleWishlist(product){

    const index = wishlist.findIndex(
        item => item.name === product.name
    );

    if(index > -1){

        wishlist.splice(index,1);

    }else{

        wishlist.push(product);

    }

    updateWishlist();

}

/* ===============================
   HOME PAGE HEART BUTTON
================================ */

document.querySelectorAll(".wishlist-add").forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        const card = button.closest(".product-card");

        if(!card) return;

        const product={

            name: card.querySelector("h3").textContent.trim(),

            price: card.querySelector(".product-price").textContent.trim(),

            image: card.querySelector("img").src

        };

        toggleWishlist(product);

    });

});


/* ===============================
   REMOVE FROM WISHLIST
================================ */

if(wishlistItems){

    wishlistItems.addEventListener("click",(e)=>{

        if(!e.target.classList.contains("remove-wishlist")) return;

        const index = Number(e.target.dataset.index);

        if(isNaN(index)) return;

        wishlist.splice(index,1);

        updateWishlist();

    });

}


/* ===============================
   OPEN WISHLIST
================================ */

if(wishlistBtn){

    wishlistBtn.addEventListener("click",()=>{

        wishlistPanel.classList.add("active");

        updateWishlist();

    });

}


/* ===============================
   CLOSE WISHLIST
================================ */

if(closeWishlist){

    closeWishlist.addEventListener("click",()=>{

        wishlistPanel.classList.remove("active");

    });

}


/* ===============================
   CLOSE ON OUTSIDE CLICK
================================ */

document.addEventListener("click",(e)=>{

    if(
        wishlistPanel &&
        wishlistPanel.classList.contains("active") &&
        !wishlistPanel.contains(e.target) &&
        !e.target.closest(".wishlist-btn")
    ){

        wishlistPanel.classList.remove("active");

    }

});


/* ===============================
   LOAD WISHLIST
================================ */

updateWishlist();

console.log("✅ Wishlist System Loaded");
/* =====================================
   PART 4.1
   PRODUCT DETAIL DATA
===================================== */

const products = {

    "gift-box": {

        name: "Luxury Gift Box",

        price: "Rs. 2,999",

        description:
        "Premium luxury gift box specially designed for your loved ones.",

        images: [

            "images/products/product1-1.jpg",
            "images/products/product1-2.jpg",
            "images/products/product1-3.jpg"

        ]

    },

    "hand-bag": {

        name: "Elegant Hand Bag",

        price: "Rs. 3,999",

        description:
        "Premium ladies handbag with modern stylish design.",

        images: [

            "images/products/product2.jpg"

        ]

    },

    "dress-1": {

        name: "Beautiful Dress",

        price: "Rs. 4,999",

        description:
        "Elegant ladies dress perfect for every occasion.",

        images: [

            "images/products/product3.jpg"

        ]

    },

    "perfume": {

        name: "Premium Perfume",

        price: "Rs. 2,499",

        description:
        "Long lasting premium fragrance.",

        images: [

            "images/products/product4.jpg"

        ]

    },

    "watch": {

        name: "Luxury Watch",

        price: "Rs. 5,499",

        description:
        "Luxury ladies watch with premium finish.",

        images: [

            "images/products/product5.jpg"

        ]

    },

    "shoes": {

        name: "Ladies Shoes",

        price: "Rs. 3,499",

        description:
        "Comfortable stylish ladies shoes.",

        images: [

            "images/products/product6.jpg"

        ]

    }

};

/* =====================================
   LOAD PRODUCT
===================================== */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

let currentProduct = null;

let currentImage = 0;

if(productId && products[productId]){

    currentProduct = products[productId];

    const productName =
    document.querySelector("#productName");

    const productPrice =
    document.querySelector("#productPrice");

    const productDescription =
    document.querySelector("#productDescription");

    const mainImage =
    document.querySelector("#mainProductImage");

    if(productName){

        productName.textContent =
        currentProduct.name;

    }

    if(productPrice){

        productPrice.textContent =
        currentProduct.price;

    }

    if(productDescription){

        productDescription.textContent =
        currentProduct.description;

    }

    if(mainImage){

        mainImage.src =
        currentProduct.images[0];

    }

}
/* =====================================
   PART 4.2
   PRODUCT IMAGE + DETAIL FUNCTIONS
===================================== */

/* ===============================
   PRODUCT IMAGE SLIDER
================================ */

window.nextImage = function(){

    if(!currentProduct) return;

    currentImage++;

    if(currentImage >= currentProduct.images.length){

        currentImage = 0;

    }

    const mainImage =
    document.querySelector("#mainProductImage");

    if(mainImage){

        mainImage.src =
        currentProduct.images[currentImage];

    }

};

window.prevImage = function(){

    if(!currentProduct) return;

    currentImage--;

    if(currentImage < 0){

        currentImage =
        currentProduct.images.length - 1;

    }

    const mainImage =
    document.querySelector("#mainProductImage");

    if(mainImage){

        mainImage.src =
        currentProduct.images[currentImage];

    }

};

/* ===============================
   DETAIL PAGE ADD TO CART
================================ */

const detailAddCart =
document.querySelector("#detailAddCart");

if(detailAddCart){

    detailAddCart.addEventListener("click",()=>{

        if(!currentProduct) return;

        addToCart({

            name: currentProduct.name,

            price: currentProduct.price,

            image: currentProduct.images[0]

        });

        alert("✅ Product added to cart");

    });

}

/* ===============================
   DETAIL PAGE WISHLIST
================================ */

const detailWishlist =
document.querySelector("#detailWishlist");

if(detailWishlist){

    detailWishlist.addEventListener("click",()=>{

        if(!currentProduct) return;

        toggleWishlist({

            name: currentProduct.name,

            price: currentProduct.price,

            image: currentProduct.images[0]

        });

        detailWishlist.classList.toggle("liked");

    });

}

/* ===============================
   BUY NOW WHATSAPP
================================ */

const whatsappBtn =
document.querySelector("#whatsappBtn");

if(whatsappBtn){

    whatsappBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        if(!currentProduct) return;

        const message =

`🌸 Assalam-o-Alaikum

I want to order this product.

🛍 Product:
${currentProduct.name}

💰 Price:
${currentProduct.price}

Please confirm my order.

Thank you 🤍`;

        const whatsappURL =
        "https://wa.me/923045255325?text=" +
        encodeURIComponent(message);

        window.open(
            whatsappURL,
            "_blank"
        );

    });

}

/* ===============================
   HIGHLIGHT HEART
================================ */

if(detailWishlist && currentProduct){

    const exists =
    wishlist.find(
        item => item.name === currentProduct.name
    );

    if(exists){

        detailWishlist.classList.add("liked");

    }

}

console.log("✅ Product Detail Loaded");
/* =====================================
   PART 5.1
   SEARCH POPUP SYSTEM
===================================== */

/* ===============================
   SEARCH ELEMENTS
================================ */

const searchBtn =
document.querySelector(".search-btn");

const searchPopup =
document.querySelector(".search-popup");

const closeSearch =
document.querySelector(".close-search");

const searchInput =
document.querySelector("#searchInput");

const searchButton =
document.querySelector("#searchButton");

/* ===============================
   OPEN SEARCH
================================ */

if(searchBtn){

    searchBtn.addEventListener("click",()=>{

        searchPopup.classList.add("active");

        if(searchInput){

            setTimeout(()=>{

                searchInput.focus();

            },200);

        }

    });

}

/* ===============================
   CLOSE SEARCH
================================ */

if(closeSearch){

    closeSearch.addEventListener("click",()=>{

        searchPopup.classList.remove("active");

    });

}

/* ===============================
   CLOSE ON OUTSIDE CLICK
================================ */

if(searchPopup){

    searchPopup.addEventListener("click",(e)=>{

        if(e.target===searchPopup){

            searchPopup.classList.remove("active");

        }

    });

}

/* ===============================
   SEARCH FUNCTION
================================ */

function searchProducts(){

    if(!searchInput) return;

    const value =
    searchInput.value
    .toLowerCase()
    .trim();

    const products =
    document.querySelectorAll(".product-item");

    products.forEach(product=>{

        const text =
        product.textContent.toLowerCase();

        if(
            text.includes(value) ||
            value===""
        ){

            product.style.display="block";

        }

        else{

            product.style.display="none";

        }

    });

}

/* ===============================
   SEARCH BUTTON
================================ */

if(searchButton){

    searchButton.addEventListener("click",()=>{

        searchProducts();

        searchPopup.classList.remove("active");

        const featured =
        document.querySelector("#featured");

        if(featured){

            featured.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

}

/* ===============================
   ENTER KEY SEARCH
================================ */

if(searchInput){

    searchInput.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();

            searchProducts();

            searchPopup.classList.remove("active");

        }

    });

}

console.log("✅ Search System Loaded");
/* =====================================
   PART 5.2
   TRACK ORDER + FLOATING BUTTONS
===================================== */

/* ===============================
   TRACK ORDER POPUP
================================ */

const trackOrderBtn =
document.querySelector("#trackOrder");

const orderPopup =
document.querySelector(".order-popup");

const closeOrder =
document.querySelector(".close-order");

if(trackOrderBtn){

    trackOrderBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        if(orderPopup){

            orderPopup.classList.add("active");

        }

    });

}

/* ===============================
   CLOSE ORDER POPUP
================================ */

if(closeOrder){

    closeOrder.addEventListener("click",()=>{

        orderPopup.classList.remove("active");

    });

}

/* ===============================
   CLOSE POPUP OUTSIDE
================================ */

if(orderPopup){

    orderPopup.addEventListener("click",(e)=>{

        if(e.target===orderPopup){

            orderPopup.classList.remove("active");

        }

    });

}

/* ===============================
   TRACK BUTTON
================================ */

const trackBtn =
document.querySelector(".track-btn");

const trackingInput =
document.querySelector("#trackingNumber");

if(trackBtn){

    trackBtn.addEventListener("click",()=>{

        const orderNo =
        trackingInput.value.trim();

        if(orderNo===""){

            alert("Please enter your Order ID.");

            return;

        }

        alert(
            "Your Order (" +
            orderNo +
            ") is being processed. 🤍"
        );

        orderPopup.classList.remove("active");

    });

}

/* ===============================
   FLOATING WHATSAPP
================================ */

const whatsappBtn =
document.querySelector(".whatsapp-btn");

if(whatsappBtn){

    whatsappBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        window.open(

            "https://wa.me/923045255325",

            "_blank"

        );

    });

}

/* ===============================
   BACK TO TOP
================================ */

const topBtn =
document.querySelector("#topBtn");

if(topBtn){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 300){

            topBtn.style.display="flex";

        }else{

            topBtn.style.display="none";

        }

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ===============================
   ESC KEY CLOSE POPUPS
================================ */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        if(searchPopup){

            searchPopup.classList.remove("active");

        }

        if(orderPopup){

            orderPopup.classList.remove("active");

        }

        if(cartPanel){

            cartPanel.classList.remove("active");

        }

        if(wishlistPanel){

            wishlistPanel.classList.remove("active");

        }

    }

});

console.log("✅ Utility Functions Loaded");
/* =====================================
   PART 6
   FINAL INITIALIZATION
===================================== */

/* ===============================
   LAZY LOAD IMAGES
================================ */

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("loading","lazy");

});

/* ===============================
   IMAGE FALLBACK
================================ */

document.querySelectorAll("img").forEach(img=>{

    img.onerror=function(){

        this.src="images/no-image.png";

    };

});

/* ===============================
   PRODUCT CARD HOVER
================================ */

document.querySelectorAll(".product-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

/* ===============================
   CLOSE PANELS WHEN CLICK OUTSIDE
================================ */

document.addEventListener("click",(e)=>{

    if(
        cartPanel &&
        cartPanel.classList.contains("active") &&
        !cartPanel.contains(e.target) &&
        !e.target.closest(".cart-btn")
    ){

        cartPanel.classList.remove("active");

    }

    if(
        wishlistPanel &&
        wishlistPanel.classList.contains("active") &&
        !wishlistPanel.contains(e.target) &&
        !e.target.closest(".wishlist-btn")
    ){

        wishlistPanel.classList.remove("active");

    }

});

/* ===============================
   PREVENT EMPTY LINKS
================================ */

document.querySelectorAll("a[href='#']").forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

    });

});

/* ===============================
   WINDOW RESIZE FIX
================================ */

window.addEventListener("resize",()=>{

    if(window.innerWidth > 768){

        if(sidebar){

            sidebar.classList.remove("active");

        }

        if(overlay){

            overlay.classList.remove("active");

        }

    }

});

/* ===============================
   PAGE LOADED
================================ */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

    updateCart();

    updateWishlist();

    console.log("🚀 Neha Rani Studio Loaded Successfully");

});
