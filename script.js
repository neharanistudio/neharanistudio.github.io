/* ==========================================
   NEHA RANI STUDIO
   SCRIPT.JS
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

            slidesPerView: 4,

            spaceBetween: 20,

            breakpoints: {

                320: {
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
                }

            }

        });

    }


    /* ================= SIDEBAR ================= */

    const menuBtn = document.querySelector(".menu-icon");
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


    /* ================= SEARCH POPUP ================= */

    const searchBtn = document.querySelector(".search-btn");
    const searchPopup = document.querySelector(".search-popup");
    const closeSearch = document.querySelector(".close-search");

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            searchPopup.classList.add("active");

        });

    }

    if (closeSearch) {

        closeSearch.addEventListener("click", () => {

            searchPopup.classList.remove("active");

        });

    }


    /* ================= PRODUCT LINKS ================= */

    const productLinks = {

        "gift-box": "gift-box",

        "bag-1": "hand-bag",

        "dress-1": "dress-1",

        "perfume-1": "perfume",

        "jewelry-1": "watch",

        "shoes-1": "shoes"

    };


    /* ================= PRODUCT OPEN ================= */

    document.querySelectorAll(".product-card").forEach(card => {

        card.addEventListener("click", (e) => {

            if (e.target.closest(".add-cart")) return;

            if (e.target.closest(".wishlist-add")) return;

            const id = card.dataset.id;

            if (productLinks[id]) {

                window.location.href =
                    "product.html?id=" + productLinks[id];

            }

        });

    });


    /* ================= CATEGORY FILTER ================= */

    document.querySelectorAll(".category-card").forEach(category => {

        category.addEventListener("click", () => {

            const id = category.id;

            document.querySelectorAll(".product-item").forEach(product => {

                if (product.dataset.category === id) {

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }

            });

            document.querySelector(".featured-products")
                .scrollIntoView({

                    behavior: "smooth"

                });

        });

    });


    /* ================= VIEW ALL ================= */

    const viewAll = document.querySelector("#viewAllProducts");

    if (viewAll) {

        viewAll.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelectorAll(".product-item")
                .forEach(product => {

                    product.style.display = "block";

                });

            document.querySelector(".featured-products")
                .scrollIntoView({

                    behavior: "smooth"

                });

        });

    }
       /* ================= CART ================= */

    let cart = [];

    const cartBtn = document.querySelector(".cart-btn");
    const cartPanel = document.querySelector(".cart-panel");
    const closeCart = document.querySelector(".close-cart");
    const cartItems = document.querySelector(".cart-items");
    const cartCount = document.querySelector(".cart-count");

    function updateCart() {

        if (cartCount) {
            cartCount.innerText = cart.length;
        }

        if (cartItems) {

            cartItems.innerHTML = "";

            cart.forEach(item => {

                cartItems.innerHTML += `
                <div class="cart-product">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                `;

            });

        }

    }

    document.querySelectorAll(".add-cart").forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const card = btn.closest(".product-card");

            if (!card) return;

            cart.push({

                name: card.querySelector("h3").innerText,
                price: card.querySelector(".product-price").innerText

            });

            updateCart();

        });

    });

    if (cartBtn && cartPanel) {

        cartBtn.addEventListener("click", () => {

            cartPanel.classList.add("active");

        });

    }

    if (closeCart) {

        closeCart.addEventListener("click", () => {

            cartPanel.classList.remove("active");

        });

    }


    /* ================= WISHLIST ================= */

    let wishlist = [];

    const wishlistBtn = document.querySelector(".wishlist-btn");
    const wishlistPanel = document.querySelector(".wishlist-panel");
    const closeWishlist = document.querySelector(".close-wishlist");
    const wishlistItems = document.querySelector(".wishlist-items");

    function updateWishlist() {

        if (!wishlistItems) return;

        wishlistItems.innerHTML = "";

        wishlist.forEach(item => {

            wishlistItems.innerHTML += `
            <div class="wishlist-product">
                ❤️ ${item}
            </div>
            `;

        });

    }

    document.querySelectorAll(".wishlist-add").forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const card = btn.closest(".product-card");

            if (!card) return;

            wishlist.push(card.querySelector("h3").innerText);

            updateWishlist();

        });

    });

    if (wishlistBtn && wishlistPanel) {

        wishlistBtn.addEventListener("click", () => {

            wishlistPanel.classList.add("active");

        });

    }

    if (closeWishlist) {

        closeWishlist.addEventListener("click", () => {

            wishlistPanel.classList.remove("active");

        });

    }


    /* ================= TRACK ORDER ================= */

    const trackBtn = document.querySelector("#trackOrder");
    const orderPopup = document.querySelector(".order-popup");
    const closeOrder = document.querySelector(".close-order");

    if (trackBtn && orderPopup) {

        trackBtn.addEventListener("click", (e) => {

            e.preventDefault();

            orderPopup.classList.add("active");

        });

    }

    if (closeOrder) {

        closeOrder.addEventListener("click", () => {

            orderPopup.classList.remove("active");

        });

    }
       /* ================= SEARCH PRODUCTS ================= */

    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");


    if (searchButton) {

        searchButton.addEventListener("click", () => {


            let value = searchInput.value.toLowerCase();


            document.querySelectorAll(".product-item")
            .forEach(product => {


                let name = product.innerText.toLowerCase();


                if (name.includes(value)) {

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }


            });


            if (searchPopup) {

                searchPopup.classList.remove("active");

            }


            const featured = document.querySelector(".featured-products");


            if (featured) {

                featured.scrollIntoView({

                    behavior:"smooth"

                });

            }


        });

    }




    /* ================= BACK TO TOP ================= */


    const topBtn = document.querySelector("#topBtn");


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

                top:0,

                behavior:"smooth"

            });


        });


    }





    /* ================= WHATSAPP ================= */


    const whatsappBtn = document.querySelector(".whatsapp-btn");


    if (whatsappBtn) {


        whatsappBtn.addEventListener("click", () => {


            window.open(

                "https://wa.me/923045255325",

                "_blank"

            );


        });


    }





    /* ================= PRODUCT PAGE ================= */


    const params = new URLSearchParams(window.location.search);


    const productId = params.get("id");



    const products = {


        "gift-box": {

            name:"Luxury Gift Box",

            price:"Rs. 2,999",

            images:[

                "images/products/product1.jpg",

                "images/products/product1-1.jpg",

                "images/products/product1-2.jpg",

                "images/products/product1-3.jpg",

                "images/products/product1-4.jpg"

            ]

        },


        "hand-bag": {

            name:"Elegant Hand Bag",

            price:"Rs. 3,999",

            images:[

                "images/products/product2.jpg",

                "images/products/product2-2.jpg",

                "images/products/product2-3.jpg"

            ]

        },


        "dress-1": {

            name:"Beautiful Dress",

            price:"Rs. 4,999",

            images:[

                "images/products/product3.jpg"

            ]

        },


        "perfume": {

            name:"Premium Perfume",

            price:"Rs. 2,499",

            images:[

                "images/products/product4.jpg"

            ]

        },


        "watch": {

            name:"Luxury Watch",

            price:"Rs. 5,499",

            images:[

                "images/products/product5.jpg"

            ]

        },


        "shoes": {

            name:"Ladies Shoes",

            price:"Rs. 3,499",

            images:[

                "images/products/product6.jpg"

            ]

        }


    };



    let currentImage = 0;



    if(productId && products[productId]){


        let product = products[productId];



        const nameBox = document.querySelector("#productName");

        const priceBox = document.querySelector("#productPrice");

        const mainImage = document.querySelector("#mainProductImage");



        if(nameBox){

            nameBox.innerText = product.name;

        }


        if(priceBox){

            priceBox.innerText = product.price;

        }


        if(mainImage){

            mainImage.src = product.images[0];

        }




        window.nextImage = function(){


            currentImage++;


            if(currentImage >= product.images.length){

                currentImage = 0;

            }


            mainImage.src = product.images[currentImage];


        };



        window.prevImage = function(){


            currentImage--;


            if(currentImage < 0){

                currentImage = product.images.length - 1;

            }


            mainImage.src = product.images[currentImage];

/* PRODUCT PAGE WISHLIST BUTTON */

const detailWishlist = document.querySelector("#detailWishlist");

if(detailWishlist){

    detailWishlist.addEventListener("click", function(){

        this.classList.toggle("active");

        if(this.classList.contains("active")){

            this.innerHTML = "♥";

        }else{

            this.innerHTML = "♡";

        }

    });

}
