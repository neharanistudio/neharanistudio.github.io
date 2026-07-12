document.addEventListener("DOMContentLoaded", function () {

    console.log("Welcome to Neha Rani Studio 💖");

    const shopButton = document.querySelector(".btn");

    if (shopButton) {
        shopButton.addEventListener("click", function (e) {
            e.preventDefault();

            alert("Welcome to Neha Rani Studio 🌸\nOur collection is coming soon!");

            // Baad mein is button ko Products section par scroll karwayenge.
        });
    }

});
