/* ==========================================
   NEHA RANI STUDIO
   COMPLETE JAVASCRIPT
========================================== */


/* ================= SWIPER ================= */

if(document.querySelector(".heroSwiper")){

new Swiper(".heroSwiper",{

loop:true,

autoplay:{
delay:3500,
disableOnInteraction:false
},

pagination:{
el:".swiper-pagination",
clickable:true
}

});

}



if(document.querySelector(".categorySwiper")){

new Swiper(".categorySwiper",{

slidesPerView:4,

spaceBetween:25,

breakpoints:{

320:{
slidesPerView:2
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

}




/* ================= SIDEBAR ================= */

const menuIcon=document.querySelector(".menu-icon");
const sidebar=document.querySelector(".sidebar");
const overlay=document.querySelector(".menu-overlay");


if(menuIcon){

menuIcon.onclick=()=>{

sidebar.classList.add("active");
overlay.classList.add("active");

}

}



if(overlay){

overlay.onclick=()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

}

}




/* ================= SEARCH ================= */


const searchBtn=document.querySelector(".search-btn");
const searchPopup=document.querySelector(".search-popup");
const closeSearch=document.querySelector(".close-search");


if(searchBtn){

searchBtn.onclick=()=>{

searchPopup.classList.add("active");

}

}



if(closeSearch){

closeSearch.onclick=()=>{

searchPopup.classList.remove("active");

}

}




/* ================= PRODUCT DATA ================= */


const productLinks={

"gift-box":"gift-box",

"bag-1":"hand-bag",

"dress-1":"dress-1",

"perfume-1":"perfume",

"jewelry-1":"watch",

"shoes-1":"shoes"

};



/* ================= OPEN PRODUCT ================= */


document.querySelectorAll(".product-card").forEach(card=>{


card.addEventListener("click",(e)=>{


if(e.target.classList.contains("add-cart")) return;

if(e.target.closest(".wishlist-add")) return;


let id=card.dataset.id;


if(productLinks[id]){

window.location.href="product.html?id="+productLinks[id];

}


});


});





/* ================= CATEGORY FILTER ================= */


document.querySelectorAll(".category-card").forEach(category=>{


category.onclick=()=>{


let categoryId=category.id;


let products=document.querySelectorAll(".product-item");


products.forEach(product=>{


if(product.dataset.category===categoryId){


product.style.display="block";


}else{


product.style.display="none";


}


});



document.querySelector("#featured").scrollIntoView({

behavior:"smooth"

});


}



});





/* ================= VIEW ALL PRODUCTS ================= */


const viewAll=document.querySelector("#viewAllProducts");


if(viewAll){


viewAll.onclick=(e)=>{

e.preventDefault();


document.querySelectorAll(".product-item").forEach(item=>{

item.style.display="block";

});


document.querySelector("#featured").scrollIntoView({

behavior:"smooth"

});


}


}






/* ================= CART ================= */


let cart=[];


const cartCount=document.querySelector(".cart-count");

const cartPanel=document.querySelector(".cart-panel");

const cartItems=document.querySelector(".cart-items");

const cartBtn=document.querySelector(".cart-btn");

const closeCart=document.querySelector(".close-cart");



document.querySelectorAll(".add-cart").forEach(btn=>{


btn.onclick=(e)=>{


e.stopPropagation();


let card=btn.closest(".product-card");


let name=card.querySelector("h3").innerText;


let price=card.querySelector(".product-price").innerText;



cart.push({

name:name,
price:price

});


updateCart();


alert(name+" Added To Cart");


}



});





function updateCart(){


cartCount.innerText=cart.length;


cartItems.innerHTML="";


cart.forEach(item=>{


let div=document.createElement("div");


div.innerHTML=`

<p>${item.name}</p>

<span>${item.price}</span>

<hr>

`;


cartItems.appendChild(div);


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

const wishlistItems=document.querySelector(".wishlist-items");

const wishlistBtn=document.querySelector(".wishlist-btn");

const closeWishlist=document.querySelector(".close-wishlist");




document.querySelectorAll(".wishlist-add").forEach(btn=>{


btn.onclick=(e)=>{


e.stopPropagation();


let card=btn.closest(".product-card");


let name=card.querySelector("h3").innerText;


wishlist.push(name);


wishlistItems.innerHTML="";


wishlist.forEach(item=>{


wishlistItems.innerHTML+=`

<p>❤️ ${item}</p>

`;

});


alert("Added To Wishlist");


}


});





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


const trackBtn=document.querySelector("#trackOrder");

const orderPopup=document.querySelector(".order-popup");

const closeOrder=document.querySelector(".close-order");



if(trackBtn){


trackBtn.onclick=(e)=>{


e.preventDefault();


orderPopup.classList.add("active");


}

}



if(closeOrder){


closeOrder.onclick=()=>{


orderPopup.classList.remove("active");


}

}







/* ================= SEARCH PRODUCTS ================= */


const searchInput=document.querySelector("#searchInput");

const searchButton=document.querySelector("#searchButton");



if(searchButton){


searchButton.onclick=()=>{


let value=searchInput.value.toLowerCase();


document.querySelectorAll(".product-item").forEach(product=>{


let name=product.innerText.toLowerCase();



if(name.includes(value)){


product.style.display="block";


}else{


product.style.display="none";


}


});



searchPopup.classList.remove("active");


document.querySelector("#featured").scrollIntoView({

behavior:"smooth"

});


}


}





/* ================= BACK TO TOP ================= */


const topBtn=document.querySelector("#topBtn");


window.onscroll=()=>{


if(window.scrollY>300){


topBtn.style.display="flex";


}else{


topBtn.style.display="none";


}


}




if(topBtn){


topBtn.onclick=()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


}

}




/* ================= PRODUCT PAGE ================= */


let params=new URLSearchParams(window.location.search);


let productId=params.get("id");



const products={


"gift-box":{

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


"hand-bag":{

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

"images/products/product3.jpg"

]

},


"perfume":{

name:"Premium Perfume",

price:"Rs. 2,499",

images:[

"images/products/product4.jpg"

]

},


"watch":{

name:"Luxury Watch",

price:"Rs. 5,499",

images:[

"images/products/product5.jpg"

]

},


"shoes":{

name:"Ladies Shoes",

price:"Rs. 3,499",

images:[

"images/products/product6.jpg"

]

}


};




let currentImage=0;


if(productId && products[productId]){


let product=products[productId];


let name=document.querySelector("#productName");

let price=document.querySelector("#productPrice");

let image=document.querySelector("#mainProductImage");


if(name){

name.innerText=product.name;

price.innerText=product.price;

image.src=product.images[0];

}



window.nextImage=()=>{


currentImage++;


if(currentImage>=product.images.length){

currentImage=0;

}


image.src=product.images[currentImage];


}




window.prevImage=()=>{


currentImage--;


if(currentImage<0){

currentImage=product.images.length-1;

}


image.src=product.images[currentImage];


}




let whatsapp=document.querySelector("#whatsappBtn");


if(whatsapp){


whatsapp.href=

"https://wa.me/923045255325?text=I want to order "+product.name;


}


}
