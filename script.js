/* =========================================================
   NEHA RANI STUDIO
   SCRIPT.JS
   PART 1.1
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL STORAGE
   ========================================================= */

let cart = JSON.parse(localStorage.getItem("nrs_cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("nrs_wishlist")) || [];

/* =========================================================
   SAVE FUNCTIONS
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "nrs_cart",
        JSON.stringify(cart)
    );

}

function saveWishlist() {

    localStorage.setItem(
        "nrs_wishlist",
        JSON.stringify(wishlist)
    );

}

/* =========================================================
   SELECTORS
   ========================================================= */

const cartBtn = document.querySelector(".cart-btn");

const wishlistBtn = document.querySelector(".wishlist-btn");

const cartPanel = document.querySelector(".cart-panel");

const wishlistPanel = document.querySelector(".wishlist-panel");

const cartItems = document.querySelector(".cart-items");

const wishlistItems = document.querySelector(".wishlist-items");

const cartCount = document.querySelector(".cart-count");

/* =========================================================
   UPDATE CART COUNT
   ========================================================= */

function updateCartCount() {

    if (!cartCount) return;

    cartCount.innerText = cart.length;

}

/* =========================================================
   START WEBSITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

});
/* =========================================================
   PART 1.2
   PANEL OPEN / CLOSE
========================================================= */

const closeCartBtn = document.querySelector(".close-cart");
const closeWishlistBtn = document.querySelector(".close-wishlist");

function openCart() {

    if (!cartPanel) return;

    cartPanel.classList.add("active");

}

function closeCart() {

    if (!cartPanel) return;

    cartPanel.classList.remove("active");

}

function openWishlist() {

    if (!wishlistPanel) return;

    wishlistPanel.classList.add("active");

}

function closeWishlist() {

    if (!wishlistPanel) return;

    wishlistPanel.classList.remove("active");

}


/* ================= EVENTS ================= */

if(cartBtn){

    cartBtn.addEventListener("click",openCart);

}

if(wishlistBtn){

    wishlistBtn.addEventListener("click",openWishlist);

}

if(closeCartBtn){

    closeCartBtn.addEventListener("click",closeCart);

}

if(closeWishlistBtn){

    closeWishlistBtn.addEventListener("click",closeWishlist);

}


/* ================= ESC KEY ================= */

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeCart();

        closeWishlist();

    }

});
/* =========================================================
   PART 1.3
   ADD TO CART SYSTEM
========================================================= */

const addCartButtons = document.querySelectorAll(".add-cart");

/* ================= RENDER CART ================= */

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;padding:30px;">
                Your cart is empty 🛒
            </p>
        `;

        updateCartCount();
        saveCart();
        return;

    }

    cart.forEach((item, index) => {

        cartItems.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" alt="${item.name}">

            <div style="flex:1;">

                <h4>${item.name}</h4>

                <p>${item.price}</p>

                <button
                    class="remove-cart"
                    data-index="${index}">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    updateCartCount();

    saveCart();

}


/* ================= ADD PRODUCT ================= */

addCartButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.stopPropagation();

        const card = this.closest(".product-card");

        if (!card) return;

        const product = {

            id: card.dataset.id,

            name: card.querySelector("h3").innerText,

            price: card.querySelector(".product-price").innerText,

            image: card.querySelector("img").src

        };

        cart.push(product);

        renderCart();

        openCart();

    });

});


/* ================= REMOVE PRODUCT ================= */

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("remove-cart")) return;

    const index = e.target.dataset.index;

    cart.splice(index, 1);

    renderCart();

});


/* ================= START ================= */

renderCart();
/* =========================================================
   PART 1.4
   PRODUCT PAGE ADD TO CART
========================================================= */

const detailAddCart = document.getElementById("detailAddCart");

if (detailAddCart) {

    detailAddCart.addEventListener("click", function () {

        const name = document.getElementById("productName").innerText;

        const price = document.getElementById("productPrice").innerText;

        const image = document.getElementById("mainProductImage").src;

        const product = {

            id: name.replace(/\s+/g, "-").toLowerCase(),

            name,

            price,

            image

        };

        const already = cart.find(item => item.id === product.id);

        if (!already) {

            cart.push(product);

            saveCart();

            renderCart();

            updateCartCount();

        }

        openCart();

    });

}

/* =========================================================
   PRODUCT PAGE CART COUNT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    renderCart();

});

/* =========================================================
   BUY NOW
========================================================= */

const whatsappBtn = document.getElementById("whatsappBtn");

if (whatsappBtn) {

    whatsappBtn.addEventListener("click", function () {

        const name = document.getElementById("productName").innerText;

        window.open(

            "https://wa.me/923045255325?text=Assalam-o-Alaikum, I want to order: " + encodeURIComponent(name),

            "_blank"

        );

    });

}
/* =========================================================
   PART 1.5
   WISHLIST SYSTEM
========================================================= */

const wishlistButtons = document.querySelectorAll(".wishlist-add");
const detailWishlist = document.getElementById("detailWishlist");

/* ================= RENDER WISHLIST ================= */

function renderWishlist() {

    if (!wishlistItems) return;

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
        <p style="text-align:center;padding:30px;">
            Your wishlist is empty ❤️
        </p>
        `;

        saveWishlist();
        return;
    }

    wishlist.forEach((item,index)=>{

        wishlistItems.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" alt="${item.name}">

            <div style="flex:1">

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

}

/* ================= HOMEPAGE WISHLIST ================= */

wishlistButtons.forEach(button=>{

    button.addEventListener("click",function(e){

        e.stopPropagation();

        const card=this.closest(".product-card");

        if(!card) return;

        const product={

            id:card.dataset.id,

            name:card.querySelector("h3").innerText,

            price:card.querySelector(".product-price").innerText,

            image:card.querySelector("img").src

        };

        const already=wishlist.find(item=>item.id===product.id);

        if(already){

            alert("Already in Wishlist ❤️");

            return;

        }

        wishlist.push(product);

        renderWishlist();

        openWishlist();

    });

});

/* ================= PRODUCT PAGE WISHLIST ================= */

if(detailWishlist){

detailWishlist.addEventListener("click",()=>{

const product={

id:document.getElementById("productName").innerText,

name:document.getElementById("productName").innerText,

price:document.getElementById("productPrice").innerText,

image:document.getElementById("mainProductImage").src

};

const already=wishlist.find(item=>item.id===product.id);

if(already){

alert("Already in Wishlist ❤️");

return;

}

wishlist.push(product);

renderWishlist();

openWishlist();

});

}

/* ================= REMOVE ================= */

document.addEventListener("click",function(e){

if(!e.target.classList.contains("remove-wishlist")) return;

wishlist.splice(e.target.dataset.index,1);

renderWishlist();

});

/* ================= START ================= */

renderWishlist();
/* =========================================================
   PART 1.6
   PRODUCT OPEN + SEARCH POPUP + BACK TO TOP
========================================================= */

/* ================= PRODUCT PAGE OPEN ================= */

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", function (e) {

        if (
            e.target.closest(".add-cart") ||
            e.target.closest(".wishlist-add")
        ) return;

        const id = this.dataset.id;

        if (!id) return;

        window.location.href = "product.html?id=" + id;

    });

});

/* ================= SEARCH POPUP ================= */

const searchPopup = document.querySelector(".search-popup");
const searchBtn = document.querySelector(".search-btn");
const closeSearch = document.querySelector(".close-search");

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

window.addEventListener("click", function (e) {

    if (e.target === searchPopup) {

        searchPopup.classList.remove("active");

    }

});

/* ================= SEARCH ================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product-item").forEach(product => {

            const name = product.innerText.toLowerCase();

            if (name.includes(value)) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

}

/* ================= BACK TO TOP ================= */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
