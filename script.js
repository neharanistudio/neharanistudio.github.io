const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");


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
