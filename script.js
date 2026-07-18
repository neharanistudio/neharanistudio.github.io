// ==========================
// MENU
// ==========================

const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");

if (menuIcon && sidebar && overlay) {

    menuIcon.addEventListener("click", () => {

        sidebar.classList.add("active");
        overlay.classList.add("active");

    });

    overlay.addEventListener("click", () => {

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

}



// ==========================
// CLOSE MENU AFTER CLICK
// ==========================

document.querySelectorAll(".sidebar a").forEach(link => {

    link.addEventListener("click", () => {

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

});



// ==========================
// HERO SLIDER
// ==========================

new Swiper(".heroSwiper", {

    loop: true,

    speed: 900,

    autoplay: {

        delay: 3500,

        disableOnInteraction: false,

    },

    pagination: {

        el: ".swiper-pagination",

        clickable: true,

    }

});



// ==========================
// CATEGORY SLIDER
// ==========================

new Swiper(".categorySwiper", {

    loop: true,

    spaceBetween: 25,

    autoplay: {

        delay: 2500,

        disableOnInteraction: false,

    },

    breakpoints: {

        0: {
            slidesPerView: 2
        },

        576: {
            slidesPerView: 2
        },

        768: {
            slidesPerView: 3
        },

        992: {
            slidesPerView: 4
        },

        1200: {
            slidesPerView: 5
        }

    }

});



// ==========================
// PRODUCT SLIDER
// ==========================

new Swiper(".productSwiper", {

    loop: true,

    spaceBetween: 25,

    autoplay: {

        delay: 3000,

        disableOnInteraction: false,

    },

    breakpoints: {

        0: {
            slidesPerView: 1
        },

        576: {
            slidesPerView: 2
        },

        992: {
            slidesPerView: 3
        },

        1200: {
            slidesPerView: 4
        }

    }

});



// ==========================
// BACK TO TOP BUTTON
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

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
// ==========================
// SEARCH POPUP OPEN CLOSE
// ==========================

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");


if(searchBtn){
    searchBtn.addEventListener("click", ()=>{
        searchPopup.classList.add("active");
    });
}


if(closeSearch){
    closeSearch.addEventListener("click", ()=>{
        searchPopup.classList.remove("active");
    });
}


// ==========================
// SEARCH POPUP
// ==========================

document.addEventListener("DOMContentLoaded",()=>{

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");


if(searchBtn && searchPopup){

searchBtn.onclick = function(){
    searchPopup.classList.add("active");
}

}


if(closeSearch && searchPopup){

closeSearch.onclick = function(){
    searchPopup.classList.remove("active");
}

}


// SEARCH PRODUCT

if(searchButton){

searchButton.onclick=function(){

let value = searchInput.value.toLowerCase().trim();

let products=document.querySelectorAll(".product-card");

let found=false;


products.forEach(product=>{

let title=product.querySelector("h3").innerText.toLowerCase();


if(title.includes(value) && value!=""){

found=true;

searchPopup.classList.remove("active");


product.scrollIntoView({
behavior:"smooth",
block:"center"
});


product.style.boxShadow="0 0 20px #d63384";


setTimeout(()=>{
product.style.boxShadow="";
},2000);


}


});


if(!found && value!=""){
alert("Product not found ❤️");
}


}

}


});
// ==========================
// WISHLIST PANEL
// ==========================

const wishlistBtn = document.querySelector(".wishlist-btn");
const wishlistPanel = document.querySelector(".wishlist-panel");
const closeWishlist = document.querySelector(".close-wishlist");

if(wishlistBtn){
wishlistBtn.onclick=()=>{
wishlistPanel.classList.add("active");
}
}

if(closeWishlist){
closeWishlist.onclick=()=>{
wishlistPanel.classList.remove("active");
}
}


// ==========================
// CART PANEL
// ==========================

const cartBtn = document.querySelector(".cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");

if(cartBtn){
cartBtn.onclick=()=>{
cartPanel.classList.add("active");
}
}

if(closeCart){
closeCart.onclick=()=>{
cartPanel.classList.remove("active");
}
}


// ==========================
// TRACK ORDER
// ==========================

const trackLink=document.querySelector(".top-right a");

const orderPopup=document.querySelector(".order-popup");
const closeOrder=document.querySelector(".close-order");

if(trackLink){

trackLink.onclick=(e)=>{
e.preventDefault();
orderPopup.classList.add("active");
}

}


if(closeOrder){

closeOrder.onclick=()=>{
orderPopup.classList.remove("active");
}

}
// ==========================
// CART SYSTEM
// ==========================

let cart = [];
let wishlist = [];

const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const wishlistItems = document.querySelector(".wishlist-items");


// ADD TO CART

document.querySelectorAll(".add-cart").forEach(button=>{

button.addEventListener("click",()=>{

let card = button.closest(".product-card");

let name = card.querySelector("h3").innerText;
let price = card.querySelector(".product-price").innerText;
let image = card.querySelector("img").src;


cart.push({
name,
price,
image
});


cartCount.innerText = cart.length;

showCart();


});

});



// SHOW CART

function showCart(){

cartItems.innerHTML="";


cart.forEach(item=>{


cartItems.innerHTML += `

<div class="cart-product">

<img src="${item.image}">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

`;

});


}



// ==========================
// WISHLIST SYSTEM
// ==========================


document.querySelectorAll(".wishlist-add").forEach(button=>{


button.addEventListener("click",()=>{


let card = button.closest(".product-card");


let name = card.querySelector("h3").innerText;
let price = card.querySelector(".product-price").innerText;


wishlist.push({
name,
price
});


showWishlist();


});

});



function showWishlist(){

wishlistItems.innerHTML="";


wishlist.forEach(item=>{


wishlistItems.innerHTML += `

<div class="wish-product">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

`;


});


}


// ==========================
// VIEW ALL PRODUCTS
// ==========================

document.querySelectorAll(".section-heading a").forEach(btn=>{


btn.addEventListener("click",(e)=>{

e.preventDefault();

alert("More products coming soon ❤️");


});


});
// ==========================
// CART + WISHLIST SYSTEM
// ==========================

let cart = [];
let wishlist = [];

const cartCount = document.querySelector(".cart-count");
const cartPanel = document.querySelector(".cart-panel");
const wishlistPanel = document.querySelector(".wishlist-panel");


// ADD TO CART

document.querySelectorAll(".add-cart").forEach(button => {

button.addEventListener("click", function(){

let card = this.closest(".product-card");

let product = {
name: card.querySelector("h3").innerText,
price: card.querySelector(".product-price").innerText,
image: card.querySelector("img").src
};


cart.push(product);

cartCount.innerText = cart.length;

updateCart();

});

});


// SHOW CART

function updateCart(){

cartPanel.innerHTML = `

<button class="close-cart">
<i class="fa-solid fa-xmark"></i>
</button>

<h2>Your Cart 🛍️</h2>

${cart.length === 0 ? 
"<p>Your cart is empty</p>" :

cart.map(item=>`

<div class="cart-product">

<img src="${item.image}" width="70">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

`).join("")
}


<a href="#" class="checkout-btn">
Checkout
</a>

`;

}


// WISHLIST

document.querySelectorAll(".wishlist-add").forEach(button=>{


button.addEventListener("click",function(){

let card=this.closest(".product-card");


wishlist.push({

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText

});


updateWishlist();


});

});



function updateWishlist(){


wishlistPanel.innerHTML=`

<button class="close-wishlist">
<i class="fa-solid fa-xmark"></i>
</button>


<h2>Your Wishlist ❤️</h2>


${wishlist.map(item=>`

<div class="wish-product">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>


`).join("")}


`;

}



// OPEN CLOSE CART

document.addEventListener("click",function(e){


if(e.target.closest(".cart-btn")){

cartPanel.classList.add("active");

}


if(e.target.closest(".wishlist-btn")){

wishlistPanel.classList.add("active");

}


if(e.target.closest(".close-cart")){

cartPanel.classList.remove("active");

}


if(e.target.closest(".close-wishlist")){

wishlistPanel.classList.remove("active");

}


});



// ==========================
// SMOOTH CONTACT SCROLL
// ==========================

document.querySelectorAll('a[href="#contact"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

document.querySelector("#contact").scrollIntoView({

behavior:"smooth"

});

});

});



// ==========================
// VIEW ALL
// ==========================

document.querySelectorAll(".section-heading a").forEach(btn=>{


btn.addEventListener("click",function(e){

e.preventDefault();

document.querySelector("#featured").scrollIntoView({

behavior:"smooth"

});

});


});
