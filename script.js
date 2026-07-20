// ==========================
// PRODUCT DETAIL PAGE
// ==========================

let params = new URLSearchParams(window.location.search);

let productId = params.get("id");


const products = {

"gift-box":{

name:"Luxury Gift Box",

price:"Rs. 2,999",

description:
"Premium luxury gift box with beautiful packaging. Perfect for birthdays, weddings and special occasions.",

images:[

"images/products/product1-1.jpg",
"images/products/product1-2.jpg",
"images/products/product1-3.jpg",
"images/products/product1-4.jpg"

]

},



"hand-bag":{

name:"Elegant Hand Bag",

price:"Rs. 3,999",

description:
"Stylish premium handbag with elegant design.",

images:[

"images/products/product2.jpg",
"images/products/product2-2.jpg",
"images/products/product2-3.jpg"

]

},



"dress-1":{

name:"Beautiful Dress",

price:"Rs. 4,999",

description:
"Luxury fashion dress with premium quality fabric.",

images:[

"images/products/product3.jpg",
"images/products/product3-2.jpg",
"images/products/product3-3.jpg"

]

},



"perfume":{

name:"Premium Perfume",

price:"Rs. 2,499",

description:
"Long lasting premium fragrance.",

images:[

"images/products/product4.jpg",
"images/products/product4-2.jpg"

]

}

};




let product = products[productId];



if(product){


let nameBox = document.getElementById("productName");
let priceBox = document.getElementById("productPrice");
let imageBox = document.getElementById("mainProductImage");
let descBox = document.getElementById("productDescription");
let whatsapp = document.getElementById("whatsappBtn");



if(nameBox)
nameBox.innerText = product.name;



if(priceBox)
priceBox.innerText = product.price;



if(descBox)
descBox.innerText = product.description;



if(imageBox)
imageBox.src = product.images[0];



if(whatsapp)

whatsapp.href =
"https://wa.me/923045255325?text=I want to order " 
+ product.name;



}




// ==========================
// IMAGE SLIDER
// ==========================


let currentImage = 0;



function nextImage(){


if(!product) return;


currentImage++;


if(currentImage >= product.images.length){

currentImage = 0;

}


document.getElementById("mainProductImage").src =
product.images[currentImage];


}





function prevImage(){


if(!product) return;


currentImage--;


if(currentImage < 0){

currentImage = product.images.length - 1;

}


document.getElementById("mainProductImage").src =
product.images[currentImage];


}





// ==========================
// ADD TO CART PRODUCT PAGE
// ==========================


const productAddCart =
document.getElementById("productAddCart");



if(productAddCart){


productAddCart.addEventListener("click",()=>{


let item = {

name: product.name,

price: product.price,

image: product.images[0]

};



cart.push(item);



if(cartCount)

cartCount.innerText = cart.length;



renderCart();



alert("Added to Cart ✅");



});


}
