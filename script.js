/* ==========================================
   NEHA RANI STUDIO
   FINAL SCRIPT.JS
========================================== */


document.addEventListener("DOMContentLoaded", function(){



/* ================= SWIPER HERO ================= */


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




/* ================= CATEGORY SWIPER ================= */


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



if(menuIcon && sidebar && overlay){


menuIcon.onclick=function(){


sidebar.classList.add("active");

overlay.classList.add("active");


};



overlay.onclick=function(){


sidebar.classList.remove("active");

overlay.classList.remove("active");


};


}







/* ================= SEARCH POPUP ================= */


const searchBtn=document.querySelector(".search-btn");

const searchPopup=document.querySelector(".search-popup");

const closeSearch=document.querySelector(".close-search");



if(searchBtn && searchPopup){


searchBtn.onclick=function(){


searchPopup.classList.add("active");


};


}



if(closeSearch){


closeSearch.onclick=function(){


searchPopup.classList.remove("active");


};


}







/* ================= PRODUCT OPEN ================= */


const productLinks={


"gift-box":"gift-box",

"bag-1":"hand-bag",

"dress-1":"dress-1",

"perfume-1":"perfume",

"jewelry-1":"watch",

"shoes-1":"shoes"


};





document.querySelectorAll(".product-card").forEach(function(card){



card.onclick=function(e){



if(e.target.closest(".add-cart")) return;


if(e.target.closest(".wishlist-add")) return;



let id=this.dataset.id;



if(productLinks[id]){


window.location.href="product.html?id="+productLinks[id];


}



};



});







/* ================= CATEGORY FILTER ================= */


document.querySelectorAll(".category-card").forEach(function(category){



category.onclick=function(){



let categoryId=this.id;



document.querySelectorAll(".product-item").forEach(function(product){



if(product.dataset.category===categoryId){


product.style.display="block";


}

else{


product.style.display="none";


}



});



let featured=document.querySelector(".featured-products");


if(featured){


featured.scrollIntoView({

behavior:"smooth"

});


}



};


});






/* ================= VIEW ALL ================= */


const viewAll=document.querySelector("#viewAllProducts");



if(viewAll){


viewAll.onclick=function(e){


e.preventDefault();



document.querySelectorAll(".product-item").forEach(function(item){


item.style.display="block";


});



let featured=document.querySelector(".featured-products");


if(featured){


featured.scrollIntoView({

behavior:"smooth"

});


}



};


}






/* ================= FEATURED FIX ================= */


const featuredSection=document.querySelector(".featured-products");



if(featuredSection){


featuredSection.style.display="block";

featuredSection.style.opacity="1";

featuredSection.style.visibility="visible";


}
/* ==========================================
   NEHA RANI STUDIO
   FINAL SCRIPT.JS
========================================== */


document.addEventListener("DOMContentLoaded", function(){



/* ================= SWIPER HERO ================= */


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




/* ================= CATEGORY SWIPER ================= */


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



if(menuIcon && sidebar && overlay){


menuIcon.onclick=function(){


sidebar.classList.add("active");

overlay.classList.add("active");


};



overlay.onclick=function(){


sidebar.classList.remove("active");

overlay.classList.remove("active");


};


}







/* ================= SEARCH POPUP ================= */


const searchBtn=document.querySelector(".search-btn");

const searchPopup=document.querySelector(".search-popup");

const closeSearch=document.querySelector(".close-search");



if(searchBtn && searchPopup){


searchBtn.onclick=function(){


searchPopup.classList.add("active");


};


}



if(closeSearch){


closeSearch.onclick=function(){


searchPopup.classList.remove("active");


};


}







/* ================= PRODUCT OPEN ================= */


const productLinks={


"gift-box":"gift-box",

"bag-1":"hand-bag",

"dress-1":"dress-1",

"perfume-1":"perfume",

"jewelry-1":"watch",

"shoes-1":"shoes"


};





document.querySelectorAll(".product-card").forEach(function(card){



card.onclick=function(e){



if(e.target.closest(".add-cart")) return;


if(e.target.closest(".wishlist-add")) return;



let id=this.dataset.id;



if(productLinks[id]){


window.location.href="product.html?id="+productLinks[id];


}



};



});







/* ================= CATEGORY FILTER ================= */


document.querySelectorAll(".category-card").forEach(function(category){



category.onclick=function(){



let categoryId=this.id;



document.querySelectorAll(".product-item").forEach(function(product){



if(product.dataset.category===categoryId){


product.style.display="block";


}

else{


product.style.display="none";


}



});



let featured=document.querySelector(".featured-products");


if(featured){


featured.scrollIntoView({

behavior:"smooth"

});


}



};


});






/* ================= VIEW ALL ================= */


const viewAll=document.querySelector("#viewAllProducts");



if(viewAll){


viewAll.onclick=function(e){


e.preventDefault();



document.querySelectorAll(".product-item").forEach(function(item){


item.style.display="block";


});



let featured=document.querySelector(".featured-products");


if(featured){


featured.scrollIntoView({

behavior:"smooth"

});


}



};


}






/* ================= FEATURED FIX ================= */


const featuredSection=document.querySelector(".featured-products");



if(featuredSection){


featuredSection.style.display="block";

featuredSection.style.opacity="1";

featuredSection.style.visibility="visible";


}

/* ================= CART SYSTEM ================= */


let cart=[];


const cartCount=document.querySelector(".cart-count");

const cartPanel=document.querySelector(".cart-panel");

const cartItems=document.querySelector(".cart-items");

const cartBtn=document.querySelector(".cart-btn");

const closeCart=document.querySelector(".close-cart");





document.querySelectorAll(".add-cart").forEach(function(button){



button.onclick=function(e){



e.stopPropagation();



let card=this.closest(".product-card");



if(!card) return;



let name=card.querySelector("h3").innerText;

let price=card.querySelector(".product-price").innerText;



cart.push({

name:name,

price:price

});



updateCart();



};



});







function updateCart(){



if(cartCount){


cartCount.innerText=cart.length;


}



if(cartItems){



cartItems.innerHTML="";



cart.forEach(function(item){



cartItems.innerHTML+=`

<div class="cart-product">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

`;


});



}



}






if(cartBtn && cartPanel){


cartBtn.onclick=function(){


cartPanel.classList.add("active");


};


}



if(closeCart){


closeCart.onclick=function(){


cartPanel.classList.remove("active");


};


}








/* ================= WISHLIST SYSTEM ================= */



let wishlist=[];



const wishlistPanel=document.querySelector(".wishlist-panel");

const wishlistItems=document.querySelector(".wishlist-items");

const wishlistBtn=document.querySelector(".wishlist-btn");

const closeWishlist=document.querySelector(".close-wishlist");






document.querySelectorAll(".wishlist-add").forEach(function(button){



button.onclick=function(e){



e.stopPropagation();



let card=this.closest(".product-card");



if(!card) return;



let name=card.querySelector("h3").innerText;



wishlist.push(name);



updateWishlist();



};



});







function updateWishlist(){



if(wishlistItems){



wishlistItems.innerHTML="";



wishlist.forEach(function(item){



wishlistItems.innerHTML+=`

<div class="wishlist-product">

❤️ ${item}

</div>

`;


});



}



}







if(wishlistBtn && wishlistPanel){



wishlistBtn.onclick=function(){


wishlistPanel.classList.add("active");


};


}





if(closeWishlist){



closeWishlist.onclick=function(){


wishlistPanel.classList.remove("active");


};


}








/* ================= TRACK ORDER ================= */



const trackOrder=document.querySelector("#trackOrder");

const orderPopup=document.querySelector(".order-popup");

const closeOrder=document.querySelector(".close-order");




if(trackOrder && orderPopup){



trackOrder.onclick=function(e){



e.preventDefault();



orderPopup.classList.add("active");


};



}



if(closeOrder){



closeOrder.onclick=function(){



orderPopup.classList.remove("active");


};



}








/* ================= SEARCH PRODUCTS ================= */



const searchInput=document.querySelector("#searchInput");

const searchButton=document.querySelector("#searchButton");




if(searchButton){



searchButton.onclick=function(){



let value=searchInput.value.toLowerCase();



document.querySelectorAll(".product-item").forEach(function(product){



let name=product.innerText.toLowerCase();



if(name.includes(value)){


product.style.display="block";


}

else{


product.style.display="none";


}



});




if(searchPopup){


searchPopup.classList.remove("active");


}





let featured=document.querySelector(".featured-products");



if(featured){



featured.scrollIntoView({

behavior:"smooth"

});


}



};



}
   /* ================= WHATSAPP BUTTON ================= */


const whatsappBtn=document.querySelector(".whatsapp-btn");


if(whatsappBtn){


whatsappBtn.onclick=function(){


window.open(

"https://wa.me/923045255325",

"_blank"

);


};


}








/* ================= BACK TO TOP ARROW ================= */


const topBtn=document.querySelector("#topBtn");



if(topBtn){



window.addEventListener("scroll",function(){



if(window.scrollY>300){


topBtn.style.display="flex";


}

else{


topBtn.style.display="none";


}



});





topBtn.onclick=function(){



window.scrollTo({


top:0,

behavior:"smooth"


});



};



}








/* ================= PRODUCT PAGE DATA ================= */



const params=new URLSearchParams(window.location.search);


const productId=params.get("id");




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

"images/products/product2-2.jpg",

"images/products/product2-3.jpg"

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



const productName=document.querySelector("#productName");

const productPrice=document.querySelector("#productPrice");

const mainImage=document.querySelector("#mainProductImage");





if(productName){


productName.innerText=product.name;


}





if(productPrice){


productPrice.innerText=product.price;


}





if(mainImage){


mainImage.src=product.images[0];


}







window.nextImage=function(){



currentImage++;



if(currentImage>=product.images.length){


currentImage=0;


}



mainImage.src=product.images[currentImage];



};







window.prevImage=function(){



currentImage--;



if(currentImage<0){


currentImage=product.images.length-1;


}



mainImage.src=product.images[currentImage];



};







/* PRODUCT PAGE CART */


const detailAddCart=document.querySelector("#detailAddCart");



if(detailAddCart){



detailAddCart.onclick=function(){



cart.push({


name:product.name,


price:product.price


});



updateCart();



};


}






/* PRODUCT PAGE WISHLIST */



const detailWishlist=document.querySelector("#detailWishlist");



if(detailWishlist){



detailWishlist.onclick=function(){



wishlist.push(product.name);



updateWishlist();



};


}






/* WHATSAPP PRODUCT ORDER */



const whatsappOrder=document.querySelector("#whatsappBtn");



if(whatsappOrder){



whatsappOrder.href=


"https://wa.me/923045255325?text=I want to order "+product.name;



}



}






});
