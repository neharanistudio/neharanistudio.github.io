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
// PRODUCT SEARCH
// ==========================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


if(searchButton){

searchButton.addEventListener("click",()=>{

let text = searchInput.value.toLowerCase();

let products = document.querySelectorAll(".product-card");

let found=false;


products.forEach(product=>{

let name = product.querySelector("h3").innerText.toLowerCase();


if(name.includes(text) && text!==""){

product.scrollIntoView({
behavior:"smooth",
block:"center"
});


product.style.border="3px solid #d63384";


setTimeout(()=>{
product.style.border="";
},2000);


found=true;

}

});


if(!found && text!==""){
alert("Product not found ❤️");
}


});

}
