/* ==========================================
   NEHA RANI STUDIO
   CLEAN SCRIPT.JS
   PART 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= HERO SWIPER ================= */

    if (document.querySelector(".heroSwiper")) {

        new Swiper(".heroSwiper", {
            loop: true,

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


    /* ================= CATEGORY SWIPER ================= */

    if (document.querySelector(".categorySwiper")) {

        new Swiper(".categorySwiper", {

            slidesPerView: "auto",
            spaceBetween: 15,
            freeMode: true,

            breakpoints: {

                768: {
                    slidesPerView: 6
                },

                1200: {
                    slidesPerView: 10
                }

            }

        });

    }


    /* ================= SIDEBAR ================= */

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".menu-overlay");

    if (menuBtn && sidebar && overlay) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.add("active");
            overlay.classList.add("active");

        });

        overlay.addEventListener("click", () => {

            sidebar.classList.remove("active");
            overlay.classList.remove("active");

        });

    }


    /* ================= CATEGORY FILTER ================= */

    const categoryLinks = document.querySelectorAll(".sidebar a");
    const products = document.querySelectorAll(".product-item");

    categoryLinks.forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const category = link.dataset.category;

            products.forEach(product => {

                if (
                    category === "all" ||
                    product.dataset.category === category
                ) {

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }

            });

            if (sidebar) sidebar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");

            const section = document.querySelector("#featured-products");

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

    console.log("✅ Part 1 Loaded");

});
/* ================= CART DATA ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartBtn = document.querySelector(".cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");
const checkoutBtn = document.querySelector(".checkout-btn");


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCart() {

    if (cartCount) {
        cartCount.innerText = cart.reduce((total, item) => total + item.qty, 0);
    }

    if (cartItems) {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";

        } else {

            cart.forEach((item, index) => {

                cartItems.innerHTML += `
                <div class="cart-product">

                    <img src="${item.image}" alt="${item.name}">

                    <div>

                        <h4>${item.name}</h4>

                        <p>${item.price}</p>

                        <div class="qty-box">

                            <button class="minus" data-index="${index}">-</button>

                            <span>${item.qty}</span>

                            <button class="plus" data-index="${index}">+</button>

                        </div>

                        <button class="remove-cart" data-index="${index}">
                            Remove
                        </button>

                    </div>

                </div>
                `;

            });

        }

    }

    saveCart();

}


/* ================= ADD TO CART ================= */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", function (e) {

        e.stopPropagation();

        const card = button.closest(".product-card");

        if (!card) return;

        const product = {

            name: card.querySelector("h3").innerText,
            price: card.querySelector(".product-price").innerText,
            image: card.querySelector("img").src,
            qty: 1

        };

        const exist = cart.find(item => item.name === product.name);

        if (exist) {

            exist.qty++;

        } else {

            cart.push(product);

        }

        updateCart();

    });

});


/* ================= CART PANEL ================= */

if (cartBtn && cartPanel) {

    cartBtn.addEventListener("click", () => {

        cartPanel.classList.add("active");
        updateCart();

    });

}

if (closeCart && cartPanel) {

    closeCart.addEventListener("click", () => {

        cartPanel.classList.remove("active");

    });

}


/* ================= CART BUTTONS ================= */

if (cartItems) {

    cartItems.addEventListener("click", (e) => {

        const index = Number(e.target.dataset.index);

        if (e.target.classList.contains("plus")) {

            cart[index].qty++;
            updateCart();

        }

        if (e.target.classList.contains("minus")) {

            if (cart[index].qty > 1) {

                cart[index].qty--;

            }

            updateCart();

        }

        if (e.target.classList.contains("remove-cart")) {

            cart.splice(index, 1);
            updateCart();

        }

    });

}


/* ================= CHECKOUT ================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty 🛒");
            return;

        }

        let message =
`Assalam o Alaikum 🌸

I want to order from Neha Rani Studio:

`;

        cart.forEach((item, index) => {

            message +=
`${index + 1}. 🛍 ${item.name}
Qty: ${item.qty}
Price: ${item.price}

`;

        });

        message += "Please confirm my order 🤍";

        window.open(
            "https://wa.me/923045255325?text=" +
            encodeURIComponent(message),
            "_blank"
        );

    });

}


/* ================= INITIAL LOAD ================= */

updateCart();

console.log("✅ Cart System Loaded");
/* ==========================================
   PART 3
   WISHLIST + SEARCH + TRACK ORDER
========================================== */


/* ================= WISHLIST ================= */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistBtn = document.querySelector(".wishlist-btn");
const wishlistPanel = document.querySelector(".wishlist-panel");
const closeWishlist = document.querySelector(".close-wishlist");
const wishlistItems = document.querySelector(".wishlist-items");


function saveWishlist() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}


function updateWishlist() {

    if (!wishlistItems) return;

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
        "<p>Your wishlist is empty ❤️</p>";

    } else {

        wishlist.forEach((item, index) => {

            wishlistItems.innerHTML += `

            <div class="wishlist-product">

                <span>❤️ ${item.name}</span>

                <button
                    class="remove-wishlist"
                    data-index="${index}">
                    Remove
                </button>

            </div>

            `;

        });

    }

    saveWishlist();

}


/* ================= ADD TO WISHLIST ================= */

document.querySelectorAll(".wishlist-add").forEach(button => {

    button.addEventListener("click", function (e) {

        e.stopPropagation();

        const card = button.closest(".product-card");

        if (!card) return;

        const item = {

            name: card.querySelector("h3").innerText,
            price: card.querySelector(".product-price").innerText,
            image: card.querySelector("img").src

        };

        const exist = wishlist.find(product =>
            product.name === item.name
        );

        if (exist) {

            wishlist = wishlist.filter(product =>
                product.name !== item.name
            );

            button.classList.remove("liked");

        } else {

            wishlist.push(item);

            button.classList.add("liked");

        }

        updateWishlist();

    });

});


/* ================= OPEN WISHLIST ================= */

if (wishlistBtn && wishlistPanel) {

    wishlistBtn.addEventListener("click", () => {

        wishlistPanel.classList.add("active");

        updateWishlist();

    });

}


/* ================= CLOSE WISHLIST ================= */

if (closeWishlist && wishlistPanel) {

    closeWishlist.addEventListener("click", () => {

        wishlistPanel.classList.remove("active");

    });

}


/* ================= REMOVE WISHLIST ================= */

if (wishlistItems) {

    wishlistItems.addEventListener("click", (e) => {

        if (!e.target.classList.contains("remove-wishlist"))
            return;

        const index = Number(e.target.dataset.index);

        wishlist.splice(index, 1);

        updateWishlist();

    });

}


/* ================= SEARCH POPUP ================= */

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


if (searchButton && searchInput) {

    searchButton.addEventListener("click", () => {

        const value =
        searchInput.value.toLowerCase().trim();

        document.querySelectorAll(".product-item")
        .forEach(product => {

            const text =
            product.innerText.toLowerCase();

            product.style.display =
            text.includes(value)
            ? "block"
            : "none";

        });

        if (searchPopup) {

            searchPopup.classList.remove("active");

        }

    });

}


/* ================= TRACK ORDER ================= */

const trackBtn = document.getElementById("trackOrder");
const orderPopup = document.querySelector(".order-popup");
const closeOrder = document.querySelector(".close-order");


if (trackBtn && orderPopup) {

    trackBtn.addEventListener("click", (e) => {

        e.preventDefault();

        orderPopup.classList.add("active");

    });

}


if (closeOrder && orderPopup) {

    closeOrder.addEventListener("click", () => {

        orderPopup.classList.remove("active");

    });

}


/* ================= FLOATING WHATSAPP ================= */

const whatsappBtn =
document.querySelector(".whatsapp-btn");

if (whatsappBtn) {

    whatsappBtn.addEventListener("click", (e) => {

        e.preventDefault();

        window.open(
            "https://wa.me/923045255325",
            "_blank"
        );

    });

}


/* ================= INITIAL LOAD ================= */

updateWishlist();

console.log("✅ Part 3 Loaded");
/* ==========================================
   PART 4
   PRODUCT DETAIL PAGE
========================================== */


/* ================= PRODUCT DATA ================= */

const products = {

    "gift-box": {
        name: "Luxury Gift Box",
        price: "Rs. 2,999",
        images: [
            "images/product1-1.jpg",
            "images/product1-2.jpg",
            "images/product1-3.jpg",
            "images/product1-4.jpg"
        ]
    },

    "hand-bag": {
        name: "Elegant Hand Bag",
        price: "Rs. 3,999",
        images: [
            "images/bags.jpg"
        ]
    },

    "dress-1": {
        name: "Beautiful Dress",
        price: "Rs. 4,999",
        images: [
            "images/dresses.jpg"
        ]
    },

    "perfume": {
        name: "Premium Perfume",
        price: "Rs. 2,499",
        images: [
            "images/perfumes.jpg"
        ]
    },

    "watch": {
        name: "Luxury Jewellery",
        price: "Rs. 5,499",
        images: [
            "images/jewellery.jpg"
        ]
    },

    "shoes": {
        name: "Ladies Shoes",
        price: "Rs. 3,499",
        images: [
            "images/shoes.jpg"
        ]
    }

};


/* ================= LOAD PRODUCT ================= */

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products[productId];

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const mainImage = document.getElementById("mainProductImage");
const thumbnails = document.getElementById("productThumbnails");
const buyBtn = document.getElementById("whatsappBtn");

let currentImage = 0;

if (product && productName && productPrice && mainImage) {

    productName.innerText = product.name;
    productPrice.innerText = product.price;
    mainImage.src = product.images[0];

    /* ---------- Thumbnails ---------- */

    if (thumbnails) {

        thumbnails.innerHTML = "";

        product.images.forEach((img, index) => {

            thumbnails.innerHTML += `
                <img
                    src="${img}"
                    class="thumb"
                    data-index="${index}"
                    style="
                        width:70px;
                        height:70px;
                        object-fit:cover;
                        border-radius:12px;
                        cursor:pointer;
                        margin:5px;
                    ">
            `;

        });

        thumbnails.querySelectorAll(".thumb").forEach(thumb => {

            thumb.addEventListener("click", () => {

                currentImage = Number(thumb.dataset.index);

                mainImage.src = product.images[currentImage];

            });

        });

    }

    /* ---------- Buy Now ---------- */

    if (buyBtn) {

        buyBtn.addEventListener("click", () => {

            const message =
                "Assalam o Alaikum 🌸\n\n" +
                "I want to order:\n\n" +
                product.name +
                "\nPrice: " +
                product.price;

            window.open(
                "https://wa.me/923045255325?text=" +
                encodeURIComponent(message),
                "_blank"
            );

        });

    }

}


/* ================= IMAGE SLIDER ================= */

window.nextImage = function () {

    if (!product) return;

    currentImage++;

    if (currentImage >= product.images.length) {

        currentImage = 0;

    }

    mainImage.src = product.images[currentImage];

};


window.prevImage = function () {

    if (!product) return;

    currentImage--;

    if (currentImage < 0) {

        currentImage = product.images.length - 1;

    }

    mainImage.src = product.images[currentImage];

};


console.log("✅ Part 4 Loaded");
/* ==========================================
   PART 5
   PRODUCT DETAIL ACTIONS
========================================== */


/* ================= PRODUCT CARD OPEN ================= */

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", (e) => {

        // Agar button par click hua ho to page open na ho
        if (
            e.target.closest(".add-cart") ||
            e.target.closest(".wishlist-add")
        ) {
            return;
        }

        const id = card.dataset.id;

        if (id) {
            window.location.href = "product.html?id=" + id;
        }

    });

});


/* ================= DETAIL ADD TO CART ================= */

const detailAddCart = document.getElementById("detailAddCart");

if (detailAddCart) {

    detailAddCart.addEventListener("click", () => {

        const product = {

            name: document.getElementById("productName").innerText,
            price: document.getElementById("productPrice").innerText,
            image: document.getElementById("mainProductImage").src,
            qty: 1

        };

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const exist = cart.find(item =>
            item.name === product.name
        );

        if (exist) {

            exist.qty++;

        } else {

            cart.push(product);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        // Cart Count Update
        const count = document.querySelector(".cart-count");

        if (count) {

            count.innerText = cart.reduce(
                (total, item) => total + item.qty,
                0
            );

        }

        alert("Added To Cart 🛒");

    });

}


/* ================= DETAIL WISHLIST ================= */

const detailWishlist =
document.getElementById("detailWishlist");

if (detailWishlist) {

    // Page load par heart active dikhao
    const currentName =
        document.getElementById("productName")?.innerText;

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    if (
        currentName &&
        wishlist.find(item => item.name === currentName)
    ) {
        detailWishlist.classList.add("liked");
    }

    detailWishlist.addEventListener("click", () => {

        const product = {

            name: document.getElementById("productName").innerText,
            price: document.getElementById("productPrice").innerText,
            image: document.getElementById("mainProductImage").src

        };

        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        const index = wishlist.findIndex(
            item => item.name === product.name
        );

        if (index > -1) {

            wishlist.splice(index, 1);

            detailWishlist.classList.remove("liked");

            alert("Removed From Wishlist 💔");

        } else {

            wishlist.push(product);

            detailWishlist.classList.add("liked");

            alert("Added To Wishlist ❤️");

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    });

}


/* ================= RELATED PRODUCTS ================= */

document.querySelectorAll(".related-card a").forEach(link => {

    link.addEventListener("click", () => {

        // Optional:
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


console.log("✅ Part 5 Loaded");
/* ==========================================
   PART 6
   FINAL UTILITIES & CLEANUP
========================================== */


/* ================= BACK TO TOP ================= */

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

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


/* ================= VIEW ALL PRODUCTS ================= */

const viewAll = document.getElementById("viewAllProducts");

if (viewAll) {

    viewAll.addEventListener("click", (e) => {

        e.preventDefault();

        document.querySelectorAll(".product-item").forEach(product => {

            product.style.display = "block";

        });

        const section = document.getElementById("featured-products");

        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* ================= FLOATING WHATSAPP ================= */

const floatingWhatsapp = document.querySelector(".whatsapp-btn");

if (floatingWhatsapp) {

    floatingWhatsapp.addEventListener("click", (e) => {

        // Agar anchor me target="_blank" already hai to browser ka default behavior use hone do.
        // Agar tum JS se hi open karna chahte ho to niche wali lines uncomment kar sakte ho.

        /*
        e.preventDefault();

        window.open(
            "https://wa.me/923045255325",
            "_blank"
        );
        */

    });

}


/* ================= PAGE LOADING ================= */

window.addEventListener("load", () => {

    console.log("Page Loaded Successfully ✅");

});


/* ================= FINAL INITIALIZATION ================= */

// In functions ko sirf tab call karo jab ye exist karti hon.
if (typeof updateCart === "function") {
    updateCart();
}

if (typeof updateWishlist === "function") {
    updateWishlist();
}


/* ================= FINISHED ================= */

console.log("==================================");
console.log(" Neha Rani Studio Ready ❤️");
console.log(" Script Loaded Successfully ✅");
console.log("==================================");
