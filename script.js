const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");


// Mobile Menu

if(menuIcon && sidebar && overlay){

    menuIcon.addEventListener("click", function(){

        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");

    });


    overlay.addEventListener("click", function(){

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

}





// Close menu after clicking category

const sidebarLinks = document.querySelectorAll(".sidebar a");


sidebarLinks.forEach(link => {

    link.addEventListener("click", function(){

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

});





// Back To Top Button


const topBtn = document.getElementById("topBtn");


window.addEventListener("scroll", function(){

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});



if(topBtn){

    topBtn.addEventListener("click", function(){

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}
// ==========================
// HERO SLIDER
// ==========================

const heroSwiper = new Swiper(".heroSwiper",{

loop:true,

speed:900,

autoplay:{

delay:3500,

disableOnInteraction:false,

},

pagination:{

el:".swiper-pagination",

clickable:true,

}

});



// ==========================
// CATEGORY SLIDER
// ==========================

const categorySwiper = new Swiper(".categorySwiper",{

loop:true,

spaceBetween:25,

slidesPerView:2,

autoplay:{

delay:2500,

disableOnInteraction:false,

},

breakpoints:{

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
