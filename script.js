/* ===========================
   Neha Rani Studio
=========================== */

// Sidebar

const menuBtn = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// Back To Top Button

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if (topBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }

};

// Scroll To Top

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// Search Box

const searchInput = document.querySelector(".search-bar input");

if (searchInput) {

    searchInput.addEventListener("focus", () => {

        searchInput.style.boxShadow = "0 0 15px rgba(214,51,132,.25)";

    });

    searchInput.addEventListener("blur", () => {

        searchInput.style.boxShadow = "0 4px 15px rgba(0,0,0,.05)";

    });

}

// Buttons Animation

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "scale(1.03)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "scale(1)";

    });

});

console.log("Neha Rani Studio Loaded Successfully ❤️");
/* ===========================
   Hero Slider
=========================== */

let slides = document.querySelectorAll(".slide");

let currentSlide = 0;


function showSlide(){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });


    slides[currentSlide].classList.add("active");


    currentSlide++;


    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

}


if(slides.length > 0){

    setInterval(showSlide,4000);

}
