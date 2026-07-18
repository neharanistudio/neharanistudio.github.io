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
// SEARCH POPUP
// ==========================

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");


if(searchBtn && searchPopup){

    searchBtn.addEventListener("click",()=>{

        searchPopup.classList.add("active");

    });

}


if(closeSearch && searchPopup){

    closeSearch.addEventListener("click",()=>{

        searchPopup.classList.remove("active");

    });

}


if(searchPopup){

    searchPopup.addEventListener("click",(e)=>{

        if(e.target === searchPopup){

            searchPopup.classList.remove("active");

        }

    });

}
// ==========================
// WISHLIST PANEL
// ==========================

const wishlistBtn = document.querySelector(".wishlist-btn");
const wishlistPanel = document.querySelector(".wishlist-panel");
const closeWishlist = document.querySelector(".close-wishlist");


if(wishlistBtn && wishlistPanel){

    wishlistBtn.addEventListener("click",()=>{

        wishlistPanel.classList.add("active");

    });

}


if(closeWishlist && wishlistPanel){

    closeWishlist.addEventListener("click",()=>{

        wishlistPanel.classList.remove("active");

    });

}



// ==========================
// CART PANEL
// ==========================

const cartBtn = document.querySelector(".cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");


if(cartBtn && cartPanel){

    cartBtn.addEventListener("click",()=>{

        cartPanel.classList.add("active");

    });

}


if(closeCart && cartPanel){

    closeCart.addEventListener("click",()=>{

        cartPanel.classList.remove("active");

    });

}



// ==========================
// TRACK ORDER POPUP
// ==========================

const trackOrder = document.querySelector(".top-right a");

const orderPopup = document.querySelector(".order-popup");

const closeOrder = document.querySelector(".close-order");


if(trackOrder && orderPopup){

    trackOrder.addEventListener("click",(e)=>{

        e.preventDefault();

        orderPopup.classList.add("active");

    });

}


if(closeOrder && orderPopup){

    closeOrder.addEventListener("click",()=>{

        orderPopup.classList.remove("active");

    });

}


if(orderPopup){

    orderPopup.addEventListener("click",(e)=>{

        if(e.target === orderPopup){

            orderPopup.classList.remove("active");

        }

    });

}
// ==========================
// PRODUCT SEARCH
// ==========================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

if(searchButton){

searchButton.addEventListener("click",()=>{

let value = searchInput.value.toLowerCase();

let products = document.querySelectorAll(".product-card");


products.forEach(product=>{

let name = product.querySelector("h3").innerText.toLowerCase();


if(name.includes(value)){

product.parentElement.style.display="block";

}else{

product.parentElement.style.display="none";

}

});


document.querySelector("#featured").scrollIntoView({

behavior:"smooth"

});


});

}
