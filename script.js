// ==========================
// MENU
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


// Close sidebar after click

document.querySelectorAll(".sidebar a").forEach(link=>{

link.addEventListener("click",()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

});

});




// ==========================
// HERO SLIDER
// ==========================

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




// ==========================
// CATEGORY SLIDER
// ==========================

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




// ==========================
// PRODUCT SLIDER
// ==========================

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




// ==========================
// BACK TO TOP
// ==========================


const topBtn=document.getElementById("topBtn");


window.addEventListener("scroll",()=>{


if(window.scrollY>400){

topBtn.style.display="flex";

}

else{

topBtn.style.display="none";

}


});


if(topBtn){

topBtn.onclick=()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


};


}
// ==========================
// SEARCH POPUP + SEARCH PRODUCT
// ==========================

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");


if(searchBtn){

searchBtn.onclick=()=>{

searchPopup.classList.add("active");

};

}


if(closeSearch){

closeSearch.onclick=()=>{

searchPopup.classList.remove("active");

};

}



if(searchButton){

searchButton.onclick=()=>{


let value = searchInput.value.toLowerCase().trim();

let products=document.querySelectorAll(".product-card");

let found=false;



products.forEach(product=>{


let name=product.querySelector("h3").innerText.toLowerCase();



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


let cart=[];

const cartCount=document.querySelector(".cart-count");
const cartPanel=document.querySelector(".cart-panel");
const cartItems=document.querySelector(".cart-items");
const cartBtn=document.querySelector(".cart-btn");
const closeCart=document.querySelector(".close-cart");



document.querySelectorAll(".add-cart").forEach(button=>{


button.onclick=()=>{


let card=button.closest(".product-card");


let product={

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText,

image:card.querySelector("img").src

};



cart.push(product);



cartCount.innerText=cart.length;


showCart();


};


});



function showCart(){


cartItems.innerHTML="";


cart.forEach(item=>{


cartItems.innerHTML +=`


<div class="cart-product">


<img src="${item.image}">


<h4>${item.name}</h4>


<p>${item.price}</p>


</div>


`;


});


}




cartBtn.onclick=()=>{

cartPanel.classList.add("active");

};



closeCart.onclick=()=>{

cartPanel.classList.remove("active");

};
// ==========================
// WISHLIST SYSTEM
// ==========================


let wishlist=[];

const wishlistBtn=document.querySelector(".wishlist-btn");
const wishlistPanel=document.querySelector(".wishlist-panel");
const wishlistItems=document.querySelector(".wishlist-items");
const closeWishlist=document.querySelector(".close-wishlist");



document.querySelectorAll(".wishlist-add").forEach(button=>{


button.onclick=()=>{


let card=button.closest(".product-card");


let product={

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText,

image:card.querySelector("img").src

};



wishlist.push(product);



showWishlist();


};



});



function showWishlist(){


wishlistItems.innerHTML="";


wishlist.forEach(item=>{


wishlistItems.innerHTML +=`


<div class="wish-product">


<img src="${item.image}">


<h4>${item.name}</h4>


<p>${item.price}</p>


</div>


`;


});


}



wishlistBtn.onclick=()=>{

wishlistPanel.classList.add("active");

};



closeWishlist.onclick=()=>{

wishlistPanel.classList.remove("active");

};




// ==========================
// TRACK ORDER POPUP
// ==========================


const trackOrder=document.querySelector(".top-right a:first-child");

const orderPopup=document.querySelector(".order-popup");

const closeOrder=document.querySelector(".close-order");



trackOrder.onclick=(e)=>{


e.preventDefault();


orderPopup.classList.add("active");


};



closeOrder.onclick=()=>{


orderPopup.classList.remove("active");


};




// ==========================
// CONTACT BUTTON GO FOOTER
// ==========================


const contactLink=document.querySelector(".top-right a:nth-child(3)");



contactLink.onclick=(e)=>{


e.preventDefault();


document.querySelector("#contact").scrollIntoView({

behavior:"smooth"

});


};




// ==========================
// VIEW ALL PRODUCTS
// ==========================


document.querySelectorAll(".section-heading a").forEach(button=>{


button.onclick=(e)=>{


e.preventDefault();


let section=button.closest("section");


if(section.classList.contains("featured-products")){


alert("More products will be added soon ❤️");


}


};


});




// ==========================
// CHECKOUT BUTTON
// ==========================


document.querySelector(".checkout-btn").onclick=(e)=>{


e.preventDefault();



if(cart.length===0){


alert("Your cart is empty 🛍️");


return;


}



alert("Order checkout will be available soon ❤️");


};



// ==========================
// LOAD COMPLETE
// ==========================


console.log("Neha Rani Studio Website Ready ❤️");
