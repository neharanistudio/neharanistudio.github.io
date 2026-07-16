/* ===========================
 Neha Rani Studio JS
=========================== */


/* Sidebar Menu */

const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");


if(menuIcon && sidebar){

menuIcon.addEventListener("click",()=>{

sidebar.classList.toggle("active");

});

}



/* Wishlist */

const wishlist = document.querySelectorAll(".wishlist");


wishlist.forEach(item=>{

item.addEventListener("click",()=>{

item.classList.toggle("fa-solid");

item.classList.toggle("fa-regular");

});

});



/* Add To Cart */

const cartButtons = document.querySelectorAll(".product-card button");


cartButtons.forEach(button=>{

button.addEventListener("click",()=>{


button.innerHTML="Added ✓";


button.style.background="#25D366";


setTimeout(()=>{

button.innerHTML="Add To Cart";

button.style.background="#222";


},2000);



});


});



/* Back To Top */


const topBtn=document.getElementById("topBtn");


window.addEventListener("scroll",()=>{


if(window.scrollY>400){

topBtn.style.display="block";

}

else{

topBtn.style.display="none";

}


});



if(topBtn){

topBtn.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});

}
