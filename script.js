const menu = document.getElementById("sideMenu");

document.querySelector(".menu-btn").onclick = function () {
    menu.style.left = "0";
};

function closeMenu() {
    menu.style.left = "-320px";
}
