// ==========================
// PRODUCT DETAILS PAGE
// ==========================

let urlParams = new URLSearchParams(window.location.search);

let productId = urlParams.get("id");


const productData = {

    "gift-box": {

        name: "Luxury Gift Box",

        price: "Rs. 2,999",

        description:
        "Premium quality luxury gift box with beautiful packaging. Perfect for birthdays, weddings and special occasions.",

        images: [
            "images/products/product1-1.jpg",
            "images/products/product1-2.jpg",
            "images/products/product1-3.jpg",
            "images/products/product1-4.jpg"
        ]

    },


    "hand-bag": {

        name:"Elegant Hand Bag",

        price:"Rs. 3,999",

        description:
        "Stylish and premium quality handbag for everyday use.",

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
        "Elegant fashion dress with premium fabric and beautiful design.",

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



let selectedProduct = productData[productId];


let productImage = document.getElementById("mainProductImage");
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productDescription = document.getElementById("productDescription");
let whatsappBtn = document.getElementById("whatsappBtn");



if(selectedProduct){


    productName.innerText = selectedProduct.name;


    productPrice.innerText = selectedProduct.price;


    productDescription.innerText = selectedProduct.description;


    productImage.src = selectedProduct.images[0];



    whatsappBtn.href =
    "https://wa.me/923045255325?text=I want to order "
    + selectedProduct.name;


}



let currentImage = 0;



function nextImage(){

    if(!selectedProduct) return;


    currentImage++;


    if(currentImage >= selectedProduct.images.length){

        currentImage = 0;

    }


    productImage.src =
    selectedProduct.images[currentImage];

}




function prevImage(){

    if(!selectedProduct) return;


    currentImage--;


    if(currentImage < 0){

        currentImage =
        selectedProduct.images.length - 1;

    }


    productImage.src =
    selectedProduct.images[currentImage];

}



// ==========================
// PRODUCT ADD TO CART
// ==========================


const productAddCart =
document.getElementById("productAddCart");


if(productAddCart){


productAddCart.onclick = function(){


cart.push({

name:selectedProduct.name,

price:selectedProduct.price,

image:selectedProduct.images[0]

});


cartCount.innerText = cart.length;


renderCart();


alert("Added to Cart ✅");


};


}
