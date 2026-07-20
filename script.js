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

    document.querySelectorAll(".product-item").forEach(product => {
        product.style.display = "block";
    });

    alert("No matching product found.");

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

const viewAll = document.getElementById("viewAllProducts");

if (viewAll) {

    viewAll.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelectorAll(".product-item").forEach(product=>{
            product.style.display = "block";
        });

        document.getElementById("featured").scrollIntoView({
            behavior:"smooth"
        });

    });

}

// ==========================
// CHECKOUT
// ==========================

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function(e){

        e.preventDefault();

        if(cart.length === 0){

            alert("Your cart is empty 🛍️");
            return;

        }

        window.open("https://wa.me/923045255325", "_blank");

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
// ==========================
// PRODUCT POPUP
// ==========================

const popup = document.querySelector(".product-popup");
const popupImg = document.getElementById("popupImage");
const popupTitle = document.getElementById("popupTitle");
const popupPrice = document.getElementById("popupPrice");
const popupWhatsapp = document.getElementById("popupWhatsapp");
const popupCart = document.querySelector(".popup-cart");
let images = [];
let currentImage = 0;

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", function(e){

        if(
            e.target.closest(".add-cart") ||
            e.target.closest(".wishlist-add")
        ){
            return;
        }

       images = card.dataset.images.split(",");
currentImage = 0;
popupImg.src = images[currentImage];
        popupTitle.innerText = card.querySelector("h3").innerText;
        popupPrice.innerText = card.querySelector(".product-price").innerText;

        popupWhatsapp.href =
        "https://wa.me/923045255325?text=" +
        encodeURIComponent(
            "Hi! I'm interested in buying " +
            card.querySelector("h3").innerText
        );

        popup.classList.add("active");

    });

});


const closeBtn = document.querySelector(".close-product");

if(closeBtn){
    closeBtn.onclick = function(){
        popup.classList.remove("active");
    };
}

popup.onclick = function(e){
    if(e.target === popup){
        popup.classList.remove("active");
    }
};

document.querySelectorAll('a[href="#contact"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });

    });

});
const categoryLinks = document.querySelectorAll(".sidebar a");
const products = document.querySelectorAll(".product-item");

categoryLinks.forEach(link => {

    link.onclick = function(e){

        e.preventDefault();

        let category = this.getAttribute("href").replace("#","");

        products.forEach(product=>{

            if(product.dataset.category === category){
                product.style.display = "block";
            }else{
                product.style.display = "none";
            }

        });

        document.getElementById("featured").scrollIntoView({
            behavior:"smooth"
        });

    }

});
// ==========================
// POPUP ADD TO CART
// ==========================

let currentProduct = null;

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", function(e){

        if(e.target.closest(".add-cart") || e.target.closest(".wishlist-add")){
            return;
        }

        currentProduct = {
            name: card.querySelector("h3").innerText,
            price: card.querySelector(".product-price").innerText,
            image: card.querySelector("img").src
        };

    });

});

const popupAddCart = document.getElementById("popupAddCart");

if(popupAddCart){

    popupAddCart.addEventListener("click", function(){

        if(!currentProduct) return;

        cart.push(currentProduct);

        cartCount.textContent = cart.length;

        renderCart();

        popup.classList.remove("active");

        alert("Added to Cart ✅");

    });

}
if (popupCart) {

    popupCart.addEventListener("click", () => {

        cart.push({

            name: popupTitle.innerText,
            price: popupPrice.innerText,
            image: popupImg.src

        });

        cartCount.textContent = cart.length;

        renderCart();

        popup.classList.remove("active");

    });

}
const nextBtn = document.querySelector(".next-img");
const prevBtn = document.querySelector(".prev-img");

nextBtn.onclick = function () {

    if (images.length === 0) return;

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    popupImg.src = images[currentImage];

};

prevBtn.onclick = function () {

    if (images.length === 0) return;

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    popupImg.src = images[currentImage];

};
