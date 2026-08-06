/* ==========================================
   NEHA RANI STUDIO
   CLEAN SCRIPT.JS PART 1
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


slidesPerView:"auto",

spaceBetween:15,


freeMode:true,


breakpoints:{


768:{
slidesPerView:6
},


1200:{
slidesPerView:10
}


}


});


}







/* ================= SIDEBAR MENU ================= */


const menuBtn=document.querySelector("#menuBtn");

const sidebar=document.querySelector(".sidebar");

const overlay=document.querySelector(".menu-overlay");



if(menuBtn && sidebar && overlay){


menuBtn.addEventListener("click",()=>{


sidebar.classList.add("active");

overlay.classList.add("active");


});





overlay.addEventListener("click",()=>{


sidebar.classList.remove("active");

overlay.classList.remove("active");


});


}







/* ================= CATEGORY FILTER ================= */


document.querySelectorAll(".sidebar a").forEach(link=>{


link.addEventListener("click",(e)=>{


e.preventDefault();



let category=link.dataset.category;



document.querySelectorAll(".product-item").forEach(product=>{



if(category==="all"){


product.style.display="block";


}


else if(product.dataset.category===category){


product.style.display="block";


}


else{


product.style.display="none";


}



});





if(sidebar){

sidebar.classList.remove("active");

}


if(overlay){

overlay.classList.remove("active");

}




let section=document.querySelector("#featured-products");


if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



});


});








/* ================= CART DATA ================= */


let cart=JSON.parse(localStorage.getItem("cart")) || [];



const cartCount=document.querySelector(".cart-count");

const cartItems=document.querySelector(".cart-items");





function saveCart(){


localStorage.setItem(

"cart",

JSON.stringify(cart)

);


}






function updateCart(){



if(cartCount){


cartCount.innerText=cart.reduce(

(total,item)=>total+item.qty,

0

);


}






if(cartItems){


cartItems.innerHTML="";



cart.forEach((item,index)=>{


cartItems.innerHTML+=`


<div class="cart-product">


<img src="${item.image}">



<div>


<h4>${item.name}</h4>


<p>${item.price}</p>



<div class="qty-box">


<button class="minus"
data-index="${index}">
-
</button>


<span>
${item.qty}
</span>



<button class="plus"
data-index="${index}">
+
</button>



</div>




<button class="remove-cart"
data-index="${index}">

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


document.querySelectorAll(".add-cart").forEach(button=>{


button.addEventListener("click",(e)=>{


e.stopPropagation();



let card=button.closest(".product-card");



if(!card)return;




let product={


name:card.querySelector("h3").innerText,


price:card.querySelector(".product-price").innerText,


image:card.querySelector("img").src,


qty:1


};





let exist=cart.find(item=>item.name===product.name);



if(exist){


exist.qty++;


}

else{


cart.push(product);


}



updateCart();



});


});







/* ================= CART BUTTONS ================= */


if(cartItems){


cartItems.addEventListener("click",(e)=>{


let index=e.target.dataset.index;



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

/* 👈 YAHAN CURSOR RAKHO */

console.log("Neha Rani Studio JS Part 1 Loaded ✅");

});

/* ==========================================
   NEHA RANI STUDIO
   CLEAN SCRIPT.JS PART 2
========================================== */



/* ================= CART PANEL ================= */


const cartBtn=document.querySelector(".cart-btn");

const cartPanel=document.querySelector(".cart-panel");

const closeCart=document.querySelector(".close-cart");



if(cartBtn && cartPanel){

cartBtn.onclick=()=>{

cart = JSON.parse(localStorage.getItem("cart")) || [];

cartPanel.classList.add("active");

updateCart();

};

}

if(closeCart){


closeCart.onclick=()=>{


cartPanel.classList.remove("active");


};


}






/* ================= CHECKOUT WHATSAPP ================= */


const checkoutBtn=document.querySelector(".checkout-btn");


if(checkoutBtn){


checkoutBtn.onclick=()=>{


let cart=JSON.parse(localStorage.getItem("cart")) || [];


if(cart.length===0){

alert("Your cart is empty 🛒");

return;

}


let message=
"Assalam o Alaikum 🌸\n\n"+
"I want to order from Neha Rani Studio:\n\n";


cart.forEach((item,index)=>{


message+=
(index+1)+". 🛍 "+item.name+
"\nQty: "+item.qty+
"\nPrice: "+item.price+
"\n\n";


});


message+="Please confirm my order 🤍";


window.open(

"https://wa.me/923045255325?text="+
encodeURIComponent(message),

"_blank"

);


};


}









/* ================= WISHLIST SYSTEM ================= */


let wishlist=
JSON.parse(localStorage.getItem("wishlist")) || [];



const wishlistPanel=document.querySelector(".wishlist-panel");

const wishlistBtn=document.querySelector(".wishlist-btn");

const closeWishlist=document.querySelector(".close-wishlist");

const wishlistItems=document.querySelector(".wishlist-items");





function updateWishlist(){



if(wishlistItems){


wishlistItems.innerHTML="";



wishlist.forEach((item,index)=>{


wishlistItems.innerHTML+=`


<div class="wishlist-product">


<span>
❤️ ${item.name}
</span>


<button class="remove-wishlist"
data-index="${index}">

Remove

</button>


</div>


`;



});


}



localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);



}





document.querySelectorAll(".wishlist-add").forEach(button=>{


button.onclick=(e)=>{


e.stopPropagation();



let card=button.closest(".product-card");



let item={


name:card.querySelector("h3").innerText,


price:card.querySelector(".product-price").innerText,


image:card.querySelector("img").src


};





let exist=wishlist.find(

(x)=>x.name===item.name

);




if(exist){


wishlist=wishlist.filter(

(x)=>x.name!==item.name

);


button.classList.remove("liked");


}

else{


wishlist.push(item);


button.classList.add("liked");


}



updateWishlist();


};


});








if(wishlistBtn && wishlistPanel){

wishlistBtn.onclick=()=>{

wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlistPanel.classList.add("active");

updateWishlist();

};

}



if(closeWishlist){


closeWishlist.onclick=()=>{


wishlistPanel.classList.remove("active");


};


}







if(wishlistItems){


wishlistItems.addEventListener("click",(e)=>{


if(e.target.classList.contains("remove-wishlist")){


let index=e.target.dataset.index;


wishlist.splice(index,1);


updateWishlist();


}



});


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



searchPopup.classList.remove("active");


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




if(closeOrder){


closeOrder.onclick=()=>{


orderPopup.classList.remove("active");


};


}









/* ================= FLOAT WHATSAPP ================= */


const whatsappBtn=document.querySelector(".whatsapp-btn");



if(whatsappBtn){


whatsappBtn.onclick=(e)=>{


e.preventDefault();



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







/* ================= VIEW ALL ================= */


const viewAll=document.querySelector("#viewAllProducts");



if(viewAll){


viewAll.onclick=(e)=>{


e.preventDefault();



document.querySelectorAll(".product-item").forEach(product=>{


product.style.display="block";


});



let section=document.querySelector("#featured-products");


if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



};


}







updateWishlist();


console.log("Neha Rani Studio JS Part 2 Loaded ✅");
/* ================= PRODUCT PAGE OPEN ================= */


const productLinks = {

"gift-box":"gift-box",

"bag-1":"hand-bag",

"dress-1":"dress-1",

"perfume-1":"perfume",

"jewelry-1":"watch",

"shoes-1":"shoes"

};



document.querySelectorAll(".product-card")
.forEach(card=>{


card.addEventListener("click",(e)=>{


if(e.target.closest(".add-cart")) return;

if(e.target.closest(".wishlist-add")) return;



let id = card.dataset.id;



if(productLinks[id]){


window.location.href =
"product.html?id="+productLinks[id];


}



});


});

/* ===== PRODUCT DETAIL BUTTONS ===== */

const detailAddCart = document.getElementById("detailAddCart");

if (detailAddCart) {

    detailAddCart.onclick = function () {

        let newProduct = {
            name: document.getElementById("productName").innerText,
            price: document.getElementById("productPrice").innerText,
            image: document.getElementById("mainProductImage").src,
            qty: 1
        };

        let cartData = JSON.parse(localStorage.getItem("cart")) || [];

        let exist = cartData.find(item => item.name === newProduct.name);

        if (exist) {
            exist.qty++;
        } else {
            cartData.push(newProduct);
        }

        localStorage.setItem("cart", JSON.stringify(cartData));

        // Cart count update
        const cartCount = document.querySelector(".cart-count");
        if (cartCount) {
            cartCount.innerText = cartData.reduce((total, item) => total + item.qty, 0);
        }

        alert("Added To Cart 🛒");

    };

}



const detailWishlist = document.getElementById("detailWishlist");


if(detailWishlist){

detailWishlist.onclick=function(){

let newProduct = {

name: document.getElementById("productName").innerText,

price: document.getElementById("productPrice").innerText,

image: document.getElementById("mainProductImage").src

};


let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];


let exist = wishlistData.find(item=>item.name===newProduct.name);


if(!exist){

wishlistData.push(newProduct);

}


localStorage.setItem("wishlist", JSON.stringify(wishlistData));


alert("Added To Wishlist ❤️");

};

}
