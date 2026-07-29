/* ==========================================
   NEHA RANI STUDIO
   FINAL SCRIPT.JS PART 1/4
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






/* ================= PRODUCT DATABASE ================= */


const products={


"gift-box":{

name:"Luxury Gift Box",

price:2999,

image:"images/products/product1.jpg",

images:[

"images/products/product1.jpg",
"images/products/product1-1.jpg",
"images/products/product1-2.jpg",
"images/products/product1-3.jpg"

]

},



"hand-bag":{

name:"Elegant Hand Bag",

price:3999,

image:"images/products/product2.jpg",

images:[

"images/products/product2.jpg",
"images/products/product2-2.jpg",
"images/products/product2-3.jpg"

]

},



"dress-1":{

name:"Beautiful Dress",

price:4999,

image:"images/products/product3.jpg",

images:[

"images/products/product3.jpg",
"images/products/product3-2.jpg"

]

},



"perfume":{

name:"Premium Perfume",

price:2499,

image:"images/products/product4.jpg",

images:[

"images/products/product4.jpg"

]

},



"watch":{

name:"Luxury Watch",

price:5499,

image:"images/products/product5.jpg",

images:[

"images/products/product5.jpg"

]

},



"shoes":{

name:"Ladies Shoes",

price:3499,

image:"images/products/product6.jpg",

images:[

"images/products/product6.jpg"

]

}


};






/* ================= PRODUCT OPEN ================= */


const productLinks={


"gift-box":"gift-box",

"bag-1":"hand-bag",

"dress-1":"dress-1",

"perfume-1":"perfume",

"jewelry-1":"watch",

"shoes-1":"shoes"


};





document.querySelectorAll(".product-card")
.forEach(card=>{


card.onclick=(e)=>{


if(e.target.closest(".wishlist-add")) return;

if(e.target.closest(".add-cart")) return;



let id=card.dataset.id;



if(productLinks[id]){


window.location.href=
"product.html?id="+productLinks[id];


}



};



});






/* ================= CART STORAGE ================= */


let cart=
JSON.parse(localStorage.getItem("cart")) || [];





const cartCount=document.querySelector(".cart-count");

const cartPanel=document.querySelector(".cart-panel");

const cartBtn=document.querySelector(".cart-btn");

const closeCart=document.querySelector(".close-cart");

const cartItems=document.querySelector(".cart-items");






function saveCart(){


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


}





function updateCartCount(){


if(cartCount){

cartCount.innerText=cart.length;

}


}





function getTotal(){


let total=0;


cart.forEach(item=>{


total += item.price * item.qty;


});


return total;


}




updateCartCount();





/* ================= ADD TO CART ================= */


document.querySelectorAll(".add-cart")
.forEach(btn=>{


btn.onclick=(e)=>{


e.stopPropagation();



let card=btn.closest(".product-card");


if(!card) return;



let id=card.dataset.id;


let product=products[id];



if(product){


let exist=cart.find(
item=>item.name===product.name
);



if(exist){

exist.qty++;

}

else{


cart.push({

name:product.name,

price:product.price,

image:product.image,

qty:1

});


}



saveCart();

updateCartCount();



}



};



});




/* ================= CART OPEN CLOSE ================= */


if(cartBtn && cartPanel){


cartBtn.onclick=()=>{


cartPanel.classList.add("active");


renderCart();


};


}




if(closeCart){


closeCart.onclick=()=>{


cartPanel.classList.remove("active");


};


}
   /* ================= CART RENDER ================= */


function renderCart(){


if(!cartItems) return;



cartItems.innerHTML="";



if(cart.length===0){


cartItems.innerHTML=`

<p class="empty-cart">
Your cart is empty 🛒
</p>

`;

return;


}




cart.forEach((item,index)=>{



cartItems.innerHTML+=`

<div class="cart-product">


<img src="${item.image}" class="cart-image">



<div class="cart-info">


<h4>${item.name}</h4>


<p>
Rs. ${item.price}
</p>



<div class="qty-box">


<button onclick="minusQty(${index})">
−
</button>


<span>
${item.qty}
</span>


<button onclick="plusQty(${index})">
+
</button>


</div>



<button class="remove-btn"
onclick="removeCart(${index})">

Remove

</button>


</div>


</div>

`;



});





cartItems.innerHTML+=`

<div class="cart-footer">


<h3>
Total: Rs. ${getTotal()}
</h3>



<button class="checkout-btn"
onclick="checkoutWhatsapp()">

Checkout WhatsApp

</button>


</div>

`;



}







/* ================= QUANTITY ================= */


window.plusQty=function(index){


cart[index].qty++;


saveCart();


updateCartCount();


renderCart();


}





window.minusQty=function(index){



if(cart[index].qty>1){


cart[index].qty--;


}

else{


cart.splice(index,1);


}



saveCart();


updateCartCount();


renderCart();


}






/* ================= REMOVE CART ================= */


window.removeCart=function(index){


cart.splice(index,1);


saveCart();


updateCartCount();


renderCart();


}







/* ================= BUY NOW WHATSAPP ================= */

const buyBtn = document.querySelector("#whatsappBtn");

if(buyBtn && currentProduct){

buyBtn.href =
"https://wa.me/923045255325?text=" +
encodeURIComponent(
`Assalam o Alaikum Neha Rani Studio 🌸

I would like to order this product:

🛍 Product: ${currentProduct.name}
💰 Price: ${currentProduct.price}

Please confirm availability and delivery details.

Thank you 🤍✨`
);

}





/* ================= INITIAL CART LOAD ================= */


updateCartCount();





if(cartPanel){

cartPanel.addEventListener("click",()=>{

renderCart();

});

}






/* ================= PRODUCT DETAIL ================= */


const urlParams=
new URLSearchParams(window.location.search);


const productId=
urlParams.get("id");



let currentProduct=null;

let currentImage=0;



if(productId && products[productId]){


currentProduct=products[productId];



const nameBox=
document.querySelector("#productName");


const priceBox=
document.querySelector("#productPrice");


const mainImage=
document.querySelector("#mainProductImage");



if(nameBox){

nameBox.innerText=
currentProduct.name;

}



if(priceBox){

priceBox.innerText=
"Rs. "+currentProduct.price;

}



if(mainImage){

mainImage.src=
currentProduct.images[0];

}






window.nextImage=function(){



currentImage++;



if(currentImage >= currentProduct.images.length){

currentImage=0;

}



if(mainImage){

mainImage.src=
currentProduct.images[currentImage];

}


};







window.prevImage=function(){



currentImage--;



if(currentImage < 0){

currentImage=
currentProduct.images.length-1;

}



if(mainImage){

mainImage.src=
currentProduct.images[currentImage];

}


};





/* BUY NOW */


const buyBtn=
document.querySelector("#whatsappBtn");



if(buyBtn){


buyBtn.href=

"https://wa.me/923045255325?text=I want to order "+
currentProduct.name;


}



}




/* ================= DETAIL ADD CART ================= */


const detailAddCart=
document.querySelector("#detailAddCart");



if(detailAddCart){


detailAddCart.onclick=()=>{


if(currentProduct){



let exist=
cart.find(
item=>item.name===currentProduct.name
);



if(exist){

exist.qty++;

}

else{


cart.push({

name:currentProduct.name,

price:currentProduct.price,

image:currentProduct.image,

qty:1

});


}



saveCart();

updateCartCount();


alert("Added to cart 🛒");


}



};


}
   /* ================= WISHLIST SYSTEM ================= */


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



const wishlistBtn=
document.querySelector(".wishlist-btn");


const wishlistPanel=
document.querySelector(".wishlist-panel");


const closeWishlist=
document.querySelector(".close-wishlist");


const wishlistItems=
document.querySelector(".wishlist-items");







function saveWishlist(){


localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);


}





function renderWishlist(){


if(!wishlistItems) return;



wishlistItems.innerHTML="";



if(wishlist.length===0){


wishlistItems.innerHTML=`

<p class="empty-wishlist">
Your wishlist is empty ❤️
</p>

`;

return;


}





wishlist.forEach((item,index)=>{


wishlistItems.innerHTML+=`

<div class="wishlist-product">


<img src="${item.image}" 
class="wishlist-image">



<div class="wishlist-info">


<h4>
${item.name}
</h4>


<p>
Rs. ${item.price}
</p>



<button onclick="removeWishlist(${index})">

Remove

</button>


</div>


</div>


`;


});


}





window.removeWishlist=function(index){


wishlist.splice(index,1);


saveWishlist();


renderWishlist();


};







function toggleWishlist(product,btn){



let exist=
wishlist.find(
item=>item.name===product.name
);



if(exist){



wishlist=
wishlist.filter(
item=>item.name!==product.name
);



if(btn){

btn.classList.remove("liked");

}


}

else{


wishlist.push({

name:product.name,

price:product.price,

image:product.image

});



if(btn){

btn.classList.add("liked");

}


}



saveWishlist();


renderWishlist();



}








/* HOME HEART BUTTON */


document.querySelectorAll(".wishlist-add")
.forEach(btn=>{


btn.onclick=(e)=>{


e.stopPropagation();



let card=
btn.closest(".product-card");



if(card){


let id=
card.dataset.id;



let product=
products[id];



if(product){


toggleWishlist(product,btn);


}



}



};



});








/* DETAIL PAGE HEART */


const detailWishlist=
document.querySelector("#detailWishlist");



if(detailWishlist){


detailWishlist.onclick=(e)=>{


e.preventDefault();



if(currentProduct){


toggleWishlist(
currentProduct,
detailWishlist
);


}



};


}








/* OPEN WISHLIST */


if(wishlistBtn && wishlistPanel){


wishlistBtn.onclick=()=>{


wishlistPanel.classList.add("active");


renderWishlist();


};


}





/* CLOSE WISHLIST */


if(closeWishlist){


closeWishlist.onclick=()=>{


wishlistPanel.classList.remove("active");


};


}








/* ================= SEARCH ================= */


const searchBtn=
document.querySelector(".search-btn");


const searchPopup=
document.querySelector(".search-popup");


const closeSearch=
document.querySelector(".close-search");


const searchInput=
document.querySelector("#searchInput");


const searchButton=
document.querySelector("#searchButton");






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






if(searchButton && searchInput){


searchButton.onclick=()=>{


let value=
searchInput.value.toLowerCase();



document.querySelectorAll(".product-item")
.forEach(product=>{


let text=
product.innerText.toLowerCase();



if(text.includes(value)){


product.style.display="block";


}

else{


product.style.display="none";


}



});



searchPopup.classList.remove("active");


};



}







/* ================= TRACK ORDER ================= */


const trackBtn=
document.querySelector("#trackOrder");


const orderPopup=
document.querySelector(".order-popup");


const closeOrder=
document.querySelector(".close-order");






if(trackBtn && orderPopup){


trackBtn.onclick=(e)=>{


e.preventDefault();


orderPopup.classList.add("active");


};


}







if(closeOrder){


closeOrder.onclick=(e)=>{


e.preventDefault();


orderPopup.classList.remove("active");


};


}







/* CLICK OUTSIDE ORDER CLOSE */


if(orderPopup){


orderPopup.onclick=(e)=>{


if(e.target===orderPopup){


orderPopup.classList.remove("active");


}


};


}
   /* ================= WHATSAPP FLOAT BUTTON ================= */


const whatsappBtn=
document.querySelector(".whatsapp-btn");


if(whatsappBtn){


whatsappBtn.onclick=()=>{


window.open(

"https://wa.me/923045255325",

"_blank"

);


};


}







/* ================= BACK TO TOP ================= */


const topBtn=
document.querySelector("#topBtn");



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


document.querySelectorAll(".category-card")
.forEach(category=>{


category.onclick=()=>{


let id=
category.id;



document.querySelectorAll(".product-item")
.forEach(product=>{


if(product.dataset.category===id){


product.style.display="block";


}

else{


product.style.display="none";


}



});



let section=
document.querySelector(".featured-products");



if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



};



});








/* ================= VIEW ALL PRODUCTS ================= */


const viewAll=
document.querySelector("#viewAllProducts");



if(viewAll){


viewAll.onclick=(e)=>{


e.preventDefault();



document.querySelectorAll(".product-item")
.forEach(product=>{


product.style.display="block";


});




let section=
document.querySelector(".featured-products");



if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



};



}







/* ================= LOAD SAVED DATA ================= */


renderCart();

renderWishlist();

updateCartCount();






});
