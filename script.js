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
/* ==========================================
   PHASE 2.1
   MENU • SIDEBAR • HERO • CATEGORY SWIPER
========================================== */

/* ========== SIDEBAR ========== */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

sidebar.classList.add("active");
overlay.classList.add("active");

});

}

if(overlay){

overlay.addEventListener("click",()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

});

}

/* Close sidebar after clicking any link */

document.querySelectorAll(".sidebar a").forEach(link=>{

link.addEventListener("click",()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

});

});


/* ========== HERO SLIDER ========== */

const heroSwiper = new Swiper(".heroSwiper",{

loop:true,

speed:800,

spaceBetween:0,

autoplay:{

delay:4000,

disableOnInteraction:false,

},

pagination:{

el:".swiper-pagination",

clickable:true,

},

});


/* ========== CATEGORY SLIDER ========== */

const categorySwiper = new Swiper(".categorySwiper",{

slidesPerView:6,

spaceBetween:20,

freeMode:true,

breakpoints:{

0:{
slidesPerView:4,
spaceBetween:12
},

480:{
slidesPerView:4.5,
spaceBetween:14
},

768:{
slidesPerView:6,
spaceBetween:18
},

1024:{
slidesPerView:8,
spaceBetween:20
}

}

});


/* ========== ACTIVE CATEGORY ========== */

document.querySelectorAll(".sidebar a").forEach(item=>{

item.addEventListener("click",()=>{

document.querySelectorAll(".sidebar a")
.forEach(a=>a.classList.remove("active"));

item.classList.add("active");

});

});
/* ==========================================
   PHASE 2.2
   PRODUCT PAGE + CATEGORY FILTER
========================================== */

/* ========== PRODUCT LINKS ========== */

const productLinks = {

"gift-box":"gift-box",
"bag-1":"hand-bag",
"dress-1":"dress-1",
"perfume-1":"perfume-1",
"jewelry-1":"jewelry-1",
"shoes-1":"shoes-1"

};


/* ========== PRODUCT OPEN ========== */

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("click",(e)=>{

if(e.target.closest(".add-cart")) return;

if(e.target.closest(".wishlist-add")) return;

const id = card.dataset.id;

if(productLinks[id]){

window.location.href =
`product.html?id=${productLinks[id]}`;

}

});

});


/* ========== CATEGORY FILTER ========== */

const products =
document.querySelectorAll(".product-item");

document.querySelectorAll("[data-category]").forEach(btn=>{

btn.addEventListener("click",(e)=>{

e.preventDefault();

const category =
btn.dataset.category;

products.forEach(product=>{

if(category==="all"){

product.style.display="block";

}

else{

product.style.display =
product.dataset.category===category
? "block"
: "none";

}

});

const section =
document.getElementById("featured-products");

if(section){

section.scrollIntoView({

behavior:"smooth"

});

}

});

});


/* ========== VIEW ALL PRODUCTS ========== */

const viewAll =
document.getElementById("viewAllProducts");

if(viewAll){

viewAll.addEventListener("click",(e)=>{

e.preventDefault();

products.forEach(product=>{

product.style.display="block";

});

});

}
/* ==========================================
   PHASE 2.3
   ADD TO CART + CART COUNT + LOCAL STORAGE
========================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");

/* ========== UPDATE CART ========== */

function updateCartUI() {

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <div class="empty-cart">
            <p>Your cart is empty.</p>
        </div>
        `;

        return;
    }

    cart.forEach((item, index) => {

        cartItems.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>${item.price}</p>

            </div>

            <button class="remove-cart"
                    data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
        `;

    });

}

/* ========== ADD TO CART ========== */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", function (e) {

        e.stopPropagation();

        const card = this.closest(".product-card");

        const product = {

            id: card.dataset.id,

            name: card.querySelector("h3").innerText,

            price: card.querySelector(".product-price").innerText,

            image: card.querySelector("img").src

        };

        cart.push(product);

        updateCartUI();

    });

});

/* ========== REMOVE FROM CART ========== */

document.addEventListener("click", function (e) {

    if (e.target.closest(".remove-cart")) {

        const index =
        e.target.closest(".remove-cart").dataset.index;

        cart.splice(index, 1);

        updateCartUI();

    }

});

/* ========== LOAD ========= */

updateCartUI();
/* ==========================================
   PHASE 2.4
   WISHLIST + LOCAL STORAGE + LIVE UPDATE
========================================== */

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistPanel =
document.querySelector(".wishlist-items");

const wishlistCount =
document.querySelector(".wishlist-count");

/* ================= UPDATE WISHLIST ================= */

function updateWishlistUI(){

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

if(wishlistCount){

wishlistCount.innerText =
wishlist.length;

}

if(!wishlistPanel) return;

wishlistPanel.innerHTML="";

if(wishlist.length===0){

wishlistPanel.innerHTML=`

<div class="empty-wishlist">

<p>Your wishlist is empty.</p>

</div>

`;

return;

}

wishlist.forEach((item,index)=>{

wishlistPanel.innerHTML+=`

<div class="wishlist-item">

<img src="${item.image}" alt="${item.name}">

<div class="wishlist-info">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

<button class="remove-wishlist"
data-index="${index}">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

});

}


/* ================= ADD TO WISHLIST ================= */

document.querySelectorAll(".wishlist-add").forEach(btn=>{

btn.addEventListener("click",function(e){

e.stopPropagation();

const card=this.closest(".product-card");

const product={

id:card.dataset.id,

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText,

image:card.querySelector("img").src

};

/* Duplicate check */

const alreadyExist=
wishlist.find(item=>item.id===product.id);

if(alreadyExist) return;

wishlist.push(product);

updateWishlistUI();

/* Heart Fill */

this.innerHTML=
'<i class="fa-solid fa-heart"></i>';

});

});


/* ================= REMOVE ================= */

document.addEventListener("click",function(e){

if(e.target.closest(".remove-wishlist")){

const index=
e.target.closest(".remove-wishlist").dataset.index;

wishlist.splice(index,1);

updateWishlistUI();

}

});


/* ================= LOAD ================= */

updateWishlistUI();
/* ==========================================
   PHASE 2.5
   CART PANEL + WISHLIST PANEL + LIVE PANEL
========================================== */

/* ================= CART PANEL ================= */

const cartBtn = document.querySelector(".cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");

if(cartBtn){

cartBtn.addEventListener("click",()=>{

cartPanel.classList.add("active");

});

}

if(closeCart){

closeCart.addEventListener("click",()=>{

cartPanel.classList.remove("active");

});

}


/* ================= WISHLIST PANEL ================= */

const wishlistBtn=document.querySelector(".wishlist-btn");

const wishlistPanelBox=
document.querySelector(".wishlist-panel");

const closeWishlist=
document.querySelector(".close-wishlist");

if(wishlistBtn){

wishlistBtn.addEventListener("click",()=>{

wishlistPanelBox.classList.add("active");

});

}

if(closeWishlist){

closeWishlist.addEventListener("click",()=>{

wishlistPanelBox.classList.remove("active");

});

}


/* ================= CLICK OUTSIDE ================= */

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

wishlistPanelBox &&
wishlistPanelBox.classList.contains("active") &&
!wishlistPanelBox.contains(e.target) &&
!e.target.closest(".wishlist-btn")

){

wishlistPanelBox.classList.remove("active");

}

});


/* ================= ESC KEY ================= */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

cartPanel?.classList.remove("active");

wishlistPanelBox?.classList.remove("active");

}

});


/* ================= CHECKOUT ================= */

const checkoutBtn=
document.querySelector(".checkout-btn");

if(checkoutBtn){

checkoutBtn.addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty.");

return;

}

window.location.href="checkout.html";

});

}


/* ================= LIVE COUNTS ================= */

function refreshCounts(){

if(document.querySelector(".cart-count")){

document.querySelector(".cart-count").innerText=
cart.length;

}

const wishCount=document.querySelector(".wishlist-count");

if(wishCount){

wishCount.innerText=
wishlist.length;

}

}

refreshCounts();
/* ==========================================
   PHASE 2.6
   SEARCH POPUP + LIVE SEARCH
========================================== */

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");
const searchInput = document.getElementById("searchInput");

if(searchBtn){

searchBtn.addEventListener("click",()=>{

searchPopup.classList.add("active");

setTimeout(()=>{

searchInput.focus();

},200);

});

}

if(closeSearch){

closeSearch.addEventListener("click",()=>{

searchPopup.classList.remove("active");

searchInput.value="";

showAllProducts();

});

}

/* Outside Click */

searchPopup.addEventListener("click",(e)=>{

if(e.target===searchPopup){

searchPopup.classList.remove("active");

searchInput.value="";

showAllProducts();

}

});

/* Live Search */

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

document.querySelectorAll(".product-item").forEach(product=>{

const title=product.querySelector("h3").innerText.toLowerCase();

if(title.includes(value)){

product.style.display="block";

}

else{

product.style.display="none";

}

});

});

/* Show All */

function showAllProducts(){

document.querySelectorAll(".product-item").forEach(product=>{

product.style.display="block";

});

}

/* ESC */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

searchPopup.classList.remove("active");

searchInput.value="";

showAllProducts();

}

});
/* ==========================================
   PHASE 2.7
   BACK TO TOP + SCROLL EFFECTS
========================================== */

const topBtn=document.getElementById("topBtn");

/* ================= SHOW BUTTON ================= */

window.addEventListener("scroll",()=>{

if(window.scrollY>350){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});


/* ================= BACK TO TOP ================= */

if(topBtn){

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}


/* ================= HEADER SHADOW ================= */

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.classList.add("header-scroll");

}else{

header.classList.remove("header-scroll");

}

});


/* ================= FADE ANIMATION ================= */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-show");

}

});

},{

threshold:.15

});

document.querySelectorAll(

".product-card,.category-card,.review-card,.offer-content"

).forEach(el=>{

el.classList.add("fade-hidden");

observer.observe(el);

});
/* ==========================================
   PHASE 2.8
   FINAL HOMEPAGE IMPROVEMENTS
========================================== */

/* ===== LIVE BADGES ===== */

function updateBadges(){

const cartBadge=document.querySelector(".cart-count");

if(cartBadge){

cartBadge.textContent=cart.length;

}

const wishBadge=document.querySelector(".wishlist-count");

if(wishBadge){

wishBadge.textContent=wishlist.length;

}

}

updateBadges();


/* ===== BUTTON ANIMATION ===== */

document.addEventListener("click",(e)=>{

const btn=e.target.closest(".product-btn");

if(!btn) return;

btn.classList.add("added");

btn.innerHTML="✓ Added";

setTimeout(()=>{

btn.classList.remove("added");

btn.innerHTML="Add To Cart";

},1200);

});


/* ===== IMAGE HOVER ===== */

document.querySelectorAll(".product-image img").forEach(img=>{

img.setAttribute("loading","lazy");

});


/* ===== MOBILE TOUCH ===== */

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("touchstart",()=>{

card.classList.add("touch-active");

});

card.addEventListener("touchend",()=>{

setTimeout(()=>{

card.classList.remove("touch-active");

},150);

});

});
