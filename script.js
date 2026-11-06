/* Neha Rani Studio - consolidated storefront interactions */
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const $ = function (selector, root) { return (root || document).querySelector(selector); };
  const $$ = function (selector, root) { return Array.from((root || document).querySelectorAll(selector)); };
  const safeRead = function (key, fallback) {
    try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; }
    catch (_) { return fallback; }
  };
  const escapeHTML = function (value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  };

  let cart = safeRead("nrs_cart", safeRead("cart", []));
  let wishlist = safeRead("nrs_wishlist", safeRead("wishlist", []));
  const saveCart = function () {
    localStorage.setItem("nrs_cart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const saveWishlist = function () {
    localStorage.setItem("nrs_wishlist", JSON.stringify(wishlist));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const products = {
    "gift-box": { id: "gift-box", name: "Floral Rose Jewelry Gift Box", price: "Rs. 2,500", image: "38e741213269e58e0f0808eecdb54bd2.avif", images: ["38e741213269e58e0f0808eecdb54bd2.avif","3e660d84b622b7e3cd41db9b79707c9a.avif","708f803e62acd1dff76a167189b64b1c.avif","d39364e4-1667-11ee-8fd0-0a580a698dd1.avif","e4af9116843812b5625fb6820142e44d.avif"], category: "Gift Hampers" },
    "gift-hamper": { id: "gift-box", name: "Floral Rose Jewelry Gift Box", price: "Rs. 2,500", image: "38e741213269e58e0f0808eecdb54bd2.avif", images: ["38e741213269e58e0f0808eecdb54bd2.avif","3e660d84b622b7e3cd41db9b79707c9a.avif","708f803e62acd1dff76a167189b64b1c.avif","d39364e4-1667-11ee-8fd0-0a580a698dd1.avif","e4af9116843812b5625fb6820142e44d.avif"], category: "Gift Hampers" },
    "eternal-rose-bear": { id: "eternal-rose-bear", name: "Eternal Rose Bear Gift Box with Crown", price: "Rs. 6,059", image: "5bfd25a531b24d0c8e3edacc4a50b535-goods.avif", images: ["5bfd25a531b24d0c8e3edacc4a50b535-goods.avif","8afd27ab871c4ea7ae78a6ec75b379cd-goods.avif","9a22604e6edc4aa0bb5aaf0cd63b0ac1-goods.avif"], category: "Gift Hampers", description: "Simulation Flower Eternal Rose Bear Gift Box, with Crown, I Love You Heart Foil Balloon And Blank Heart Card, Artificial Eternal Flower Teddy Bear Valentine'S Day, Anniversary, Birthday, Wedding Romantic Gift, for Girlfriend Wife Mom" },
    "custom-pink-bow-graduation-gift-box": { id: "custom-pink-bow-graduation-gift-box", name: "Custom Pink Bow Graduation Gift Box", price: "Rs. 4,000", image: "18bb06d08e2942cc89dd157ccda174d3-goods.avif", images: ["18bb06d08e2942cc89dd157ccda174d3-goods.avif","39b24ca8f0b34151b850381d8b27e6bf-goods.avif","c6b81e9df0c64452a62cd5c20050c9fb-goods.avif","c98cef89fb4a4d089a006cbb360138ca-goods.avif","e229648da72948569bcc685c70439c5e-goods.avif"], variants: [{name:"White",images:["e229648da72948569bcc685c70439c5e-goods.avif"]},{name:"Pink",images:["c6b81e9df0c64452a62cd5c20050c9fb-goods.avif"]},{name:"Golden",images:["18bb06d08e2942cc89dd157ccda174d3-goods.avif"]},{name:"Black",images:["39b24ca8f0b34151b850381d8b27e6bf-goods.avif"]}], category: "Gift Hampers", description: "# 1pc Custom Pink Bow Tassel Graduation Cap Flip-Top Gift Box, Suitable for Elementary, Middle, High School, And University Graduation Ceremonies, Graduation Parties, Teacher-Student Exchange Gifts, Jewelry, Perfume, Makeup" },
    "leopard-print-heart-bow-foil-balloons": { id: "leopard-print-heart-bow-foil-balloons", name: "Leopard Print Heart Bow Foil Balloon Set", price: "Rs. 2,200", image: "0b7b760e-1878-41b0-a5a6-16cd90b21227.avif", images: ["0b7b760e-1878-41b0-a5a6-16cd90b21227.avif","10783b4d-eae0-4a9d-9bc6-3d886c78f47c.avif","d6815348-a69d-48a9-b5de-6e0f76d996ec.avif","f4a805ac-402f-40b0-96b2-7a09378bc60e.avif"], category: "Party & Event Decorations", description: "# 10pcs Leopard Print Heart Bow Foil Balloon Set, Includes 18-Inch Large Heart And 21-Inch Bow Balloons, Wild Fashion Design, Suitable for Birthday Party Decoration, Wedding Setup, New Year Valentine'S Day Celebration, Bachelor Party, Anniversary" },
    "pink-red-52pcs-balloon-set": { id: "pink-red-52pcs-balloon-set", name: "52pcs Pink & Red Balloon Set", price: "Rs. 2,300", image: "552e8228c69f47888d8e04385e0bbc71-goods.avif", images: ["552e8228c69f47888d8e04385e0bbc71-goods.avif","da0439de-a813-42e4-bab6-0947b7a98e50.avif"], category: "Party & Event Decorations", description: "# 52pcs Pink & Red Balloon Set, Metallic Red, Pink, Rose Red Latex Balloons for Birthday Parties, Showers, Weddings, Bridal Showers, Valentine's Day, and Romantic Proposal. Ideal Party Decorations for Girls and Ladies Celebrating Special Occasions" },
    "purple-butterfly-balloon-garland-129pcs": { id: "purple-butterfly-balloon-garland-129pcs", name: "129pcs Purple Butterfly Balloon Garland Arch Set", price: "Rs. 4,800", image: "8da1a943-2265-4f69-b7d4-8397157e0dd3.avif", images: ["8da1a943-2265-4f69-b7d4-8397157e0dd3.avif","b13b5e58-bfc7-4d83-88d0-26d5a5c09ac7.avif","f875ba32-af69-4fa2-bde9-c6dd7e2b2392.avif"], category: "Party & Event Decorations", description: "# 129pcs Purple Butterfly Balloon Garland Arch Set - Includes Curling Ribbon, Ideal for Weddings, Birthdays, Anniversaries, Spring Celebrations - Indoor/Outdoor Decor" },
    "pink-number-bow-party-balloons": { id: "pink-number-bow-party-balloons", name: "Pink Number Bow Party Balloons Set", price: "Rs. 2,000", image: "53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif", images: ["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif","95bb966a-f11b-4ca0-9494-d460d54e1f7c.avif"], variants: [{name:"0",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"1",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"2",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"3",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"4",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"5",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"6",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"7",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"8",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]},{name:"9",images:["53a0daed-7b9c-4b87-b0bf-5148cddecbd1.avif"]}], category: "Party & Event Decorations", description: "# 6pcs/set Pink Number Bow Party Balloons with Heart Balloons Set for Birthday Party, Gathering Decoration, Anniversary, Festival Celebration, Background Wall, Outdoor Party, Atmosphere, Photo Decorative Globs Supplies" },
    "2pcs-140cm-3d-self-standing-unicorn-foil-balloons": { id: "2pcs-140cm-3d-self-standing-unicorn-foil-balloons", name: "2pcs 140Cm Enormous 3D Self-Standing Unicorn Foil Balloons", price: "Rs. 3,000", image: "1e85751f2b1742babd4a86ca92e7d059-goods.avif", images: ["1e85751f2b1742babd4a86ca92e7d059-goods.avif","6b8a3f2d6b0b411aa5e87aef59014a1f-goods.avif","78f08d522e024909af878dd32ade2520-goods.avif","c5a4a174a689425aa875e75bc805d851-goods.avif","e473c7eefae9494cb4a69e012dda8ee4-goods.avif"], category: "Party & Event Decorations", description: "# 2pcs 140Cm Enormous 3D Self-Standing Unicorn Foil Balloons, Cartoon Rainbow Gradient Winged Unicorn Inflatable Mylar Balloons, Suitable for Birthdays, New Year, Anniversaries, Princess Parties, Showers, Weddings, Photo Booth Props, Party Supplies" },
    "photography-backdrop-2pcs": { id: "photography-backdrop-2pcs", name: "Photography Backdrop 2pcs Per Set", price: "Rs. 1,800", image: "33d1c291-e135-4126-b33b-43f1d6fe4156.avif", images: ["33d1c291-e135-4126-b33b-43f1d6fe4156.avif","6f104cf9-7f5b-43d4-b37c-9aa1238ca107.avif","ba36a84e-b21d-4d7e-a95d-a28df0f82e40.avif","c6cab58e-22c7-41c1-a0f8-e0f92ff23c4c.avif","e0145ba8-f170-4e78-b773-a0cdd59d8982.avif"], category: "Party & Event Decorations", description: "# photography backdrop 2pcs Per Set, Including a Pink And Blue Transparent Chiffon Background, for Gender-Revealing Shower Decoration, Valentine'S Day Confession Scene Setting Background Decoration, Scene Construction Supplies, And Beautiful Ribbons" },
    "pink-glowing-led-decorative-light": { id: "pink-glowing-led-decorative-light", name: "Pink Glowing LED Decorative Light", price: "Rs. 1,800", image: "5159fc82-de8c-4832-8813-0e1bdfa093c7.avif", images: ["5159fc82-de8c-4832-8813-0e1bdfa093c7.avif","83630d76-7320-4b69-bd72-a958f96d5490.avif","9e64d696-3e65-44da-95a4-232d4fab0d3d.avif","c0abb9f6-e5ae-4a0e-87ae-b608f8228b95.avif","edff4581-1099-4642-918e-a5aeaa386f73.avif"], category: "Gift Hampers", description: "# 1pc Pink Glowing LED Decorative Light with Glitter, 26 Letters and 10 Numbers, Suitable for Decorating Bedrooms, Birthday Parties, Weddings, and Family Christmas; Universal Holiday Decoration; Also Usable as a Photography Prop and Studio Lighting" },
    "2pcs-silicone-resin-mold-set": { id: "2pcs-silicone-resin-mold-set", name: "2pcs Silicone Resin Mold Set", price: "Rs. 3,000", image: "0d02e072190e4e56b4876d5dd19438f1-goods.avif", images: ["0d02e072190e4e56b4876d5dd19438f1-goods.avif","600bd72dae6c4aeca349e0ffa652b580-goods.avif","863c415f740f4b6b88f1297ebd26d8ea-goods.avif","e4abc05058a54d45a1afc362b12f4e2d-goods.avif","e72c86b1f6e341bdbd635d7992050951-goods.avif"], category: "Gift Hampers", description: "2pcs Silicone Resin Mold, Include Large Round Tray & Ring Holder Epoxy Resin Mold for Coaster, Fruit Board, Dish, Resin Painting Art, Jewelry Storage Plate, Home Decoration" },
    "transparent-ribbon-gift-box": { id: "transparent-ribbon-gift-box", name: "Transparent Ribbon Gift Box", price: "Rs. 3,000", image: "317b7792-fec1-4ae1-b378-0e9e13eb0abe.avif", images: ["317b7792-fec1-4ae1-b378-0e9e13eb0abe.avif","37db6e90-7833-408f-870c-4c76792a3e5a.avif","3d7146fa-5c3c-4fab-bc24-192850316064.avif"], category: "Gift Hampers", description: "Gift for Her/Him 1pc Transparent Gift Box - Clear Display Box, Open Design with Ribbon And Bow, Suitable for Jewelry, Cosplay Mannequins - Ideal for Retail Stores, Home Or Gifting, Jewelry Storage Box, Elegant Display, Sturdy Construction" },
    "pink-bow-gift-set": { id: "pink-bow-gift-set", name: "24-Piece Pink Bow Gift Set", price: "Rs. 3,000", image: "3d3eb01c-54f7-4a9a-a82c-0a3b771e6a9f.avif", images: ["3d3eb01c-54f7-4a9a-a82c-0a3b771e6a9f.avif","597e1b1c-f4dd-470b-bdab-488ca6f5beda.avif","699ae25f-d306-49a6-8836-1915cee82972.avif","78ba8bbf-68a7-49f7-8789-1b7a3957f254.avif","7ccdd798-8276-4935-8347-1d588bf6c147.avif"], category: "Gift Hampers", description: "Gift Set for Her/Him - 24pcs: 6 Mirrors + 6 Gift Bags + 6 Hair Ties + 6 Tag Cards. Pink Bow Party Gift Box. Multi-piece Party Favor Set, Bridesmaid Souvenirs, and Casual Birthday Gifts. Includes Folding Mirrors, Hair Ties, and Lanyard Thank You" },
    "foam-rose-bear": { id: "foam-rose-bear", name: "Romantic Foam Rose Bear Gift Box", price: "Rs. 4,000", image: "3f7ea2c1-b3cd-4b90-ba9a-3d0b075b576c.avif", images: ["3f7ea2c1-b3cd-4b90-ba9a-3d0b075b576c.avif","b8b17215aee975495e5b2663482ed9ef.avif","c465464f-275d-48d2-ac5f-822d329d1964.avif","d10d9298-f213-4d96-aa84-fe4bdb4e5e0e.avif"], category: "Gift Hampers", description: "1pc Rose Bear Artificial Foam Flowers Bear Romantic Creative Gifts for Valentines Day, Mothers Day, Anniversary, Wedding Birthday Gifts Christmas Gifts with Box" },
    "red-rose-bear": { id: "red-rose-bear", name: "Red Rose Bear Rotating Gift Box", price: "Rs. 5,000", image: "1ac13be0-8fd5-4936-b6c2-5b711d608318.avif", images: ["1ac13be0-8fd5-4936-b6c2-5b711d608318.avif","30eda5da-edef-4179-84c1-e84ec5ba2e9f.avif","667bd30e-1053-40df-9a04-572cb88428fc.avif","819c467e-29c9-48d7-b054-fc57b20ef7ff.avif","8edb78cd-3c97-4e36-b7ac-1b7c97afdbf9.avif","e0e61986-831b-4eed-805b-9cf3df2a91ea.avif"], category: "Gift Hampers" },
    "glow-rose-dome": { id: "glow-rose-dome", name: "Glow Rose Dome with LED Lights", price: "Rs. 2,500", image: "2494cdfc379a07711a3b05b87f82b635.avif", images: ["2494cdfc379a07711a3b05b87f82b635.avif","360580c0-8d2a-4eba-8299-6f168c49bd96.avif","c76adbeb-a54f-4d46-b544-34680dc2dba8.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953 (1).avif","f0248652-13c6-4e20-a1fa-c4b4f50d91bb.avif"], variants: [{name:"White Rose",images:["c76adbeb-a54f-4d46-b544-34680dc2dba8.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953.avif"]},{name:"Pink Rose",images:["2494cdfc379a07711a3b05b87f82b635.avif","360580c0-8d2a-4eba-8299-6f168c49bd96.avif"]},{name:"Red Rose",images:["dbe1bd57-c5eb-4541-8bc6-49f85d1cf953 (1).avif","f0248652-13c6-4e20-a1fa-c4b4f50d91bb.avif"]}], category: "Gift Hampers", description: "# 1pc Glow-in-the-Dark Rose Flower Decoration with LED-like Glow - Elegant Tabletop Centerpiece in Clear Dome, Battery-Powered (AAA Not Included) - Perfect Gift for Valentine's, Mother'S Day, Weddings, Birthdays, Christmas - Women'S Home Decor for Anniversary, Party, or Everyday Decoration, Romantic Present, Decorative Accent, Detailed Craftsmanship, Glow In Dark, Party Planners, Artificial Flowers, Flowers Artificial, Home Decor Items, Wedding Decorations" },
    "surprise-explosion-box": { id: "surprise-explosion-box", name: "5-Layer Surprise Explosion Gift Box", price: "Rs. 2,800", image: "a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif", images: ["a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif","01d65959-9f0b-4d27-bbc0-323414ec71ce.avif","2fb0de8e-e329-420e-b06e-baea1b747f0a.avif","5462fba9-7634-468b-801f-c9498c203949.avif","594299bc-ddc7-46aa-b566-c96ebe36012f.avif","b7d68682-40a2-4c90-b259-c589417f2053.avif","d2032f3b-bed3-408c-bc5c-c54ebdb73a0c.avif","d6168c1c-809d-4241-b506-ee49550c4ee6.avif"], variants: [{name:"Pink Pack",images:["d6168c1c-809d-4241-b506-ee49550c4ee6.avif"]},{name:"Santa Pack",images:["a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif"]}], category: "Gift Hampers", description: "Surprise Explosion Money Gift Box Gift Box The Love Box Birthday Valentine'S Explosion Box Surprise Snack Box 5 Layers (Red/Blue/Black/Pink)" },
    "personalized-3d-name-led-light": { id: "personalized-3d-name-led-light", name: "Personalized 3D Name LED Night Light", price: "Rs. 1,200", image: "29a8f0ee-7d22-4027-a5e8-13e120e43c50.avif", images: ["29a8f0ee-7d22-4027-a5e8-13e120e43c50.avif","a195172e-0c09-4f42-bc68-4133fba9f8f1.avif","ad4f27a3-04f3-46ee-95d2-4c5ac1025732.avif","d2daabcd-4367-4c67-b750-a9639603194a.avif"], category: "Gift Hampers", description: "[Customized Graduation Season] 1pc Personalized 3D Name LED Night Light – Customized Creativity for Birthday, Christmas & Graduation – Warm Ambient Decor Desk Lamp – Unforgettable Gift for Friends & Loved Ones" },
    "butterfly-acrylic-keepsake": { id: "butterfly-acrylic-keepsake", name: "Butterfly Acrylic Keepsake for Mom", price: "Rs. 1,500", image: "81f7b9c6-d837-43dd-8392-cf18ef9b275a.avif", images: ["81f7b9c6-d837-43dd-8392-cf18ef9b275a.avif","dd34973f-6a8e-4aff-bf2f-c2a69a6c5aba.avif"], category: "Gift Hampers", description: "A thoughtful butterfly-shaped 2D flat acrylic keepsake, gifted from a daughter or son to Mom. A lovely choice for Mother’s Day, birthdays and Christmas. Size: 9.91 × 6.86 cm." },
    "ribbon-bouquet": { id: "ribbon-bouquet", name: "Ribbon Bouquet", price: "Rs. 3,499", image: "images/flowers.jpg", images: ["images/flowers.jpg"], category: "Ribbon Bouquets" },
    "bag-1": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "hand-bag": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "bag": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "dress-1": { id: "dress-1", name: "Beautiful Dress", price: "Rs. 4,999", image: "images/dresses.jpg", images: ["images/dresses.jpg"], category: "Dresses" },
    "perfume-1": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/perfumes.jpg", images: ["images/perfumes.jpg"], category: "Perfumes" },
    "perfume": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/perfumes.jpg", images: ["images/perfumes.jpg"], category: "Perfumes" },
    "jewelry-1": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/jewellery.jpg", images: ["images/jewellery.jpg"], category: "Jewelry" },
    "jewelry": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/jewellery.jpg", images: ["images/jewellery.jpg"], category: "Jewelry" },
    "shoes-1": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/shoes.jpg", images: ["images/shoes.jpg"], category: "Shoes" },
    "shoes": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/shoes.jpg", images: ["images/shoes.jpg"], category: "Shoes" },
    "abaya": { id: "abaya", name: "Luxury Abaya", price: "Rs. 5,999", image: "images/abayas.jpg", images: ["images/abayas.jpg"], category: "Abayas" }
  };

  const cartPanel = $(".cart-panel");
  const wishlistPanel = $(".wishlist-panel");
  const cartItems = $(".cart-items");
  const wishlistItems = $(".wishlist-items");
  const cartCount = $(".cart-count");
  const wishlistButton = $(".wishlist-btn");
  const searchPopup = $(".search-popup");
  const searchInput = $("#searchInput");
  const sidebar = $(".sidebar");
  const menuOverlay = $(".menu-overlay");

  let wishlistCount = $(".wishlist-count");
  if (wishlistButton && !wishlistCount) {
    wishlistCount = document.createElement("span");
    wishlistCount.className = "wishlist-count";
    wishlistCount.textContent = "0";
    wishlistButton.appendChild(wishlistCount);
  }

  const updateCounts = function () {
    if (cartCount) cartCount.textContent = String(cart.length);
    if (wishlistCount) wishlistCount.textContent = String(wishlist.length);
  };
  const openPanel = function (panel) {
    if (panel) { panel.classList.add("active"); document.body.classList.add("panel-open"); }
  };
  const closePanel = function (panel) {
    if (!panel) return;
    panel.classList.remove("active");
    if (!$(".cart-panel.active") && !$(".wishlist-panel.active")) document.body.classList.remove("panel-open");
  };

  const renderCart = function () {
    if (cartItems) {
      if (!cart.length) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty 🛒</p>';
      } else {
        cartItems.innerHTML = cart.map(function (item, index) {
          return '<article class="cart-item"><img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.name) + '">' +
            '<div class="cart-info"><h4>' + escapeHTML(item.name) + '</h4><p>' + escapeHTML(item.price) + '</p>' +
            '<button type="button" class="remove-cart" data-index="' + index + '">Remove</button></div></article>';
        }).join("");
      }
    }
    updateCounts();
    saveCart();
  };

  const renderWishlist = function () {
    if (wishlistItems) {
      if (!wishlist.length) {
        wishlistItems.innerHTML = '<p class="empty-wishlist">Your wishlist is empty ❤️</p>';
      } else {
        wishlistItems.innerHTML = wishlist.map(function (item, index) {
          return '<article class="wishlist-item"><img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.name) + '">' +
            '<div class="wishlist-info"><h4>' + escapeHTML(item.name) + '</h4><p>' + escapeHTML(item.price) + '</p>' +
            '<button type="button" class="remove-wishlist" data-index="' + index + '">Remove</button></div></article>';
        }).join("");
      }
    }
    updateCounts();
    saveWishlist();
  };

  const productFromCard = function (card) {
    if (!card) return null;
    const title = $("h3", card) ? $("h3", card).textContent.trim() : "Product";
    return {
      id: card.dataset.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: title,
      price: $(".product-price", card) ? $(".product-price", card).textContent.trim() : "Price on request",
      image: $("img", card) ? $("img", card).getAttribute("src") : "",
      category: card.closest(".product-item") ? card.closest(".product-item").dataset.category : ""
    };
  };
  const addToCart = function (product) {
    if (!product) return;
    cart.push(product);
    renderCart();
    // Do not open/shift the cart drawer automatically; shoppers can open it
    // themselves from the header cart icon when they are ready.
  };
  const addToWishlist = function (product) {
    if (!product) return;
    if (wishlist.some(function (item) { return item.id === product.id; })) {
      alert("This product is already in your wishlist ❤️");
      return;
    }
    wishlist.push(product);
    renderWishlist();
    openPanel(wishlistPanel);
  };

  // Product details: working gallery and quick-order header.
  const productName = $("#productName");
  let detailProduct = null, detailImages = [], detailImageIndex = 0;
  const mainImage = $("#mainProductImage"), thumbnails = $("#productThumbnails");
  if (mainImage) mainImage.addEventListener("error", function () { this.onerror = null; this.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700"><rect width="100%" height="100%" fill="#fff0f6"/><text x="50%" y="48%" text-anchor="middle" font-family="Arial" font-size="32" fill="#b83f78">Product photo</text><text x="50%" y="56%" text-anchor="middle" font-family="Arial" font-size="18" fill="#8b6476">Upload product images to display here</text></svg>'); });
  const renderGallery = function () {
    if (!mainImage || !detailImages.length) return;
    detailImageIndex = Math.max(0, Math.min(detailImageIndex, detailImages.length - 1));
    mainImage.src = detailImages[detailImageIndex];
    mainImage.alt = (detailProduct ? detailProduct.name : "Product") + " photo " + (detailImageIndex + 1);
    if (thumbnails) thumbnails.innerHTML = detailImages.map(function(src,index) {
      return '<button type="button" class="product-thumb'+(index===detailImageIndex?' active':'')+'" data-gallery-index="'+index+'" aria-label="View photo '+(index+1)+'"><img src="'+escapeHTML(src)+'" alt=""></button>';
    }).join("");
    $$(".image-buttons button").forEach(function(btn){btn.disabled=detailImages.length<2;});
  };
  const showDetailImage = function(index){if(!detailImages.length)return;detailImageIndex=(index+detailImages.length)%detailImages.length;renderGallery();};
  // Keep galleries ready for up to six genuine product photos.
  const galleryTouchStart = { x: 0, y: 0 };
  if (mainImage) {
    mainImage.setAttribute("tabindex", "0");
    mainImage.setAttribute("role", "button");
    mainImage.setAttribute("aria-label", "Product photo. Swipe left or right to view more photos.");
    mainImage.addEventListener("touchstart", function(event) {
      if (!event.touches || !event.touches.length) return;
      galleryTouchStart.x = event.touches[0].clientX;
      galleryTouchStart.y = event.touches[0].clientY;
    }, { passive: true });
    mainImage.addEventListener("touchend", function(event) {
      if (!event.changedTouches || !event.changedTouches.length || detailImages.length < 2) return;
      const dx = event.changedTouches[0].clientX - galleryTouchStart.x;
      const dy = event.changedTouches[0].clientY - galleryTouchStart.y;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) showDetailImage(detailImageIndex + (dx < 0 ? 1 : -1));
    }, { passive: true });
    mainImage.addEventListener("keydown", function(event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); showDetailImage(detailImageIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showDetailImage(detailImageIndex + 1); }
    });
  }
  window.prevImage=function(){showDetailImage(detailImageIndex-1);};
  window.nextImage=function(){showDetailImage(detailImageIndex+1);};
  if(productName){
    const requestedId=new URLSearchParams(window.location.search).get("id")||"gift-box";
    detailProduct=products[requestedId]||products[requestedId.toLowerCase()];
    const price=$("#productPrice"),description=$("#productDescription");
    if(detailProduct){
      productName.textContent=detailProduct.name;
      if(price)price.textContent=detailProduct.price;
      detailImages=(detailProduct.images||[detailProduct.image]).filter(Boolean);renderGallery();
      const variantPicker=$("#productVariantPicker"),variantOptions=$("#productVariantOptions"),variantNote=$("#variantSelectionNote");
      if(detailProduct.variants && variantPicker && variantOptions){
        variantPicker.hidden=false;
        let selectedVariant=null;
        const renderVariantOptions=function(){
          variantOptions.innerHTML=detailProduct.variants.map(function(variant,index){
            const selected=!!selectedVariant && variant.name===selectedVariant.name;
            const swatch=variant.name.toLowerCase().includes("white")?"#fff":variant.name.toLowerCase().includes("pink")?"#f3a6c5":variant.name.toLowerCase().includes("gold")?"#d4af37":"#171717";
            return '<button type="button" class="product-variant-option'+(detailProduct.id==="pink-number-bow-party-balloons"?" number-variant-option":"")+(selected?' active':'')+'" data-variant-index="'+index+'" onclick="window.selectGraduationGiftColour('+index+')" aria-pressed="'+selected+'">'+(detailProduct.id==="pink-number-bow-party-balloons"?"":'<span class="variant-swatch" style="--variant-swatch:'+swatch+'"></span>')+escapeHTML(variant.name)+'</button>';
          }).join("");
          if(variantNote)variantNote.textContent=selectedVariant ? (detailProduct.id==="pink-number-bow-party-balloons" ? "Selected number: "+selectedVariant.name : "Selected colour: "+selectedVariant.name) : (detailProduct.id==="pink-number-bow-party-balloons" ? "Select a number from 0 to 9." : "Select a colour to view its matching gift box photo.");
        };
        window.selectGraduationGiftColour=function(chosenIndex){
          const chosen=detailProduct && detailProduct.variants && detailProduct.variants[chosenIndex];
          if(!chosen || !chosen.images || !chosen.images[0])return;
          const photo=chosen.images[0];
          selectedVariant=chosen;
          detailProduct.selectedVariant=chosen.name;
          const allPhotos=(detailProduct.images||[]).filter(Boolean);
          detailImages=[photo].concat(allPhotos.filter(function(src){return src!==photo;}));
          detailImageIndex=0;
          renderGallery();
          if(mainImage){mainImage.src=photo;mainImage.alt=detailProduct.name+" - "+chosen.name;}
          const selectedText=detailProduct.id==="pink-number-bow-party-balloons" ? " I want number "+chosen.name+"." : "";
          const updatedMessage="Assalam-o-Alaikum, I would like to order "+detailProduct.name+" ("+detailProduct.price+")."+selectedText+" Please share availability and delivery details.\nProduct link: "+window.location.href;
          const updatedHref="https://wa.me/923045255325?text="+encodeURIComponent(updatedMessage);
          ["#whatsappBtn",".product-header-whatsapp","#floatingProductWhatsApp"].forEach(function(selector){const link=$(selector);if(link)link.href=updatedHref;});
          renderVariantOptions();
        };
        renderVariantOptions();
        window.selectGraduationGiftColour(0);

      }
      const productDescriptions = {
        "2pcs-140cm-3d-self-standing-unicorn-foil-balloons": "# 2pcs 140Cm Enormous 3D Self-Standing Unicorn Foil Balloons, Cartoon Rainbow Gradient Winged Unicorn Inflatable Mylar Balloons, Suitable for Birthdays, New Year, Anniversaries, Princess Parties, Showers, Weddings, Photo Booth Props, Party Supplies",
        "photography-backdrop-2pcs": "# photography backdrop 2pcs Per Set, Including a Pink And Blue Transparent Chiffon Background, for Gender-Revealing Shower Decoration, Valentine'S Day Confession Scene Setting Background Decoration, Scene Construction Supplies, And Beautiful Ribbons",
        "custom-pink-bow-graduation-gift-box": "# 1pc Custom Pink Bow Tassel Graduation Cap Flip-Top Gift Box, Suitable for Elementary, Middle, High School, And University Graduation Ceremonies, Graduation Parties, Teacher-Student Exchange Gifts, Jewelry, Perfume, Makeup",
        "2pcs-silicone-resin-mold-set": "2pcs Silicone Resin Mold, Include Large Round Tray & Ring Holder Epoxy Resin Mold for Coaster, Fruit Board, Dish, Resin Painting Art, Jewelry Storage Plate, Home Decoration",
        "pink-glowing-led-decorative-light": "# 1pc Pink Glowing LED Decorative Light with Glitter, 26 Letters and 10 Numbers, Suitable for Decorating Bedrooms, Birthday Parties, Weddings, and Family Christmas; Universal Holiday Decoration; Also Usable as a Photography Prop and Studio Lighting",
        "pink-number-bow-party-balloons": "# 6pcs/set Pink Number Bow Party Balloons with Heart Balloons Set for Birthday Party, Gathering Decoration, Anniversary, Festival Celebration, Background Wall, Outdoor Party, Atmosphere, Photo Decorative Globs Supplies",
        "purple-butterfly-balloon-garland-129pcs": "# 129pcs Purple Butterfly Balloon Garland Arch Set - Includes Curling Ribbon, Ideal for Weddings, Birthdays, Anniversaries, Spring Celebrations - Indoor/Outdoor Decor",
        "pink-red-52pcs-balloon-set": "# 52pcs Pink & Red Balloon Set, Metallic Red, Pink, Rose Red Latex Balloons for Birthday Parties, Showers, Weddings, Bridal Showers, Valentine's Day, and Romantic Proposal. Ideal Party Decorations for Girls and Ladies Celebrating Special Occasions",
        "leopard-print-heart-bow-foil-balloons": "# 10pcs Leopard Print Heart Bow Foil Balloon Set, Includes 18-Inch Large Heart And 21-Inch Bow Balloons, Wild Fashion Design, Suitable for Birthday Party Decoration, Wedding Setup, New Year Valentine'S Day Celebration, Bachelor Party, Anniversary",
        "personalized-3d-name-led-light": "[Customized Graduation Season] 1pc Personalized 3D Name LED Night Light – Customized Creativity for Birthday, Christmas & Graduation – Warm Ambient Decor Desk Lamp – Unforgettable Gift for Friends & Loved Ones",
        "foam-rose-bear": "1pc Rose Bear Artificial Foam Flowers Bear Romantic Creative Gifts for Valentines Day, Mothers Day, Anniversary, Wedding Birthday Gifts Christmas Gifts with Box",
        "pink-bow-gift-set": "Gift Set for Her/Him - 24pcs: 6 Mirrors + 6 Gift Bags + 6 Hair Ties + 6 Tag Cards. Pink Bow Party Gift Box. Multi-piece Party Favor Set, Bridesmaid Souvenirs, and Casual Birthday Gifts. Includes Folding Mirrors, Hair Ties, and Lanyard Thank You",
        "transparent-ribbon-gift-box": "Gift for Her/Him 1pc Transparent Gift Box - Clear Display Box, Open Design with Ribbon And Bow, Suitable for Jewelry, Cosplay Mannequins - Ideal for Retail Stores, Home Or Gifting, Jewelry Storage Box, Elegant Display, Sturdy Construction",
        "eternal-rose-bear": "Simulation Flower Eternal Rose Bear Gift Box, with Crown, I Love You Heart Foil Balloon And Blank Heart Card, Artificial Eternal Flower Teddy Bear Valentine'S Day, Anniversary, Birthday, Wedding Romantic Gift, for Girlfriend Wife Mom",
        "surprise-explosion-box": "Surprise Explosion Money Gift Box Gift Box The Love Box Birthday Valentine'S Explosion Box Surprise Snack Box 5 Layers (Red/Blue/Black/Pink)",
        "glow-rose-dome": "# 1pc Glow-in-the-Dark Rose Flower Decoration with LED-like Glow - Elegant Tabletop Centerpiece in Clear Dome, Battery-Powered (AAA Not Included) - Perfect Gift for Valentine's, Mother'S Day, Weddings, Birthdays, Christmas - Women'S Home Decor for Anniversary, Party, or Everyday Decoration, Romantic Present, Decorative Accent, Detailed Craftsmanship, Glow In Dark, Party Planners, Artificial Flowers, Flowers Artificial, Home Decor Items, Wedding Decorations",
        "red-rose-bear": "1pc Red Rose Bear Gift Box with Decorative Gift Packaging, 360° Rotating Artificial Rose Bear Display Box, Romantic Flower Bear Gift for Her Girlfriend Wife Mom, Valentine'S Day Mother'S Day Wedding Season Birthday Anniversary Gift",
        "Gift Hampers": "Add a graceful floral touch to your special moments with this rose-decorated jewelry gift box. Its elegant presentation makes it a lovely choice for storing or gifting earrings, rings and necklaces, and for birthdays, weddings, anniversaries and celebrations.",
        "Ribbon Bouquets": "A charming ribbon bouquet designed to add a graceful touch to meaningful moments. A beautiful keepsake-style gift for birthdays, celebrations, anniversaries and heartfelt surprises.",
        "Bags": "Complete your everyday and occasion looks with this elegant handbag. Its versatile design pairs effortlessly with a range of outfits, making it a stylish accessory for day-to-day use and outings.",
        "Dresses": "Refresh your wardrobe with this stylish outfit, selected for its graceful look and versatile appeal. A lovely option for gatherings, festive moments and polished everyday dressing.",
        "Perfumes": "Add a refined finishing touch to your routine with this fragrance. A thoughtful choice for personal use or gifting, ideal for those who enjoy a fresh and memorable scent.",
        "Jewelry": "Elevate your look with this elegant jewelry piece. Its decorative detailing makes it a beautiful finishing touch for festive outfits, celebrations and special occasions.",
        "Shoes": "Step out in style with this versatile pair of ladies' shoes. Designed to complement a variety of looks, it is a lovely choice for everyday wear and casual outings.",
        "Abayas": "A graceful abaya that brings together modest styling and timeless elegance. A versatile wardrobe choice for everyday wear, gatherings and occasions.",
      };
      if(description) description.textContent = productDescriptions[detailProduct.id] || productDescriptions[detailProduct.category] || "Explore this thoughtfully selected piece from Neha Rani Studio. For product details, availability and ordering assistance, contact our team on WhatsApp.";
      const productHighlights = {
        "red-rose-bear": [
          ["Romantic rose bear design", "A charming bear made with artificial red roses for a memorable gifting moment."],
          ["360° rotating display", "A decorative rotating display box that lets the rose bear be admired from every angle."],
          ["Made for special occasions", "A thoughtful gift for birthdays, anniversaries, weddings, Valentine’s Day and Mother’s Day."]
        ],
        "gift-box": [
          ["Elegant rose decoration", "A pretty floral design that gives this jewelry gift box a romantic, gift-ready look."],
          ["For jewelry keepsakes", "A lovely box for presenting or keeping earrings, rings and necklaces together."],
          ["Perfect for special occasions", "A thoughtful choice for birthdays, weddings, anniversaries and celebration gifting."]
        ],
        "ribbon-bouquet": [
          ["Charming ribbon details", "A decorative bouquet with a soft, graceful look that stands out from traditional flowers."],
          ["A keepsake-style surprise", "A sweet choice when you want your gift to feel memorable beyond the occasion."],
          ["Perfect for celebrations", "A thoughtful pick for birthdays, anniversaries and little moments worth celebrating."]
        ],
        "bag-1": [
          ["Easy to style", "A versatile handbag that can complement both everyday outfits and dressed-up looks."],
          ["A polished finishing touch", "An accessory that adds a neat, elegant detail to your overall outfit."],
          ["For everyday moments", "A stylish pick for outings, meet-ups and occasions when you want to carry your essentials."]
        ],
        "dress-1": [
          ["Graceful look", "A stylish outfit chosen for an elegant look at gatherings and special moments."],
          ["Easy outfit inspiration", "Pair it with your favourite accessories to create a look that feels your own."],
          ["For special plans", "A lovely wardrobe choice for festive moments, get-togethers and occasions."]
        ],
        "perfume-1": [
          ["A finishing touch", "A fragrance choice to complete your getting-ready routine."],
          ["Lovely gifting idea", "A thoughtful option for someone who enjoys adding fragrance to their day."],
          ["Everyday or occasion", "A little extra detail for daily routines, celebrations and special plans."]
        ],
        "jewelry-1": [
          ["Decorative detail", "A beautiful finishing touch to bring extra interest to your favourite outfits."],
          ["Occasion-ready styling", "A lovely accessory choice for festive looks, celebrations and gatherings."],
          ["Easy to pair", "Style it with traditional or modern outfits to make the look your own."]
        ],
        "shoes-1": [
          ["Versatile styling", "A pair that can be styled with a range of casual and dressed-up outfits."],
          ["A complete look", "The finishing detail that helps bring your outfit together."],
          ["For your plans", "A style choice for everyday outings, meet-ups and special occasions."]
        ],
        "abaya": [
          ["Modest elegance", "A graceful style that brings a refined touch to modest dressing."],
          ["Timeless wardrobe choice", "An easy piece to reach for when you want a simple, elegant look."],
          ["Versatile styling", "A lovely option for everyday wear, gatherings and special occasions."]
        ]
      };
      const reviewGrid = $("#productReviewGrid");
      if (reviewGrid) {
        const highlights = productHighlights[detailProduct.id] || [
          ["Thoughtfully selected", "A considered addition to the Neha Rani Studio collection."],
          ["Style it your way", "Make this piece your own with the accessories and details you love."],
          ["A lovely choice", "Explore this item for everyday moments, gifting or a special occasion."]
        ];
        reviewGrid.innerHTML = highlights.map(function (item) {
          return '<article class="review-card product-highlight-card"><span class="product-highlight-icon" aria-hidden="true">✧</span><p>' + escapeHTML(item[1]) + '</p><h4>' + escapeHTML(item[0]) + '</h4></article>';
        }).join("");
      }

      const detailAdd=$("#detailAddCart");
      if(detailAdd)detailAdd.addEventListener("click",function(){addToCart(Object.assign({},detailProduct));});
      const numberChoice=detailProduct.id==="pink-number-bow-party-balloons" && detailProduct.selectedVariant ? " I want number "+detailProduct.selectedVariant+"." : "";
      const message="Assalam-o-Alaikum, I would like to order "+detailProduct.name+" ("+detailProduct.price+")."+numberChoice+" Please share availability and delivery details.";
      const orderMessage=message+"\nProduct link: "+window.location.href;
      const waHref="https://wa.me/923045255325?text="+encodeURIComponent(orderMessage);
      const buyNow=$("#whatsappBtn"),headerWA=$(".product-header-whatsapp"),floatingWA=$("#floatingProductWhatsApp");
      if(buyNow)buyNow.href=waHref;
      if(headerWA)headerWA.href=waHref;
      if(floatingWA)floatingWA.href=waHref;
    }else{productName.textContent="Product not found";if(description)description.textContent="This product link may be outdated. Please return to the homepage to browse available products.";}
  }
  if(thumbnails)thumbnails.addEventListener("click",function(event){const thumb=event.target.closest("[data-gallery-index]");if(thumb)showDetailImage(Number(thumb.dataset.galleryIndex));});
  const topAddCart=$("#topAddCart"), floatingAddCart=$("#floatingAddCart"), floatingWishlist=$("#floatingWishlist");
  const addCurrentProductToCart=function(){if(detailProduct)addToCart(Object.assign({},detailProduct));};
  if(topAddCart)topAddCart.addEventListener("click",addCurrentProductToCart);
  if(floatingAddCart)floatingAddCart.addEventListener("click",addCurrentProductToCart);
  const closeSearchPopup = function () {
    if (searchPopup) searchPopup.classList.remove("active");
  };
  const filterProducts = function (category) {
    $$(".product-item").forEach(function (item) {
      const visible = category === "all" || item.dataset.category === category;
      item.hidden = !visible;
      item.style.display = visible ? "" : "none";
    });
    if (searchInput) searchInput.value = "";
    $("#featured-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const normalizeSearch = function (value) {
    return String(value || "").toLowerCase().trim()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };
  const filterBySearch = function (term) {
    const value = normalizeSearch(term);
    const words = value.split(" ").filter(Boolean);
    const items = $$(".product-item");
    const details = items.map(function (item) {
      const card = $(".product-card", item);
      const image = $("img", card || item);
      return {
        item: item,
        category: normalizeSearch(item.dataset.category || ""),
        name: normalizeSearch($("h3", card || item)?.textContent || ""),
        alt: normalizeSearch(image?.alt || ""),
        id: normalizeSearch(card?.dataset.id || "")
      };
    });
    // If the search matches a category, show every product in that category only.
    const matchingCategories = details.map(function (p) { return p.category; }).filter(function (category, index, all) {
      return category && all.indexOf(category) === index &&
        words.length && words.every(function (word) { return category.includes(word); });
    });
    let matches = 0;
    details.forEach(function (p) {
      const categoryMatch = matchingCategories.length
        ? matchingCategories.includes(p.category)
        : (!value || words.every(function (word) {
            return (p.name + " " + p.alt + " " + p.id).includes(word);
          }));
      const visible = !value || categoryMatch;
      p.item.hidden = !visible;
      p.item.style.display = visible ? "" : "none";
      if (visible && value) matches++;
    });
    const empty = $("#noSearchResults");
    if (empty) empty.hidden = matches > 0 || !value;
    return matches;
  };
  const submitProductSearch = function (term) {
    const query = String(term || "").trim();
    if (!query) return;
    if (!$("#featured-products") && !$(".product-item").length) {
      window.location.href = "index.html?search=" + encodeURIComponent(query) + "#featured-products";
      return;
    }
    filterBySearch(query);
    if (searchInput) searchInput.value = query;
    const heading = $("#featured-products .section-heading h2");
    if (heading) heading.textContent = 'Search Results for "' + query + '"';
    $("#featured-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  function showAllProducts() {
    $(".product-item").forEach(function (item) { item.hidden = false; item.style.display = ""; });
  }

  document.addEventListener("click", function (event) {
    const buyNowButton = event.target.closest(".buy-now");
    if (buyNowButton) {
      event.preventDefault(); event.stopPropagation();
      const product = productFromCard(buyNowButton.closest(".product-card"));
      if (product) {
        const message = "Assalam-o-Alaikum Neha Rani Studio! I would like to buy " + product.name + " (" + product.price + "). Please confirm availability and delivery details.";
        window.open("https://wa.me/923045255325?text=" + encodeURIComponent(message), "_blank", "noopener");
      }
      return;
    }
    const addButton = event.target.closest(".add-cart");
    if (addButton && !addButton.id) {
      event.preventDefault(); event.stopPropagation();
      addToCart(productFromCard(addButton.closest(".product-card")));
      return;
    }
    const wishButton = event.target.closest(".wishlist-add, #floatingWishlist");
    if (wishButton) {
      event.preventDefault();
      event.stopPropagation();
      const product = wishButton.id === "floatingWishlist" || wishButton.id === "detailWishlist"
        ? detailProduct
        : productFromCard(wishButton.closest(".product-card"));
      addToWishlist(product ? Object.assign({}, product) : null);
      return;
    }
    const removeCart = event.target.closest(".remove-cart");
    if (removeCart) { cart.splice(Number(removeCart.dataset.index), 1); renderCart(); return; }
    const removeWish = event.target.closest(".remove-wishlist");
    if (removeWish) { wishlist.splice(Number(removeWish.dataset.index), 1); renderWishlist(); return; }

    const card = event.target.closest(".product-card");
    if (card && !event.target.closest("button") && card.dataset.id) {
      window.location.href = "product.html?id=" + encodeURIComponent(card.dataset.id);
      return;
    }
    const collectionShortcut = event.target.closest(".collection-shortcuts a[data-category]");
    if (collectionShortcut) {
      event.preventDefault();
      filterProducts(collectionShortcut.dataset.category);
      window.location.hash = "featured-products";
      return;
    }
    const categoryCard = event.target.closest(".category-card");
    if (categoryCard && categoryCard.dataset.category) filterProducts(categoryCard.dataset.category);

    if (event.target.closest(".cart-btn")) openPanel(cartPanel);
    if (event.target.closest(".wishlist-btn")) openPanel(wishlistPanel);
    if (event.target.closest(".close-cart")) closePanel(cartPanel);
    if (event.target.closest(".close-wishlist")) closePanel(wishlistPanel);
    if (event.target.closest(".close-search")) closeSearchPopup();
    if (event.target === searchPopup) closeSearchPopup();
    if (event.target.closest(".search-btn") && searchPopup) {
      searchPopup.classList.add("active");
      setTimeout(function () { if (searchInput) searchInput.focus(); }, 100);
    }
    if (event.target.closest(".search-submit")) {
      submitProductSearch(searchInput ? searchInput.value : "");
      closeSearchPopup();
    }
    if (event.target.closest(".mobile-search-submit")) runSearchFromMobile();
    const footerCategory = event.target.closest(".footer-box a[data-category]");
    if (footerCategory) {
      event.preventDefault();
      filterProducts(footerCategory.dataset.category);
      window.location.hash = "featured-products";
    }
    if (event.target.closest("#viewAllReviews")) {
      event.preventDefault();
      $("#reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (event.target.closest("#viewAllProducts, #footerAllProducts")) {
      event.preventDefault();
      filterProducts("all");
    }
    if (event.target.closest(".checkout-btn")) {
      if (!cart.length) {
        alert("Your cart is empty. Please add a product first.");
      } else {
        const orderLines = cart.map(function (item, index) {
          return (index + 1) + ". " + item.name + " - " + item.price;
        }).join("\n");
        const message = "Assalam-o-Alaikum Neha Rani Studio! I would like to place an order:\n" +
          orderLines + "\n\nPlease confirm availability, total and delivery details.";
        window.open("https://wa.me/923045255325?text=" + encodeURIComponent(message), "_blank", "noopener");
      }
    }
    if (event.target.closest("#menuBtn")) {
      sidebar?.classList.add("active"); menuOverlay?.classList.add("active");
      document.body.classList.add("menu-open");
    }
    if (event.target === menuOverlay || event.target.closest(".sidebar a")) {
      sidebar?.classList.remove("active"); menuOverlay?.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
    if (event.target.closest("#topBtn")) window.scrollTo({ top: 0, behavior: "smooth" });
  });  if (searchInput) {
    searchInput.addEventListener("input", function () { filterBySearch(searchInput.value); });
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        submitProductSearch(searchInput.value); closeSearchPopup();
      }
    });
  }
  $$(".sidebar [data-category]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      $$(".sidebar [data-category]").forEach(function (item) { item.classList.remove("active"); });
      link.classList.add("active");
      filterProducts(link.dataset.category || "all");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePanel(cartPanel); closePanel(wishlistPanel); closeSearchPopup();
      sidebar?.classList.remove("active"); menuOverlay?.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
  document.addEventListener("click", function (event) {
    const clickedWishlistControl = event.target.closest(".wishlist-btn, .wishlist-add, #detailWishlist, #floatingWishlist");
    const clickedCartControl = event.target.closest(".cart-btn, .add-cart, #detailAddCart, #topAddCart, #floatingAddCart");
    if (cartPanel?.classList.contains("active") && !cartPanel.contains(event.target) && !clickedCartControl) closePanel(cartPanel);
    if (wishlistPanel?.classList.contains("active") && !wishlistPanel.contains(event.target) && !clickedWishlistControl) closePanel(wishlistPanel);
  });

  if (window.Swiper) {
    if ($(".heroSwiper")) new Swiper(".heroSwiper", {
      loop: true, speed: 700, autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".heroSwiper .swiper-pagination", clickable: true }
    });
    if ($(".categorySwiper")) new Swiper(".categorySwiper", {
      slidesPerView: "auto",
      slidesPerGroup: 1,
      spaceBetween: 10,
      freeMode: false,
      watchOverflow: false,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      simulateTouch: true,
      allowTouchMove: true,
      grabCursor: true,
      touchRatio: 1,
      touchAngle: 45,
      threshold: 3,
      longSwipes: true,
      shortSwipes: true,
      resistance: true,
      resistanceRatio: 0.85,
      touchStartPreventDefault: false,
      preventInteractionOnTransition: false,
      breakpoints: {
        0: { spaceBetween: 10 },
        481: { spaceBetween: 14 },
        769: { spaceBetween: 18 },
        1025: { spaceBetween: 20 }
      }
    });
  }

  const topButton = $("#topBtn");
  const header = $(".header");
  const updateScrollUI = function () {
    if (topButton) topButton.classList.toggle("show", window.scrollY > 350);
    if (header) header.classList.toggle("header-scroll", window.scrollY > 40);
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("fade-show"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    $$(".product-card, .category-card, .review-card, .offer-content").forEach(function (element) {
      element.classList.add("fade-hidden"); observer.observe(element);
    });
  }
  $$("img").forEach(function (img) {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });

  const initialSearch = new URLSearchParams(window.location.search).get("search");
  if (initialSearch) submitProductSearch(initialSearch);
  renderCart();
  renderWishlist();
});
