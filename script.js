/* ==========================================
   NEHA RANI STUDIO
   FINAL SCRIPT.JS PART 1
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






/* ================= CART DATA ================= */


let cart =
JSON.parse(localStorage.getItem("cart")) || [];



const cartCount=
document.querySelector(".cart-count");


const cartItems=
document.querySelector(".cart-items");






function saveCart(){


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


}







function updateCart(){



if(cartCount){


cartCount.innerText=
cart.reduce(
(total,item)=>total+item.qty,
0
);


}





if(cartItems){



cartItems.innerHTML="";



cart.forEach((item,index)=>{


cartItems.innerHTML += `


<div class="cart-product">


<img src="${item.image}">



<div>


<h4>${item.name}</h4>


<p>${item.price}</p>



<div class="qty-box">


<button class="minus" data-index="${index}">
-
</button>



<span>
${item.qty}
</span>



<button class="plus" data-index="${index}">
+
</button>



</div>



<button class="remove-cart" data-index="${index}">
Remove
</button>



</div>


</div>



`;



});


}




saveCart();


}








/* ================= ADD TO CART ================= */


document.querySelectorAll(".add-cart").forEach(btn=>{



btn.onclick=(e)=>{


e.stopPropagation();



let card=
btn.closest(".product-card");



if(card){



let product={



name:
card.querySelector("h3").innerText,


price:
card.querySelector(".product-price").innerText,


image:
card.querySelector("img").src,


qty:1


};




let exist=
cart.find(
(item)=>item.name===product.name
);




if(exist){


exist.qty++;


}

else{


cart.push(product);


}




updateCart();



}



};



});






/* ================= CART QUANTITY ================= */


if(cartItems){



cartItems.addEventListener("click",(e)=>{



let index=
e.target.dataset.index;




if(e.target.classList.contains("plus")){


cart[index].qty++;

updateCart();


}




if(e.target.classList.contains("minus")){


if(cart[index].qty>1){

cart[index].qty--;

}


updateCart();


}




if(e.target.classList.contains("remove-cart")){


cart.splice(index,1);


updateCart();


}



});


}






updateCart();
/* ================= CART PANEL ================= */


const cartBtn=document.querySelector(".cart-btn");

const cartPanel=document.querySelector(".cart-panel");

const closeCart=document.querySelector(".close-cart");



if(cartBtn && cartPanel){


cartBtn.onclick=()=>{


cartPanel.classList.add("active");


updateCart();


};


}

   /* ================= CHECKOUT BUTTON ================= */

const checkoutBtn = document.querySelector(".checkout-btn");


if(checkoutBtn){


checkoutBtn.onclick = (e)=>{


e.preventDefault();



if(cart.length === 0){

alert("Your cart is empty 🛒");

return;

}



let message =
"Assalam o Alaikum 🌸%0A%0A"+
"I want to order from Neha Rani Studio:%0A%0A";



cart.forEach(item=>{


message +=
"🛍 "+item.name+
"%0AQty: "+item.qty+
"%0APrice: "+item.price+
"%0A%0A";


});



message += "Thank you 🤍";



window.open(

"https://wa.me/923045255325?text="+message,

"_blank"

);



};


}



if(closeCart){


closeCart.onclick=()=>{


cartPanel.classList.remove("active");


};


}







/* ================= CART TOTAL ================= */


function getCartTotal(){


let total=0;



cart.forEach(item=>{


let price=parseInt(
item.price.replace(/[^0-9]/g,"")
);



total += price * item.qty;



});



return total;



}








/* ================= WHATSAPP CHECKOUT ================= */


const checkoutBtn=document.querySelector(".checkout-btn");



if(checkoutBtn){



checkoutBtn.onclick=(e)=>{


e.preventDefault();



if(cart.length===0){


alert("Your cart is empty 🛒");


return;


}




let message=
"Assalam o Alaikum Neha Rani Studio 🌸%0A%0AI want to order these products:%0A%0A";




cart.forEach(item=>{


message +=

"🛍 Product: "+item.name+
"%0AQuantity: "+item.qty+
"%0APrice: "+item.price+
"%0A%0A";


});




message +=

"Total Amount: Rs. "+
getCartTotal()+
"%0A%0AKindly confirm my order. Thank you 🤍";





window.open(

"https://wa.me/923045255325?text="+message,

"_blank"

);



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



window.location.href=

"product.html?id="+productLinks[id];



}



};



});







/* ================= PRODUCT DETAIL DATA ================= */


const params=
new URLSearchParams(window.location.search);



const productId=
params.get("id");





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
/* ================= PRODUCT DETAIL PAGE ================= */


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
currentProduct.price;

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








/* BUY NOW WHATSAPP */


const buyBtn = document.querySelector("#whatsappBtn");


if(buyBtn && currentProduct){


buyBtn.onclick = (e)=>{


e.preventDefault();


let message =
"Assalam o Alaikum 🌸\n\n"+
"I want to order this product from Neha Rani Studio:\n\n"+
"🛍 Product: "+
currentProduct.name+
"\n💰 Price: "+
currentProduct.price+
"\n\nPlease confirm my order 🤍";



window.open(

"https://wa.me/923045255325?text="+
encodeURIComponent(message),

"_blank"

);


};


}





/* ================= DETAIL ADD CART ================= */


const detailAddCart=
document.querySelector("#detailAddCart");



if(detailAddCart){



detailAddCart.onclick=()=>{



if(currentProduct){



let product={


name:currentProduct.name,


price:currentProduct.price,


image:currentProduct.images[0],


qty:1


};




let exist=
cart.find(
(item)=>item.name===product.name
);




if(exist){


exist.qty++;


}

else{


cart.push(product);


}




updateCart();



alert("Product added to cart 🛒");



}



};



}








/* ================= WISHLIST ================= */


let wishlist=
JSON.parse(localStorage.getItem("wishlist")) || [];



const wishlistItems=
document.querySelector(".wishlist-items");


const wishlistBtn=
document.querySelector(".wishlist-btn");


const wishlistPanel=
document.querySelector(".wishlist-panel");


const closeWishlist=
document.querySelector(".close-wishlist");








function updateWishlist(){



if(!wishlistItems) return;




wishlistItems.innerHTML="";




wishlist.forEach((item,index)=>{



wishlistItems.innerHTML +=`


<div class="wishlist-product">


<span>
❤️ ${item.name}
</span>


<button class="remove-wishlist" data-index="${index}">
Remove
</button>


</div>


`;



});




localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);



}







document.querySelectorAll(".wishlist-add").forEach(btn=>{



btn.onclick=(e)=>{



e.stopPropagation();




btn.classList.toggle("liked");



let icon=
btn.querySelector("i");



if(icon){


icon.classList.toggle("fa-regular");

icon.classList.toggle("fa-solid");


}




let card=
btn.closest(".product-card");



if(card){



let name=
card.querySelector("h3").innerText;



let exist=
wishlist.find(
(item)=>item.name===name
);




if(!exist){


wishlist.push({

name:name,

price:
card.querySelector(".product-price").innerText,

image:
card.querySelector("img").src


});


}
else{


wishlist=
wishlist.filter(
(item)=>item.name!==name
);


}



updateWishlist();



}



};



});








/* DETAIL PAGE HEART */


const detailWishlist=
document.querySelector("#detailWishlist");



if(detailWishlist){



detailWishlist.onclick=()=>{



if(currentProduct){



let exist=
wishlist.find(
(item)=>item.name===currentProduct.name
);



if(!exist){


wishlist.push({


name:currentProduct.name,

price:currentProduct.price,

image:currentProduct.images[0]


});


detailWishlist.classList.add("liked");


}
else{


wishlist=
wishlist.filter(
(item)=>item.name!==currentProduct.name
);


detailWishlist.classList.remove("liked");


}



updateWishlist();



}



};



}






/* WISHLIST PANEL OPEN */



if(wishlistBtn && wishlistPanel){


wishlistBtn.onclick=()=>{


wishlistPanel.classList.add("active");


updateWishlist();


};


}




if(closeWishlist){



closeWishlist.onclick=()=>{


wishlistPanel.classList.remove("active");


};


}







/* REMOVE WISHLIST */


if(wishlistItems){



wishlistItems.addEventListener("click",(e)=>{



if(e.target.classList.contains("remove-wishlist")){



let index=
e.target.dataset.index;



wishlist.splice(index,1);



updateWishlist();



}



});



}

/* ================= SEARCH POPUP ================= */


const searchBtn =
document.querySelector(".search-btn");


const searchPopup =
document.querySelector(".search-popup");


const closeSearch =
document.querySelector(".close-search");



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


const searchInput =
document.querySelector("#searchInput");


const searchButton =
document.querySelector("#searchButton");




if(searchInput && searchButton){



searchButton.onclick=()=>{



let value =
searchInput.value.toLowerCase();




document.querySelectorAll(".product-item").forEach(product=>{



let text =
product.innerText.toLowerCase();




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


const trackBtn =
document.querySelector("#trackOrder");


const orderPopup =
document.querySelector(".order-popup");


const closeOrder =
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






if(orderPopup){



orderPopup.onclick=(e)=>{



if(e.target===orderPopup){


orderPopup.classList.remove("active");


}



};



}







/* ================= WHATSAPP FLOAT ================= */



const whatsappBtn =
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



const topBtn =
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



document.querySelectorAll(".category-card").forEach(category=>{



category.onclick=()=>{



let id =
category.id;




document.querySelectorAll(".product-item").forEach(product=>{



if(product.dataset.category===id){


product.style.display="block";


}

else{


product.style.display="none";


}



});




let section =
document.querySelector(".featured-products");



if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



};



});








/* ================= VIEW ALL PRODUCTS ================= */



const viewAll =
document.querySelector("#viewAllProducts");



if(viewAll){



viewAll.onclick=(e)=>{


e.preventDefault();




document.querySelectorAll(".product-item").forEach(product=>{


product.style.display="block";


});





let section =
document.querySelector(".featured-products");



if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



};



}







});
