/* ==========================================
   NEHA RANI STUDIO
   FINAL SCRIPT.JS
========================================== */


/* ================= SWIPER ================= */

new Swiper(".heroSwiper", {

    loop:true,

    autoplay:{
        delay:4000,
        disableOnInteraction:false
    },

    pagination:{
        el:".swiper-pagination",
        clickable:true
    },

    speed:800

});



new Swiper(".categorySwiper", {

    slidesPerView:4,

    spaceBetween:25,

    loop:true,

    autoplay:{
        delay:2500
    },


    breakpoints:{

        320:{
            slidesPerView:1.5
        },

        576:{
            slidesPerView:2
        },

        768:{
            slidesPerView:3
        },

        992:{
            slidesPerView:4
        }

    }

});




/* ================= SIDEBAR ================= */


const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");


if(menuIcon){

menuIcon.onclick = ()=>{

    sidebar.classList.add("active");
    overlay.classList.add("active");

}

}


if(overlay){

overlay.onclick = ()=>{

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

}

}





/* ================= SEARCH POPUP ================= */


const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");


if(searchBtn){

searchBtn.onclick = ()=>{

searchPopup.classList.add("active");

}

}



if(closeSearch){

closeSearch.onclick = ()=>{

searchPopup.classList.remove("active");

}

}




/* ================= CART ================= */


let cart=[];


const cartCount=document.querySelector(".cart-count");
const cartPanel=document.querySelector(".cart-panel");
const cartBtn=document.querySelector(".cart-btn");
const closeCart=document.querySelector(".close-cart");
const cartItems=document.querySelector(".cart-items");



document.querySelectorAll(".add-cart").forEach(button=>{


button.onclick=function(){


let card=this.closest(".product-card");


let product={

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText,

image:card.querySelector("img").src

};



cart.push(product);


updateCart();


alert("Product Added To Cart ❤️");


}


});



function updateCart(){


cartCount.innerText=cart.length;


cartItems.innerHTML="";


cart.forEach(item=>{


cartItems.innerHTML += `

<div class="cart-product">

<img src="${item.image}" width="60">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

`;


});


}





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







/* ================= WISHLIST ================= */


let wishlist=[];


const wishlistPanel=document.querySelector(".wishlist-panel");
const wishlistBtn=document.querySelector(".wishlist-btn");
const closeWishlist=document.querySelector(".close-wishlist");
const wishlistItems=document.querySelector(".wishlist-items");



document.querySelectorAll(".wishlist-add").forEach(btn=>{


btn.onclick=function(){


let card=this.closest(".product-card");


let item={

name:card.querySelector("h3").innerText,

image:card.querySelector("img").src

};



wishlist.push(item);


showWishlist();


alert("Added To Wishlist ❤️");


}


});



function showWishlist(){


wishlistItems.innerHTML="";


wishlist.forEach(item=>{


wishlistItems.innerHTML +=`

<div>

<img src="${item.image}" width="70">

<h4>${item.name}</h4>

</div>


`;

});


}




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







/* ================= TRACK ORDER ================= */


const trackOrder=document.getElementById("trackOrder");
const orderPopup=document.querySelector(".order-popup");
const closeOrder=document.querySelector(".close-order");



if(trackOrder){

trackOrder.onclick=(e)=>{

e.preventDefault();

orderPopup.classList.add("active");

}

}




if(closeOrder){

closeOrder.onclick=()=>{

orderPopup.classList.remove("active");

}

}







/* ================= BACK TO TOP ================= */


const topBtn=document.getElementById("topBtn");


window.onscroll=function(){


if(window.scrollY>400){

topBtn.style.display="flex";

}

else{

topBtn.style.display="none";

}


};



if(topBtn){

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}

}







/* ================= PRODUCT DATA ================= */


const products={


"gift-box":{

name:"Luxury Gift Box",

price:"Rs. 2,999",

images:[

"images/products/product1-1.jpg",

"images/products/product1-2.jpg",

"images/products/product1-3.jpg",

"images/products/product1-4.jpg"

]

},



"bag-1":{

name:"Elegant Hand Bag",

price:"Rs. 3,999",

images:[

"images/products/product2.jpg",

"images/products/product2-2.jpg"

]

},



"dress-1":{

name:"Beautiful Dress",

price:"Rs. 4,999",

images:[

"images/products/product3.jpg",

"images/products/product3-2.jpg"

]

},



"perfume-1":{

name:"Premium Perfume",

price:"Rs. 2,499",

images:[

"images/products/product4.jpg",

"images/products/product4-2.jpg"

]

}


};






/* ================= PRODUCT DETAIL PAGE ================= */


let urlParams=new URLSearchParams(window.location.search);

let id=urlParams.get("id");


let currentProduct=products[id];

let currentImage=0;



if(currentProduct){


let name=document.getElementById("productName");

let price=document.getElementById("productPrice");

let image=document.getElementById("mainProductImage");

let whatsapp=document.getElementById("whatsappBtn");



if(name){

name.innerText=currentProduct.name;

}


if(price){

price.innerText=currentProduct.price;

}



if(image){

image.src=currentProduct.images[0];

}




if(whatsapp){

whatsapp.href=

"https://wa.me/923045255325?text=I want to order "+currentProduct.name;

}


}






function nextImage(){


if(!currentProduct)return;


currentImage++;


if(currentImage>=currentProduct.images.length){

currentImage=0;

}


document.getElementById("mainProductImage").src=

currentProduct.images[currentImage];


}





function prevImage(){


if(!currentProduct)return;


currentImage--;


if(currentImage<0){

currentImage=currentProduct.images.length-1;

}


document.getElementById("mainProductImage").src=

currentProduct.images[currentImage];


}







/* ================= SEARCH ================= */


const searchInput=document.getElementById("searchInput");


const searchButton=document.getElementById("searchButton");



if(searchButton){


searchButton.onclick=function(){


let value=searchInput.value.toLowerCase();



document.querySelectorAll(".product-item").forEach(product=>{


let text=product.innerText.toLowerCase();



if(text.includes(value)){


product.style.display="block";


}

else{


product.style.display="none";


}



});


searchPopup.classList.remove("active");


}



}




/* ================= END ================= */
