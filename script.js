// ==========================
// MENU SIDEBAR
// ==========================

const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");

if(menuIcon && sidebar && overlay){

    menuIcon.onclick = function(){
        sidebar.classList.add("active");
        overlay.classList.add("active");
    };


    overlay.onclick = function(){
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };

}


document.querySelectorAll(".sidebar a").forEach(link => {

    link.onclick = function(){

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    };

});
// ==========================
// HERO SLIDER
// ==========================

if (document.querySelector(".heroSwiper")) {

    new Swiper(".heroSwiper", {

        loop: true,

        speed: 900,

        autoplay: {
            delay: 3500,
            disableOnInteraction: false
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }

    });

}


// ==========================
// CATEGORY SLIDER
// ==========================

if (document.querySelector(".categorySwiper")) {

    new Swiper(".categorySwiper", {

        loop: true,

        spaceBetween: 25,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },

        breakpoints: {

            0: { slidesPerView: 2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 }

        }

    });

}


// ==========================
// PRODUCT SLIDER
// ==========================

new Swiper(".productSwiper", {

    loop: true,

    speed: 700,

    spaceBetween: 25,

    grabCursor: true,

    allowTouchMove: true,

    simulateTouch: true,

    touchRatio: 1,

    touchAngle: 45,

    freeMode: false,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    breakpoints: {

        0:{
            slidesPerView:1
        },

        576:{
            slidesPerView:2
        },

        992:{
            slidesPerView:3
        },

        1200:{
            slidesPerView:4
        }

    }

});

// ==========================
// BACK TO TOP BUTTON
// ==========================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
// ==========================
// SEARCH POPUP
// ==========================

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

if (searchBtn && searchPopup) {

    searchBtn.addEventListener("click", () => {
        searchPopup.classList.add("active");
    });

}

if (closeSearch && searchPopup) {

    closeSearch.addEventListener("click", () => {
        searchPopup.classList.remove("active");
    });

}

if (searchButton) {

    searchButton.addEventListener("click", () => {

        let value = searchInput.value.toLowerCase().trim();

        if (value === "") return;

        let found = false;

        document.querySelectorAll(".product-card").forEach(product => {

            let title = product.querySelector(".product-info h3").textContent.toLowerCase();

            if (title.includes(value)) {

                found = true;

                searchPopup.classList.remove("active");

                product.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                product.style.boxShadow = "0 0 20px #d63384";

                setTimeout(() => {
                    product.style.boxShadow = "";
                }, 2000);

            }

        });

        if (!found) {
            alert("Product not found ❤️");
        }

    });

}


// ==========================
// CART SYSTEM
// ==========================

let cart = [];

const cartBtn = document.querySelector(".cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const product = {

            name: card.querySelector("h3").innerText,
            price: card.querySelector(".product-price").innerText,
            image: card.querySelector("img").src

        };

        cart.push(product);

        cartCount.textContent = cart.length;

        renderCart();

    });

});

function renderCart() {

    cartItems.innerHTML = "";

    cart.forEach(item => {

        cartItems.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" alt="">

            <div>

                <h4>${item.name}</h4>

                <p>${item.price}</p>

            </div>

        </div>

        `;

    });

}

if (cartBtn) {

    cartBtn.addEventListener("click", () => {

        cartPanel.classList.add("active");

    });

}

if (closeCart) {

    closeCart.addEventListener("click", () => {

        cartPanel.classList.remove("active");

    });

}
// ==========================
// WISHLIST SYSTEM
// ==========================

let wishlist = [];

const wishlistBtn = document.querySelector(".wishlist-btn");
const wishlistPanel = document.querySelector(".wishlist-panel");
const wishlistItems = document.querySelector(".wishlist-items");
const closeWishlist = document.querySelector(".close-wishlist");

document.querySelectorAll(".wishlist-add").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const product = {

            name: card.querySelector("h3").innerText,
            price: card.querySelector(".product-price").innerText,
            image: card.querySelector("img").src

        };

        wishlist.push(product);

        renderWishlist();

    });

});

function renderWishlist() {

    wishlistItems.innerHTML = "";

    wishlist.forEach(item => {

        wishlistItems.innerHTML += `

        <div class="wish-product">

            <img src="${item.image}" alt="">

            <div>
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>

        </div>

        `;

    });

}

if (wishlistBtn) {

    wishlistBtn.addEventListener("click", () => {
        wishlistPanel.classList.add("active");
    });

}

if (closeWishlist) {

    closeWishlist.addEventListener("click", () => {
        wishlistPanel.classList.remove("active");
    });

}


// ==========================
// TRACK ORDER
// ==========================

const trackOrder = document.querySelector(".top-right a:first-child");
const orderPopup = document.querySelector(".order-popup");
const closeOrder = document.querySelector(".close-order");

if (trackOrder && orderPopup) {

    trackOrder.addEventListener("click", (e) => {

        e.preventDefault();

        orderPopup.classList.add("active");

    });

}

if (closeOrder) {

    closeOrder.addEventListener("click", () => {

        orderPopup.classList.remove("active");

    });

}


// ==========================
// CONTACT BUTTON
// ==========================

document.querySelectorAll('a[href="#contact"]').forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        document.getElementById("contact").scrollIntoView({

            behavior: "smooth"

        });

    });

});


// ==========================
// VIEW ALL BUTTON
// ==========================

document.querySelectorAll(".section-heading a").forEach(button => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        alert("More products coming soon ❤️");

    });

});


// ==========================
// CHECKOUT
// ==========================

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", (e) => {

        e.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty 🛍️");
            return;

        }

        alert("Checkout feature coming soon ❤️");

    });

}


// ==========================
// CLOSE PANELS ON OUTSIDE CLICK
// ==========================

window.addEventListener("click", (e) => {

    if (e.target === cartPanel) {
        cartPanel.classList.remove("active");
    }

    if (e.target === wishlistPanel) {
        wishlistPanel.classList.remove("active");
    }

    if (e.target === orderPopup) {
        orderPopup.classList.remove("active");
    }

    if (e.target === searchPopup) {
        searchPopup.classList.remove("active");
    }

});


// ==========================
// WEBSITE READY
// ==========================

console.log("Neha Rani Studio Ready ❤️");
document.querySelectorAll('a[href="#contact"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });

    });

});
