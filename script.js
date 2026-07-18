// ==========================
// MENU SIDEBAR
// ==========================

const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");


if(menuIcon && sidebar && overlay){

menuIcon.addEventListener("click",()=>{

sidebar.classList.add("active");
overlay.classList.add("active");

});


overlay.addEventListener("click",()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

});


}



document.querySelectorAll(".sidebar a").forEach(link=>{

link.addEventListener("click",()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

});

});




// ==========================
// HERO SLIDER
// ==========================

if(document.querySelector(".heroSwiper")){

new Swiper(".heroSwiper",{

loop:true,

speed:900,

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





// ==========================
// CATEGORY SLIDER
// ==========================


if(document.querySelector(".categorySwiper")){

new Swiper(".categorySwiper",{

loop:true,

spaceBetween:25,


breakpoints:{

0:{
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
},

1200:{
slidesPerView:5
}


}


});


}




// ==========================
// PRODUCT SLIDER
// ==========================


if(document.querySelector(".productSwiper")){


new Swiper(".productSwiper",{


loop:true,

spaceBetween:25,


breakpoints:{


0:{
slidesPerView:1
},


576:{
slidesPerView:2
},


992:{
slidesPerView:3
},


1200:{
slidesPerView:4
}


}



});


}




// ==========================
// BACK TO TOP BUTTON
// ==========================


const topBtn=document.getElementById("topBtn");


if(topBtn){


window.addEventListener("scroll",()=>{


if(window.scrollY>400){

topBtn.style.display="flex";

}

else{

topBtn.style.display="none";

}


});



topBtn.onclick=()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


};


}






// ==========================
// SEARCH POPUP
// ==========================


const searchBtn=document.querySelector(".search-btn");
const searchPopup=document.querySelector(".search-popup");
const closeSearch=document.querySelector(".close-search");



if(searchBtn && searchPopup){


searchBtn.onclick=()=>{

searchPopup.classList.add("active");

};


}



if(closeSearch){


closeSearch.onclick=()=>{

searchPopup.classList.remove("active");

};


}





// ==========================
// SEARCH PRODUCT
// ==========================


const searchButton=document.getElementById("searchButton");
const searchInput=document.getElementById("searchInput");



if(searchButton){


searchButton.onclick=()=>{


let value=searchInput.value.toLowerCase().trim();


let products=document.querySelectorAll(".product-card");


let found=false;



products.forEach(product=>{
  

let name = product.querySelector(".product-info h3").textContent.toLowerCase().trim();



if(name.includes(value) && value!==""){


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



if(!found && value!==""){

alert("Product not found ❤️");

}



};



}
// ==========================
// CART SYSTEM
// ==========================

let cart = [];

const cartBtn = document.querySelector(".cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");


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


displayCart();


});

});



// SHOW CART

function displayCart(){

cartItems.innerHTML="";


cart.forEach(item=>{


cartItems.innerHTML += `

<div class="cart-product">

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

</div>

`;

});


}




// OPEN CART

if(cartBtn){

cartBtn.onclick=()=>{

cartPanel.classList.add("active");

};

}



// CLOSE CART

if(closeCart){

closeCart.onclick=()=>{

cartPanel.classList.remove("active");

};

}



// ==========================
// WISHLIST SYSTEM
// ==========================


let wishlist=[];


const wishlistBtn=document.querySelector(".wishlist-btn");

const wishlistPanel=document.querySelector(".wishlist-panel");

const wishlistItems=document.querySelector(".wishlist-items");

const closeWishlist=document.querySelector(".close-wishlist");



// ADD WISHLIST


document.querySelectorAll(".wishlist-add").forEach(button=>{


button.addEventListener("click",function(){


let card=this.closest(".product-card");


let product={

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText,

image:card.querySelector("img").src

};


wishlist.push(product);


displayWishlist();


});


});




// SHOW WISHLIST


function displayWishlist(){


wishlistItems.innerHTML="";


wishlist.forEach(item=>{


wishlistItems.innerHTML +=`

<div class="wish-product">


<img src="${item.image}">


<div>

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>


</div>


`;


});


}




// OPEN WISHLIST


if(wishlistBtn){

wishlistBtn.onclick=()=>{

wishlistPanel.classList.add("active");

};

}



// CLOSE WISHLIST


if(closeWishlist){

closeWishlist.onclick=()=>{

wishlistPanel.classList.remove("active");

};

}
// ==========================
// TRACK ORDER POPUP
// ==========================

const trackOrder = document.querySelector(".top-right a:first-child");

const orderPopup = document.querySelector(".order-popup");

const closeOrder = document.querySelector(".close-order");


if(trackOrder && orderPopup){

trackOrder.onclick = (e)=>{

e.preventDefault();

orderPopup.classList.add("active");

};

}



if(closeOrder && orderPopup){

closeOrder.onclick = ()=>{

orderPopup.classList.remove("active");

};

}




// ==========================
// CONTACT BUTTON SCROLL
// ==========================


const contactLink = document.querySelector(".top-right a:nth-of-type(2)");


if(contactLink){


contactLink.onclick = (e)=>{


e.preventDefault();


document.querySelector("#contact").scrollIntoView({

behavior:"smooth"

});


};


}





// ==========================
// MAIN NAV CONTACT FIX
// ==========================


document.querySelectorAll('a[href="#contact"]').forEach(link=>{


link.onclick=(e)=>{


e.preventDefault();


document.querySelector("#contact").scrollIntoView({

behavior:"smooth"

});


};


});




// ==========================
// VIEW ALL BUTTON
// ==========================


document.querySelectorAll(".section-heading a").forEach(button=>{


button.onclick=(e)=>{


e.preventDefault();



let section = button.closest("section");



if(section.classList.contains("featured-products")){


alert("More products will be added soon ❤️");


}


else if(section.classList.contains("category-section")){


alert("All categories coming soon ❤️");


}


else if(section.classList.contains("reviews")){


alert("More reviews coming soon ❤️");


}



};


});




// ==========================
// CHECKOUT BUTTON
// ==========================


const checkoutBtn = document.querySelector(".checkout-btn");


if(checkoutBtn){


checkoutBtn.onclick=(e)=>{


e.preventDefault();



if(cart.length===0){


alert("Your cart is empty 🛍️");


return;


}



alert("Thank you for your order ❤️ Checkout system coming soon");


};


}




// ==========================
// CLOSE PANELS OUTSIDE CLICK
// ==========================


document.addEventListener("click",(e)=>{


if(e.target.classList.contains("cart-panel")){


cartPanel.classList.remove("active");


}



if(e.target.classList.contains("wishlist-panel")){


wishlistPanel.classList.remove("active");


}



});




// ==========================
// WEBSITE READY
// ==========================

console.log("Neha Rani Studio Website Ready ❤️");
