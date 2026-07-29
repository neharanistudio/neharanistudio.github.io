/* ==========================================
   NEHA RANI STUDIO
   SCRIPT.JS PART 1
========================================== */


document.addEventListener("DOMContentLoaded",()=>{


/* ================= HERO SWIPER ================= */


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

spaceBetween:20,


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


const menuBtn=document.querySelector(".menu-icon");

const sidebar=document.querySelector(".sidebar");

const overlay=document.querySelector(".menu-overlay");



if(menuBtn && sidebar && overlay){


menuBtn.onclick=()=>{

sidebar.classList.add("active");

overlay.classList.add("active");

};



overlay.onclick=()=>{

sidebar.classList.remove("active");

overlay.classList.remove("active");

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



document.querySelectorAll(".product-card").forEach(card=>{


card.onclick=(e)=>{


if(e.target.closest(".wishlist-add")) return;

if(e.target.closest(".add-cart")) return;



let id=card.dataset.id;



if(productLinks[id]){


window.location.href="product.html?id="+productLinks[id];


}


};


});





/* ================= CART ================= */


let cart=[];


const cartCount=document.querySelector(".cart-count");

const cartItems=document.querySelector(".cart-items");



function updateCart(){


if(cartCount){

cartCount.innerText=cart.length;

}



if(cartItems){


cartItems.innerHTML="";


cart.forEach(item=>{


cartItems.innerHTML+=`

<div class="cart-product">

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

`;


});


}


}





document.querySelectorAll(".add-cart").forEach(btn=>{


btn.onclick=(e)=>{


e.stopPropagation();



let card=btn.closest(".product-card");



if(card){


cart.push({

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText

});


updateCart();


}


};


});



const cartBtn=document.querySelector(".cart-btn");

const cartPanel=document.querySelector(".cart-panel");

const closeCart=document.querySelector(".close-cart");



if(cartBtn && cartPanel){


cartBtn.onclick=()=>{


cartPanel.classList.add("active");


};


}



if(closeCart){


closeCart.onclick=()=>{


cartPanel.classList.remove("active");


};


}
   /* ================= WISHLIST ================= */


let wishlist=[];


const wishlistBtn=document.querySelector(".wishlist-btn");

const wishlistPanel=document.querySelector(".wishlist-panel");

const closeWishlist=document.querySelector(".close-wishlist");

const wishlistItems=document.querySelector(".wishlist-items");




function updateWishlist(){


if(!wishlistItems) return;


wishlistItems.innerHTML="";


wishlist.forEach(item=>{


wishlistItems.innerHTML+=`

<div class="wishlist-product">

<i class="fa-solid fa-heart"></i>

${item.name}

</div>

`;


});


}





/* HOME PAGE HEART */


document.querySelectorAll(".wishlist-add").forEach(btn=>{


btn.onclick=(e)=>{


e.stopPropagation();



btn.classList.toggle("liked");



let icon=btn.querySelector("i");



if(icon){


icon.classList.toggle("fa-regular");

icon.classList.toggle("fa-solid");


}




let card=btn.closest(".product-card");



if(card && btn.classList.contains("liked")){


wishlist.push({

name:card.querySelector("h3").innerText,

price:card.querySelector(".product-price").innerText

});


}



updateWishlist();



};


});






/* WISHLIST OPEN */


if(wishlistBtn && wishlistPanel){


wishlistBtn.onclick=()=>{


wishlistPanel.classList.add("active");


};


}




/* WISHLIST CLOSE */


if(closeWishlist){


closeWishlist.onclick=()=>{


wishlistPanel.classList.remove("active");


};


}






/* ================= SEARCH POPUP ================= */


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







/* ================= SEARCH PRODUCTS ================= */


const searchInput=document.querySelector("#searchInput");

const searchButton=document.querySelector("#searchButton");



if(searchInput && searchButton){


searchButton.onclick=()=>{


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



if(searchPopup){


searchPopup.classList.remove("active");


}


};



}
   /* ================= TRACK ORDER ================= */


const trackBtn=document.querySelector("#trackOrder");

const orderPopup=document.querySelector(".order-popup");

const closeOrder=document.querySelector(".close-order");



if(trackBtn && orderPopup){


trackBtn.onclick=(e)=>{


e.preventDefault();


orderPopup.classList.add("active");


};


}




/* TRACK ORDER CROSS BUTTON */


if(closeOrder){


closeOrder.onclick=(e)=>{


e.preventDefault();


orderPopup.classList.remove("active");


};


}





/* CLICK OUTSIDE CLOSE */


if(orderPopup){


orderPopup.onclick=(e)=>{


if(e.target===orderPopup){


orderPopup.classList.remove("active");


}


};


}






/* ================= WHATSAPP ================= */


const whatsappBtn=document.querySelector(".whatsapp-btn");



if(whatsappBtn){


whatsappBtn.onclick=()=>{


window.open(

"https://wa.me/923045255325",

"_blank"

);


};


}







/* ================= BACK TO TOP ================= */


const topBtn=document.querySelector("#topBtn");



if(topBtn){



window.addEventListener("scroll",()=>{


if(window.scrollY>300){


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






/* ================= CATEGORY FILTER ================= */


document.querySelectorAll(".category-card").forEach(category=>{


category.onclick=()=>{


let id=category.id;



document.querySelectorAll(".product-item").forEach(product=>{


if(product.dataset.category===id){


product.style.display="block";


}

else{


product.style.display="none";


}


});



let section=document.querySelector(".featured-products");


if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



};



});






/* ================= VIEW ALL ================= */


const viewAll=document.querySelector("#viewAllProducts");



if(viewAll){


viewAll.onclick=(e)=>{


e.preventDefault();



document.querySelectorAll(".product-item").forEach(product=>{


product.style.display="block";


});



let section=document.querySelector(".featured-products");



if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



};



}
   /* ================= PRODUCT DETAIL PAGE ================= */


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

"images/products/product1-3.jpg"

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

"images/products/product3.jpg",

"images/products/product3-2.jpg"

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



let currentProduct=null;

let currentImage=0;



if(productId && products[productId]){


currentProduct=products[productId];



const nameBox=document.querySelector("#productName");

const priceBox=document.querySelector("#productPrice");

const mainImage=document.querySelector("#mainProductImage");



if(nameBox){

nameBox.innerText=currentProduct.name;

}



if(priceBox){

priceBox.innerText=currentProduct.price;

}



if(mainImage){

mainImage.src=currentProduct.images[0];

}





window.nextImage=function(){


currentImage++;


if(currentImage>=currentProduct.images.length){


currentImage=0;


}



if(mainImage){

mainImage.src=currentProduct.images[currentImage];

}


};





window.prevImage=function(){


currentImage--;


if(currentImage<0){


currentImage=currentProduct.images.length-1;


}



if(mainImage){

mainImage.src=currentProduct.images[currentImage];

}


};





/* BUY NOW WHATSAPP */


const buyBtn=document.querySelector("#whatsappBtn");



if(buyBtn){


buyBtn.href=

"https://wa.me/923045255325?text=I want to order "+currentProduct.name;



}



}







/* ================= DETAIL ADD CART ================= */


const detailAddCart=document.querySelector("#detailAddCart");



if(detailAddCart){


detailAddCart.onclick=()=>{


if(currentProduct){


cart.push({


name:currentProduct.name,


price:currentProduct.price


});



updateCart();



alert("Product added to cart 🛒");


}



};


}





/* ================= DETAIL WISHLIST HEART ================= */


const detailWishlist=document.querySelector("#detailWishlist");



if(detailWishlist){


detailWishlist.onclick=(e)=>{


e.preventDefault();



detailWishlist.classList.toggle("liked");



const icon=detailWishlist.querySelector("i");



if(icon){


icon.classList.toggle("fa-regular");

icon.classList.toggle("fa-solid");


}



};



}


});
