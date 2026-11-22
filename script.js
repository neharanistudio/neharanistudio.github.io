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

  let cart = safeRead("nrs_cart", safeRead("cart", [])).filter(function (item) { return item && item.id !== "dress-1"; });
  let wishlist = safeRead("nrs_wishlist", safeRead("wishlist", [])).filter(function (item) { return item && item.id !== "dress-1"; });
  const saveCart = function () {
    localStorage.setItem("nrs_cart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const saveWishlist = function () {
    localStorage.setItem("nrs_wishlist", JSON.stringify(wishlist));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const products = {
    "10pcs-press-on-nails": { id: "10pcs-press-on-nails", name: "10pcs Press On Nails", price: "Rs. 600", image: "21a72ade-a66a-4bb4-9fd5-d403035930db.avif", images: ["21a72ade-a66a-4bb4-9fd5-d403035930db.avif","719fb30e-5471-4d1b-a0e9-1d36ab406417.avif","945205f1-c851-4e6d-af9b-878f42e798eb.avif","dc115add-739f-4f82-9ee2-dac009fc60b2.avif"], category: "Makeup", subcategory: "Nails", description: "10pcs Press On Nails Medium Almond Glossy French Tip Black Polka Dots 3D Flower Design Nude Pink Cream White Golden Full Cover Reusable False Nails for Women Minimalist Elegant Daily Office Nail Art" },
    "miqh-diamond-gel-nail-polish": { id: "miqh-diamond-gel-nail-polish", name: "MIQH Diamond Gel Nail Polish", price: "Rs. 900", image: "08f5ab11-ed42-4bce-b579-7dbec3a232ba.avif", images: ["08f5ab11-ed42-4bce-b579-7dbec3a232ba.avif","19696647-33fe-4d69-b91f-289d833dd454.avif","20c5eb9c-6bf8-4466-acfd-4e3c7369a60d.avif","2da720aa-e05a-4f84-9c80-7bd748bfd37b.avif","425cd2ad-edcf-474b-85a8-3f5c5e401413.avif","7f611c0d-d036-4349-9fc7-9b8e809b8f1a.avif"], category: "Makeup", subcategory: "Nail Polish", description: "# MIQH Single Pack Diamond Gel Nail Polish - Long-Lasting Shine LED Cured Nail Polish, Vibrant Colors, Professional Nail Design And Additions | Shiny Colorful Diamond Gel Nail Polish 7Ml, Nail Polish, Gel Nail Polish Under Light, Women'S Nail Polish" },
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
    "velvet-matte-lipstick": { id: "velvet-matte-lipstick", name: "Velvet Matte Lipstick", price: "Rs. 1,500", image: "2d60de12-e416-463f-8f97-d7d141cc6ce0.avif", images: ["2d60de12-e416-463f-8f97-d7d141cc6ce0.avif","450cde8b-b890-4ca5-aa62-0d3299b49189.avif","65116518-9c92-48e1-b38b-4905cfcf3bd6.avif","c5412811-94e7-4841-9359-ce903bf449ee (1).avif","e1c4e14c-f098-4371-b3fb-c477d0edbac4.avif"], category: "Makeup", subcategory: "Lipstick & Lip Gloss", description: "1pc Velvet Matte Lipstick Red Tone Lip Gloss Long Lasting Smudge Proof Waterproof Non Drying Christmas Surprise Gift" },
    "12-color-lip-oil": { id: "12-color-lip-oil", name: "12-Color Moisturizing Lip Oil", price: "Rs. 1,200", image: "62c1d17f-2411-47ec-a7d4-19baaa65546d.avif", images: ["62c1d17f-2411-47ec-a7d4-19baaa65546d.avif","75d0f53a-dec1-414f-a4cb-35cb81c2a1d9.avif","a251d316-8c5d-4398-9dbc-885b7ef53bf6.avif"], category: "Makeup", subcategory: "Lipstick & Lip Gloss", description: "# Lip Oil, 12 Colors Moisturizing Hydrating Candy Lip Glaze, Mirror Shine Pearl Nude Lip Tint, Natural Lip Gloss For Daily Use" },
        "6-color-liquid-blush": { id: "6-color-liquid-blush", name: "6-Color Liquid Blush", price: "Rs. 2,300", image: "4f29f25b-11c4-4313-b5e9-63d887df5446.avif", images: ["4f29f25b-11c4-4313-b5e9-63d887df5446.avif","57e9f786-0dad-4300-a569-ae409b644afd.avif","7ceccd53-2eb3-45a5-9a63-480ba0b3b7ef.avif","8175dedb-927f-489b-9ad9-d31f6189c3a5.avif","d94df7e6-84df-4cd3-a550-c99aa2c97024.avif","eea26bc2-3f99-49e0-9564-b090d556c5f6.avif"], variants: [{name:"1",images:["4f29f25b-11c4-4313-b5e9-63d887df5446.avif"]},{name:"2",images:["57e9f786-0dad-4300-a569-ae409b644afd.avif"]},{name:"3",images:["7ceccd53-2eb3-45a5-9a63-480ba0b3b7ef.avif"]},{name:"4",images:["8175dedb-927f-489b-9ad9-d31f6189c3a5.avif"]},{name:"5",images:["d94df7e6-84df-4cd3-a550-c99aa2c97024.avif"]},{name:"6",images:["eea26bc2-3f99-49e0-9564-b090d556c5f6.avif"]}], category: "Makeup", subcategory: "Blush, Highlighter & Contour", description: "# 6-Color Liquid Blush, Brightening And Waterproof, Easy to Use" },
"glow-rose-dome": { id: "glow-rose-dome", name: "Glow Rose Dome with LED Lights", price: "Rs. 2,500", image: "2494cdfc379a07711a3b05b87f82b635.avif", images: ["2494cdfc379a07711a3b05b87f82b635.avif","360580c0-8d2a-4eba-8299-6f168c49bd96.avif","c76adbeb-a54f-4d46-b544-34680dc2dba8.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953 (1).avif","f0248652-13c6-4e20-a1fa-c4b4f50d91bb.avif"], variants: [{name:"White Rose",images:["c76adbeb-a54f-4d46-b544-34680dc2dba8.avif","dbe1bd57-c5eb-4541-8bc6-49f85d1cf953.avif"]},{name:"Pink Rose",images:["2494cdfc379a07711a3b05b87f82b635.avif","360580c0-8d2a-4eba-8299-6f168c49bd96.avif"]},{name:"Red Rose",images:["dbe1bd57-c5eb-4541-8bc6-49f85d1cf953 (1).avif","f0248652-13c6-4e20-a1fa-c4b4f50d91bb.avif"]}], category: "Gift Hampers", description: "# 1pc Glow-in-the-Dark Rose Flower Decoration with LED-like Glow - Elegant Tabletop Centerpiece in Clear Dome, Battery-Powered (AAA Not Included) - Perfect Gift for Valentine's, Mother'S Day, Weddings, Birthdays, Christmas - Women'S Home Decor for Anniversary, Party, or Everyday Decoration, Romantic Present, Decorative Accent, Detailed Craftsmanship, Glow In Dark, Party Planners, Artificial Flowers, Flowers Artificial, Home Decor Items, Wedding Decorations" },
    "surprise-explosion-box": { id: "surprise-explosion-box", name: "5-Layer Surprise Explosion Gift Box", price: "Rs. 2,800", image: "a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif", images: ["a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif","01d65959-9f0b-4d27-bbc0-323414ec71ce.avif","2fb0de8e-e329-420e-b06e-baea1b747f0a.avif","5462fba9-7634-468b-801f-c9498c203949.avif","594299bc-ddc7-46aa-b566-c96ebe36012f.avif","b7d68682-40a2-4c90-b259-c589417f2053.avif","d2032f3b-bed3-408c-bc5c-c54ebdb73a0c.avif","d6168c1c-809d-4241-b506-ee49550c4ee6.avif"], variants: [{name:"Pink Pack",images:["d6168c1c-809d-4241-b506-ee49550c4ee6.avif"]},{name:"Santa Pack",images:["a26d2bc5-eaa3-4f64-917c-b38a9beb5660.avif"]}], category: "Gift Hampers", description: "Surprise Explosion Money Gift Box Gift Box The Love Box Birthday Valentine'S Explosion Box Surprise Snack Box 5 Layers (Red/Blue/Black/Pink)" },
    "personalized-3d-name-led-light": { id: "personalized-3d-name-led-light", name: "Personalized 3D Name LED Night Light", price: "Rs. 1,200", image: "29a8f0ee-7d22-4027-a5e8-13e120e43c50.avif", images: ["29a8f0ee-7d22-4027-a5e8-13e120e43c50.avif","a195172e-0c09-4f42-bc68-4133fba9f8f1.avif","ad4f27a3-04f3-46ee-95d2-4c5ac1025732.avif","d2daabcd-4367-4c67-b750-a9639603194a.avif"], category: "Gift Hampers", description: "[Customized Graduation Season] 1pc Personalized 3D Name LED Night Light – Customized Creativity for Birthday, Christmas & Graduation – Warm Ambient Decor Desk Lamp – Unforgettable Gift for Friends & Loved Ones" },
    "butterfly-acrylic-keepsake": { id: "butterfly-acrylic-keepsake", name: "Butterfly Acrylic Keepsake for Mom", price: "Rs. 1,500", image: "81f7b9c6-d837-43dd-8392-cf18ef9b275a.avif", images: ["81f7b9c6-d837-43dd-8392-cf18ef9b275a.avif","dd34973f-6a8e-4aff-bf2f-c2a69a6c5aba.avif"], category: "Gift Hampers", description: "A thoughtful butterfly-shaped 2D flat acrylic keepsake, gifted from a daughter or son to Mom. A lovely choice for Mother’s Day, birthdays and Christmas. Size: 9.91 × 6.86 cm." },
    "ribbon-bouquet": { id: "ribbon-bouquet", name: "Ribbon Bouquet", price: "Rs. 3,499", image: "images/flowers.jpg", images: ["images/flowers.jpg"], category: "Ribbon Bouquets" },
    "bag-1": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "2pcs-lip-liner-glaze-set": { id: "2pcs-lip-liner-glaze-set", name: "2pcs Lip Liner & Glaze Set", price: "Rs. 2,000", image: "4032215e-6f17-4f0f-bb73-8a4e12928036.avif", images: ["4032215e-6f17-4f0f-bb73-8a4e12928036.avif","5a84fbea-31f0-4893-8ba3-c8ed2f987d69 (1).avif","90d8221b-88d7-4c72-9901-5c801674cecc (1).avif","aead4df6-ddba-4333-8bce-270535f1d245.avif"], category: "Makeup", subcategory: "Lipstick & Lip Gloss", description: "# 2pcs Lip Liner & Glaze Set - Create Full Lips, Smooth Color Application, Natural Lip Line, Waterproof & Long-Lasting, Ideal for Everyday, Parties & Dates, Christmas Beauty Gift" },
    "sweet-fashion-polka-dot-leopard-floral-ring": { id: "sweet-fashion-polka-dot-leopard-floral-ring", name: "Sweet Fashion Large Flower Ring", price: "Rs. 750", image: "686e5f3a-c371-4aa5-ad19-d6aab1577a7c.avif", images: ["686e5f3a-c371-4aa5-ad19-d6aab1577a7c.avif","9598c662-65f0-44a9-a2f6-a12cc4ed8d16.avif"], category: "Jewelry", subcategory: "Rings", description: "# 1pc Sweet Fashion Light Luxury Elegant Black And White Polka Dot Leopard Print Floral Pattern Large Flower Ring Suitable for Women'S Daily Casual Wear Trendy All-Match Holiday Gift" },
    "womens-crisscross-strap-geometric-chunky-heel-sandals": { id: "womens-crisscross-strap-geometric-chunky-heel-sandals", name: "Women's Crisscross Strap Chunky Heel Sandals", price: "Rs. 3,800", image: "1e049710-6f26-4fc4-916f-e5d42627eaba.avif", images: ["1e049710-6f26-4fc4-916f-e5d42627eaba.avif","3ace2abe-c302-4d2e-882f-90f371d37cb8.avif","7a241753-bd8f-4aea-b5c6-c137b6d0a887.avif","df2d7451-7d2a-4acc-856d-935abf570305.avif"], variants: [{name:"White",images:["1e049710-6f26-4fc4-916f-e5d42627eaba.avif","3ace2abe-c302-4d2e-882f-90f371d37cb8.avif"]},{name:"Golden",images:["7a241753-bd8f-4aea-b5c6-c137b6d0a887.avif","df2d7451-7d2a-4acc-856d-935abf570305.avif"]}], category: "Shoes", subcategory: "Women's Shoes", description: "# Women's Crisscross Strap High Heel Sandals, Square Toe Triangle Geometric Shaped Chunky Heel, Backless Sandals, Women's Party Wedding Dinner Dress Shoes, Women Shoes" },
    "y2k-bow-shaped-evening-bag": { id: "y2k-bow-shaped-evening-bag", name: "Y2K Bow-Shaped Evening Bag", price: "Rs. 3,000", image: "463070d5-7fb6-429c-bb24-669bed065257.avif", images: ["463070d5-7fb6-429c-bb24-669bed065257.avif","62f3ab9f-9b95-49c8-bdad-f7aa0f838505.avif","6e37170d-b38c-4e73-a01f-764b3c3c072e.avif","c422c416-6b2d-4282-84fb-f49cc8c18d2b.avif","cb145270-9daa-4183-b6c6-7edbe4e51fb5.avif","cc4d45d2-8ed3-4512-8977-d47c642e918d.avif"], variants: [{name:"Golden",images:["c422c416-6b2d-4282-84fb-f49cc8c18d2b.avif","cb145270-9daa-4183-b6c6-7edbe4e51fb5.avif","cc4d45d2-8ed3-4512-8977-d47c642e918d.avif"]},{name:"Silvery",images:["463070d5-7fb6-429c-bb24-669bed065257.avif","62f3ab9f-9b95-49c8-bdad-f7aa0f838505.avif","6e37170d-b38c-4e73-a01f-764b3c3c072e.avif"]}], category: "Bags", subcategory: "Women's Clutches & Evening Bags", description: "# Exquisite, Elegant, and Stylish Y2K Style Bow-Shaped Evening Bag, Perfect Valentine's Day Gift for Girlfriend" },
    "shiny-evening-crescent-bag": { id: "shiny-evening-crescent-bag", name: "Shiny Evening Crescent Bag", price: "Rs. 2,000", image: "10f20528073b4106b11fbbd190db4f10-goods.avif", images: ["10f20528073b4106b11fbbd190db4f10-goods.avif","152edd005c504390a3100417467e4ad1-goods.avif","39e8157bbb78458a9702c3385426d885-goods.avif","73060beb1f0da0bca0c16b4d3886059e.avif","8831ea64-fe31-4b94-a600-9f31d2e375ad.avif","96ca4042e06046239eb589d426613fe6-goods.avif"], variants: [{name:"Golden",images:["10f20528073b4106b11fbbd190db4f10-goods.avif","152edd005c504390a3100417467e4ad1-goods.avif","39e8157bbb78458a9702c3385426d885-goods.avif"]},{name:"Silvery",images:["73060beb1f0da0bca0c16b4d3886059e.avif","8831ea64-fe31-4b94-a600-9f31d2e375ad.avif","96ca4042e06046239eb589d426613fe6-goods.avif"]}], category: "Bags", subcategory: "Women's Clutches & Evening Bags", description: "# Shiny Evening Bag, Suitable for Carrying Lipstick, Coins, Headphones. Can Be Used As a Shoulder Bag Or Crossbody Bag. Fashionable Crescent Shape Mini Lightweight Clutch Bag for Women" },
    "hand-bag": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "bag": { id: "bag-1", name: "Elegant Hand Bag", price: "Rs. 3,999", image: "images/bags.jpg", images: ["images/bags.jpg"], category: "Bags" },
    "perfume-1": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/perfumes.jpg", images: ["images/perfumes.jpg"], category: "Perfumes" },
    "perfume": { id: "perfume-1", name: "Premium Perfume", price: "Rs. 2,499", image: "images/perfumes.jpg", images: ["images/perfumes.jpg"], category: "Perfumes" },
    "jewelry-1": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/jewellery.jpg", images: ["images/jewellery.jpg"], category: "Jewelry" },
    "jewelry": { id: "jewelry-1", name: "Luxury Jewelry", price: "Rs. 5,499", image: "images/jewellery.jpg", images: ["images/jewellery.jpg"], category: "Jewelry" },
    "shoes-1": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/shoes.jpg", images: ["images/shoes.jpg"], category: "Shoes" },
    "shoes": { id: "shoes-1", name: "Ladies Shoes", price: "Rs. 3,499", image: "images/shoes.jpg", images: ["images/shoes.jpg"], category: "Shoes" },
    "abaya": { id: "abaya", name: "Luxury Abaya", price: "Rs. 5,999", image: "images/abayas.jpg", images: ["images/abayas.jpg"], category: "Abayas" },
    "rose-red-exquisite-phone-case": { id: "rose-red-exquisite-phone-case", name: "Rose Red Exquisite Phone Case", price: "Rs. 1,200", image: "36410368-2737-4fda-a397-0b6484d66a38.avif", images: ["36410368-2737-4fda-a397-0b6484d66a38.avif","5584ec11-1568-4c3a-a2f0-95b166d05b3e.avif"], category: "Tech Accessories", subcategory: "Phone Accessories", description: "# Phone Case: Rose Red Exquisite Accessory for iPhone Case, Offering Full Protection and a Stylish Choice, Ideal for Gifting" },
    "minnie-cartoon-warner-bros-phone-case": { id: "minnie-cartoon-warner-bros-phone-case", name: "Minnie Cartoon Phone Case", price: "Rs. 2,000", image: "891ddda528144d6587ce0e7b0c8ee763-goods.avif", images: ["891ddda528144d6587ce0e7b0c8ee763-goods.avif","ac48a3cb11384993b8f9e4c735bac68f-goods.avif"], category: "Tech Accessories", subcategory: "Phone Accessories", description: "# Phone Case: 2D Flat, Warner Bros Cute Minnie Cartoon Anime Phone Case Suitable for iPhone 18 17 16 15 14 13 12 11 Pro Max XS XR Mini 8 7 and 6, Birthday Gift, Fan Gift, 2D Flat" },
    "crystal-butterfly-bracelet-phone-case": { id: "crystal-butterfly-bracelet-phone-case", name: "Crystal Butterfly Bracelet Phone Case", price: "Rs. 1,500", image: "b634180a9cb4456998e06371c04499d2-goods.avif", images: ["b634180a9cb4456998e06371c04499d2-goods.avif","c1a92b83f1fd4f41bd8ede09ae165763-goods.avif"], category: "Tech Accessories", subcategory: "Phone Accessories", description: "# Phone Case - Crystal Butterfly with Cute Bracelet TPU Case | Shockproof Protective Phone Case | Scratch-Resistant Transparent Case for Iphone 7 / X / XS / 11 Series And Iphone 12 / 13 / 14 / 15/16 Models" },
    "panda-mimi-transparent-phone-case": { id: "panda-mimi-transparent-phone-case", name: "Panda Mimi Transparent Phone Case", price: "Rs. 1,900", image: "07bb3d0299bf42cf9c7078f409394940-goods.avif", images: ["07bb3d0299bf42cf9c7078f409394940-goods.avif","07d32159a2d94b39acf6a2c8f6efe8ee-goods.avif","bc24283e120a4a118cf5706cce9b63d2-goods.avif","d7e3554ce14a4f5bb6412b71da884de5-goods.avif"], category: "Tech Accessories", subcategory: "Phone Accessories", description: "# Phone Case - 2D Flat 1pc Brand Printed with Foundation Hollow Hugging Panda Mimi Pattern Transparent Side Heart Large Window Phone Case Suitable for Iphone 11/12/13/14/15/16/17/Pro/Pro Max/Plus, Offering Anti-Drop" },
    "butterfly-glass-inlay-ring": { id: "butterfly-glass-inlay-ring", name: "Butterfly Glass Inlay Ring", price: "Rs. 750", image: "58769b05-b174-4b20-bc8e-2ddd9aef8dbd.avif", images: ["58769b05-b174-4b20-bc8e-2ddd9aef8dbd.avif","da264dd8-a0de-4e16-bdba-c0e9a29ad9a5.avif"], variants: [{name:"Golden",images:["58769b05-b174-4b20-bc8e-2ddd9aef8dbd.avif"]},{name:"Silvery",images:["da264dd8-a0de-4e16-bdba-c0e9a29ad9a5.avif"]},{name:"Black",images:["58769b05-b174-4b20-bc8e-2ddd9aef8dbd.avif"]},{name:"Blue",images:["da264dd8-a0de-4e16-bdba-c0e9a29ad9a5.avif"]},{name:"Pink",images:["58769b05-b174-4b20-bc8e-2ddd9aef8dbd.avif"]}], category: "Jewelry", subcategory: "Rings", description: "# A Butterfly Ring with Rectangular Glass Inlay, an Elegant Open-style Fashion Accessory" },
    "shimmering-eyeliner-eyeshadow-sticks": { id: "shimmering-eyeliner-eyeshadow-sticks", name: "Shimmering Eyeliner And Eyeshadow Sticks (Set of 2)", price: "Rs. 1,500", image: "704d8fee-daed-4e32-9b96-27c263178e52.avif", images: ["704d8fee-daed-4e32-9b96-27c263178e52.avif","be3db858-b231-44d3-be1c-70a6b6cff8cd.avif","e8baffc6-db62-4315-8550-0317becd074e.avif","fce60b95-031f-4a7a-b269-b161e413ca77.avif"], category: "Makeup", subcategory: "Eyeshadow", description: "# Set of 2 Shimmering Eyeliner And Eyeshadow Sticks - Water-Resistant, Smudge-Proof, Golden Sparkle, Durable, Easy to Use, Eye Cosmetics, Highly Pigmented, Versatile, Glitter Eyeliner And Eyeshadow" },
    "long-lasting-glitter-eyeshadow-highlighter-pen": { id: "long-lasting-glitter-eyeshadow-highlighter-pen", name: "Glitter Eyeshadow Highlighter Pen", price: "Rs. 1,500", image: "1476a376-b4e1-4fd1-863b-6bc5ab62cd5c.avif", images: ["1476a376-b4e1-4fd1-863b-6bc5ab62cd5c.avif","5fab3631-ca99-407c-b6ed-5c6c3dd95cc6.avif","67b9acaa-2795-4501-8a93-08415ca38fe5.avif","8740f66b-fa6e-4496-b9b7-7c5fda70292d.avif","d11741ea-94b6-4574-9d8e-35216f4732ab.avif"], category: "Makeup", subcategory: "Eyeshadow", description: "# Long-Lasting Glitter Eyeshadow Highlighter Pen - Waterproof, Medium Coverage for All Skin Tones" },
    "black-sequined-leaf-mesh-long-dress": { id: "black-sequined-leaf-mesh-long-dress", name: "Black Sequined Leaf Mesh Long Dress", price: "Rs. 15,000", image: "15b8adcf-98d1-4448-829f-8e91d56d076b.avif", images: ["15b8adcf-98d1-4448-829f-8e91d56d076b.avif","78f16e82-2706-486b-afa9-8d99364c2d9f.avif","dcf5c214-e6da-43a4-a991-742cce22356d.avif"], category: "Women's Clothing", subcategory: "Women's Dresses", description: "# Black Sequined Leaf Mesh Long Dress (Loose Fit Evening Gown)" },
    "womens-elegant-lace-wedding-dress": { id: "womens-elegant-lace-wedding-dress", name: "Women's Elegant Lace Wedding Dress", price: "Rs. 7,500", image: "6e76483b-9df6-49d7-804a-e8ceda37de6d.avif", images: ["4c2feaff-7229-444f-a434-6bfc734d0441.avif","fa661834-1fd7-43b7-b070-f8c7ab72d654.avif","01e1db60-5867-4a7d-9bde-3aa0c1d7e660.avif","90906163-74b8-420e-b4ab-8e808dbbf42b.avif","c3427a66-bd00-46fa-8488-c51dff625253.avif","6e76483b-9df6-49d7-804a-e8ceda37de6d.avif","601283fc-6443-499c-bf1f-b9ae4d64b7df.avif"], variants: [{name:"Black",images:["6e76483b-9df6-49d7-804a-e8ceda37de6d.avif","601283fc-6443-499c-bf1f-b9ae4d64b7df.avif"]},{name:"Pink",images:["90906163-74b8-420e-b4ab-8e808dbbf42b.avif","c3427a66-bd00-46fa-8488-c51dff625253.avif"]},{name:"Burgundy",images:["4c2feaff-7229-444f-a434-6bfc734d0441.avif","fa661834-1fd7-43b7-b070-f8c7ab72d654.avif","01e1db60-5867-4a7d-9bde-3aa0c1d7e660.avif"]}], category: "Women's Clothing", subcategory: "Women's Dresses", description: "# Lace Long Dress Women'S Long Sleeve Round Neck Floral Embroidery A-Line Ankle Dress, Wedding Party Evening Gown" },
    "yytt-womens-polka-dot-bubble-sleeve-long-dress": { id: "yytt-womens-polka-dot-bubble-sleeve-long-dress", name: "YYTT Women's Polka Dot Bubble Sleeve Long Dress", price: "Rs. 4,500", image: "04e91bbf-3316-4c5c-9551-32926e0487d2.avif", images: ["04e91bbf-3316-4c5c-9551-32926e0487d2.avif","97223ce6-3942-4e79-94c2-ba43b9b35b1c.avif","33fec31d-235d-43ba-9088-729a8e759686.avif","3c17d20a-b125-4268-b9f5-9f3b7e9ecd7b.avif","7d100085-67f5-4d2d-b0c1-37be26148875.avif","682f4f5c-d05c-481a-a99f-9147cedfa2bc.avif"], variants: [{name:"White",images:["04e91bbf-3316-4c5c-9551-32926e0487d2.avif","682f4f5c-d05c-481a-a99f-9147cedfa2bc.avif"]},{name:"Black",images:["33fec31d-235d-43ba-9088-729a8e759686.avif","3c17d20a-b125-4268-b9f5-9f3b7e9ecd7b.avif"]},{name:"Brown",images:["7d100085-67f5-4d2d-b0c1-37be26148875.avif","97223ce6-3942-4e79-94c2-ba43b9b35b1c.avif"]}], category: "Women's Clothing", subcategory: "Women's Dresses", description: "# YYTT Women's Elegant Casual Polka Dot Bubble Sleeve Long Dress, Drawstring Waist, Back Slit Button Style, Gentle Style Commuting and Vacation Dress" },
    "elegant-pointed-toe-stiletto-heels": { id: "elegant-pointed-toe-stiletto-heels", name: "Elegant Pointed-Toe Stiletto Heels", price: "Rs. 5,990", image: "19f3e1b7-f392-48d5-aeea-219158e25386.avif", images: ["19f3e1b7-f392-48d5-aeea-219158e25386.avif","713fcece-0df2-40bc-b1b3-f98b10fb6b69.avif","be214e46-029f-4bce-a3ac-35384fade95d.avif","d90136ea-ea10-4711-8ecc-23a9d3dc0382.avif"], variants: [{name:"Black",images:["be214e46-029f-4bce-a3ac-35384fade95d.avif"]},{name:"White",images:["d90136ea-ea10-4711-8ecc-23a9d3dc0382.avif"]},{name:"Red",images:["19f3e1b7-f392-48d5-aeea-219158e25386.avif"]}], category: "Shoes", subcategory: "Women's Shoes", description: "# Elegant Pointed-Toe Stiletto Heels | Synthetic Upper with Metal Buckle Detail | Suitable for Weddings, Parties, and Work | Stylish Burgundy, White/Black | All-Season Comfortable Fit | Durable TPU Sole | Christmas Gifts, Women Shoes" },
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
      return '<button type="button" class="product-thumb'+(index===detailImageIndex?' active':'')+'" data-gallery-index="'+index+'" data-photo-number="'+(index+1)+'" aria-label="View photo '+(index+1)+'"><span class="photo-number-badge">'+(index+1)+'</span><img src="'+escapeHTML(src)+'" alt=""></button>';
    }).join("");
    let currentNumber = document.getElementById("currentPhotoNumber");
    if (!currentNumber && mainImage && mainImage.parentElement) {
      currentNumber = document.createElement("span");
      currentNumber.id = "currentPhotoNumber";
      currentNumber.className = "gallery-current-number";
      currentNumber.setAttribute("aria-live", "polite");
      mainImage.parentElement.appendChild(currentNumber);
    }
    if (currentNumber) currentNumber.textContent = String(detailImageIndex + 1);
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
            const blushShades=["#f7b5c9","#f29ab8","#e982a6","#f5a6bb","#df789c","#f6c1d1"];
            const isBlush=detailProduct.id==="6-color-liquid-blush";
            const swatch=isBlush?blushShades[index]:(variant.name.toLowerCase().includes("white")?"#fff":variant.name.toLowerCase().includes("pink")?"#f3a6c5":variant.name.toLowerCase().includes("gold")?"#d4af37":"#171717");
            return '<button type="button" class="product-variant-option'+((detailProduct.id==="pink-number-bow-party-balloons"||isBlush)?" number-variant-option":"")+(selected?' active':'')+'" data-variant-index="'+index+'"'+(isBlush?' data-blush-shade="true"':'')+' onclick="window.selectGraduationGiftColour('+index+')" aria-pressed="'+selected+'">'+((detailProduct.id==="pink-number-bow-party-balloons")?"":'<span class="variant-swatch" style="--variant-swatch:'+swatch+'"></span>')+escapeHTML(variant.name)+'</button>';
          }).join("");
          if(variantNote)variantNote.textContent=selectedVariant ? (detailProduct.id==="pink-number-bow-party-balloons" ? "Selected number: "+selectedVariant.name : detailProduct.id==="6-color-liquid-blush" ? "Selected shade: "+selectedVariant.name : "Selected colour: "+selectedVariant.name) : (detailProduct.id==="pink-number-bow-party-balloons" ? "Select a number from 0 to 9." : detailProduct.id==="6-color-liquid-blush" ? "Select a shade (1–6)." : "Select a colour to view its matching gift box photo.");
        };
        window.selectGraduationGiftColour=function(chosenIndex){
          const chosen=detailProduct && detailProduct.variants && detailProduct.variants[chosenIndex];
          if(!chosen || !chosen.images || !chosen.images[0])return;
          const photo=chosen.images[0];
          selectedVariant=chosen;
          detailProduct.selectedVariant=chosen.name;
          const allPhotos=(detailProduct.images||[]).filter(Boolean);
          detailImages=allPhotos.length?allPhotos:[photo];
          detailImageIndex=detailImages.indexOf(photo);
          if(detailImageIndex<0){detailImages=[photo].concat(detailImages);detailImageIndex=0;}
          renderGallery();
          if(mainImage){mainImage.alt=detailProduct.name+" - "+chosen.name+" - photo "+(detailImageIndex+1);}
          const selectedText=detailProduct.id==="pink-number-bow-party-balloons" ? " I want number "+chosen.name+"." : detailProduct.id==="6-color-liquid-blush" ? " Selected shade: "+chosen.name+"." : " Selected option: "+chosen.name+".";
          const updatedMessage="Assalam-o-Alaikum, I would like to order "+detailProduct.name+" ("+detailProduct.price+")."+selectedText+" Please share availability and delivery details.\nProduct link: "+window.location.href;
          const updatedHref="https://wa.me/923045255325?text="+encodeURIComponent(updatedMessage);
          ["#whatsappBtn",".product-header-whatsapp","#floatingProductWhatsApp"].forEach(function(selector){const link=$(selector);if(link)link.href=updatedHref;});
          renderVariantOptions();
        };
        renderVariantOptions();
        window.selectGraduationGiftColour(0);

      }
      const productDescriptions = {
        "yytt-womens-polka-dot-bubble-sleeve-long-dress": "# YYTT Women's Elegant Casual Polka Dot Bubble Sleeve Long Dress, Drawstring Waist, Back Slit Button Style, Gentle Style Commuting and Vacation Dress",
        "elegant-pointed-toe-stiletto-heels": "# Elegant Pointed-Toe Stiletto Heels | Synthetic Upper with Metal Buckle Detail | Suitable for Weddings, Parties, and Work | Stylish Burgundy, White/Black | All-Season Comfortable Fit | Durable TPU Sole | Christmas Gifts, Women Shoes",
        "rose-red-exquisite-phone-case": "# Phone Case: Rose Red Exquisite Accessory for iPhone Case, Offering Full Protection and a Stylish Choice, Ideal for Gifting",
        "minnie-cartoon-warner-bros-phone-case": "# Phone Case: 2D Flat, Warner Bros Cute Minnie Cartoon Anime Phone Case Suitable for iPhone 18 17 16 15 14 13 12 11 Pro Max XS XR Mini 8 7 and 6, Birthday Gift, Fan Gift, 2D Flat",
        "crystal-butterfly-bracelet-phone-case": "# Phone Case - Crystal Butterfly with Cute Bracelet TPU Case | Shockproof Protective Phone Case | Scratch-Resistant Transparent Case for Iphone 7 / X / XS / 11 Series And Iphone 12 / 13 / 14 / 15/16 Models",
        "panda-mimi-transparent-phone-case": "# Phone Case - 2D Flat 1pc Brand Printed with Foundation Hollow Hugging Panda Mimi Pattern Transparent Side Heart Large Window Phone Case Suitable for Iphone 11/12/13/14/15/16/17/Pro/Pro Max/Plus, Offering Anti-Drop",
        "butterfly-glass-inlay-ring": "# A Butterfly Ring with Rectangular Glass Inlay, an Elegant Open-style Fashion Accessory",
        "sweet-fashion-polka-dot-leopard-floral-ring": "# 1pc Sweet Fashion Light Luxury Elegant Black And White Polka Dot Leopard Print Floral Pattern Large Flower Ring Suitable for Women'S Daily Casual Wear Trendy All-Match Holiday Gift",
        "2pcs-lip-liner-glaze-set": "# 2pcs Lip Liner & Glaze Set - Create Full Lips, Smooth Color Application, Natural Lip Line, Waterproof & Long-Lasting, Ideal for Everyday, Parties & Dates, Christmas Beauty Gift",
        "y2k-bow-shaped-evening-bag": "# Exquisite, Elegant, and Stylish Y2K Style Bow-Shaped Evening Bag, Perfect Valentine's Day Gift for Girlfriend",
        "womens-crisscross-strap-geometric-chunky-heel-sandals": "# Women's Crisscross Strap High Heel Sandals, Square Toe Triangle Geometric Shaped Chunky Heel, Backless Sandals, Women's Party Wedding Dinner Dress Shoes, Women Shoes",
        "shimmering-eyeliner-eyeshadow-sticks": "# Set of 2 Shimmering Eyeliner And Eyeshadow Sticks - Water-Resistant, Smudge-Proof, Golden Sparkle, Durable, Easy to Use, Eye Cosmetics, Highly Pigmented, Versatile, Glitter Eyeliner And Eyeshadow",
        "long-lasting-glitter-eyeshadow-highlighter-pen": "# Long-Lasting Glitter Eyeshadow Highlighter Pen - Waterproof, Medium Coverage for All Skin Tones",
        "10pcs-press-on-nails": "# 10pcs Press On Nails Medium Almond Glossy French Tip Black Polka Dots 3D Flower Design Nude Pink Cream White Golden Full Cover Reusable False Nails for Women Minimalist Elegant Daily Office Nail Art",
        "miqh-diamond-gel-nail-polish": "# MIQH Single Pack Diamond Gel Nail Polish - Long-Lasting Shine LED Cured Nail Polish, Vibrant Colors, Professional Nail Design And Additions | Shiny Colorful Diamond Gel Nail Polish 7Ml, Nail Polish, Gel Nail Polish Under Light, Women'S Nail Polish",
        "velvet-matte-lipstick": "1pc Velvet Matte Lipstick Red Tone Lip Gloss Long Lasting Smudge Proof Waterproof Non Drying Christmas Surprise Gift",
        "12-color-lip-oil": "# Lip Oil, 12 Colors Moisturizing Hydrating Candy Lip Glaze, Mirror Shine Pearl Nude Lip Tint, Natural Lip Gloss For Daily Use",
        "shiny-evening-crescent-bag": "# Shiny Evening Bag, Suitable for Carrying Lipstick, Coins, Headphones. Can Be Used As a Shoulder Bag Or Crossbody Bag. Fashionable Crescent Shape Mini Lightweight Clutch Bag for Women",
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
        "black-sequined-leaf-mesh-long-dress": [
          ["Size confirmation", "Please confirm your required dress size before placing your order."]
        ],
        "womens-elegant-lace-wedding-dress": [
          ["Size confirmation", "Please confirm your required dress size before placing your order."],
          ["Colour options", "Available in Black, Pink and Burgundy."]
        ],
        "yytt-womens-polka-dot-bubble-sleeve-long-dress": [
          ["Available Colours", "Pink, Black and Burgundy."],
          ["Size confirmation", "Please confirm your required dress size before placing your order."],
          ["Elegant dress style", "Features bubble sleeves, a drawstring waist, back slit and button style."]
        ],
        "elegant-pointed-toe-stiletto-heels": [
          ["Pointed-toe stiletto design", "Elegant pointed-toe heels with a stylish metal buckle detail."],
          ["Black, White & Red options", "Available in Black, White and Red. Please mention your preferred colour when ordering."],
          ["Size confirmation", "Please confirm your required shoe size before placing your order."],
          ["Occasion-ready style", "Suitable for weddings, parties and work."]
        ],
        "rose-red-exquisite-phone-case": [
          ["All mobile models available", "Please mention your mobile phone model when placing your order so we can provide you with the right cover."],
          ["Full protection", "Designed to offer protection for your phone."],
          ["Rose red design", "A stylish rose red phone case, also suitable for gifting."]
        ],
        "minnie-cartoon-warner-bros-phone-case": [
          ["All mobile models available", "Please mention your mobile phone model when placing your order so we can provide you with the right cover."],
          ["Minnie cartoon design", "A 2D flat Warner Bros Minnie cartoon anime phone case, suitable as a birthday or fan gift."]
        ],
        "crystal-butterfly-bracelet-phone-case": [
          ["All mobile models available", "Please mention your mobile phone model when placing your order so we can provide you with the right cover."],
          ["Crystal butterfly design", "Features a crystal butterfly design with a cute bracelet accessory."],
          ["Protective TPU case", "Shockproof and scratch-resistant transparent TPU phone case."]
        ],
        "panda-mimi-transparent-phone-case": [
          ["All mobile models available", "Please mention your mobile phone model when placing your order so we can provide you with the right cover."],
          ["Panda Mimi design", "Features a printed Panda Mimi pattern with a transparent side and heart-shaped large window."],
          ["Anti-drop protection", "Designed to offer anti-drop protection for your phone."]
        ],
        "butterfly-glass-inlay-ring": [
          ["Available Colours", "1. Golden\n2. Silvery\n3. Black\n4. Blue\n5. Pink"],
          ["Colour confirmation", "Please confirm your preferred colour when placing your order."]
        ],
        "sweet-fashion-polka-dot-leopard-floral-ring": [
          ["Colour confirmation", "Please confirm your preferred colour when placing your order."]
        ],
        "2pcs-lip-liner-glaze-set": [
          ["Two-piece lip set", "Includes a lip liner and lip glaze for a coordinated lip look."],
          ["Smooth colour application", "Designed for smooth colour application and a naturally defined lip line."],
          ["Waterproof & long-lasting", "Made to provide a waterproof, long-lasting finish for everyday wear, parties and dates."],
          ["Colour confirmation", "Please confirm your preferred colour when placing your order."]
        ],
        "y2k-bow-shaped-evening-bag": [
          ["Y2K bow-shaped design", "An elegant and stylish bow-shaped evening bag with a fashionable Y2K look."],
          ["Golden & Silvery options", "Available in Golden and Silvery. Please select your preferred colour."],
          ["Evening & party accessory", "A stylish accessory for parties, special occasions and evening outings."],
          ["Colour confirmation", "Please confirm your preferred colour when placing your order."]
        ],
        "womens-crisscross-strap-geometric-chunky-heel-sandals": [
          ["Crisscross strap design", "Features an elegant crisscross strap design with a square toe."],
          ["Chunky geometric heel", "Designed with a triangle geometric-shaped chunky heel."],
          ["White & Golden options", "Available in White and Golden colour options."],
          ["Size confirmation", "Please confirm your required shoe size before placing your order."]
        ],
        "shimmering-eyeliner-eyeshadow-sticks": [
          ["Set of 2", "Includes two shimmering eyeliner and eyeshadow sticks."],
          ["Two colours available", "Please mention your preferred colour when placing your order."],
          ["Water-resistant & smudge-proof", "Designed to resist water and smudging."],
          ["Golden sparkle", "Highly pigmented glitter finish for versatile eye looks."]
        ],
        "long-lasting-glitter-eyeshadow-highlighter-pen": [
          ["Glitter eyeshadow highlighter pen", "A pen-style makeup product with a glitter finish."],
          ["Waterproof formula", "Made for a waterproof makeup look."],
          ["Medium coverage", "Provides medium coverage."],
          ["For all skin tones", "Described as suitable for all skin tones."]
        ],
        "10pcs-press-on-nails": [
          ["10-piece nail set", "A set of 10 press-on false nails for a coordinated manicure look."],
          ["Medium almond shape", "Medium-length almond-shaped nails with a glossy finish."],
          ["French tips & 3D details", "Features French-tip styling, black polka dots and 3D flower details in nude pink, cream, white and golden tones."],
          ["Reusable full-cover style", "Full-cover reusable false nails for elegant everyday, office or special-occasion nail art."]
        ],
        "miqh-diamond-gel-nail-polish": [
          ["Diamond gel shine", "Shiny, colourful diamond-effect gel nail polish for a vibrant nail look."],
          ["LED cured formula", "Designed to be cured under an LED nail lamp."],
          ["7 ml single pack", "Single-pack 7 ml nail polish for nail design and professional-style manicures."],
          ["Colour confirmation", "Please mention your preferred colour when placing your order."]
        ],
        "velvet-matte-lipstick": [
          ["Velvet matte finish", "A smooth matte-look lipstick for a soft, velvety lip finish."],
          ["Red tone colour", "A red-toned lip colour for a bold, classic look."],
          ["Long-lasting wear", "Described as long-lasting, smudge-proof and waterproof, with a non-drying feel."]
        ],
        "12-color-lip-oil": [
          ["12 colours available", "Please mention your preferred colour when placing your order."]
        ],
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
        "shiny-evening-crescent-bag": [
          ["Fashionable crescent shape", "A chic mini crescent-shaped evening bag that adds a stylish touch to your outfit."],
          ["Golden & Silvery options", "Choose the finish that best matches your personal style and occasion."],
          ["Lightweight & compact", "A mini bag designed to carry small essentials such as lipstick, coins and headphones."],
          ["Versatile carrying style", "Can be carried as a shoulder bag or a crossbody bag."],
          ["Colour confirmation", "Please mention your preferred colour when placing your order."]
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
      const variantChoice=detailProduct.selectedVariant ? " My selected option is "+detailProduct.selectedVariant+"." : "";
      const phoneModelNote=detailProduct.id==="rose-red-exquisite-phone-case" ? " All mobile models are available. Please tell us your mobile phone model when placing your order." : "";
      const message="Assalam-o-Alaikum, I would like to order "+detailProduct.name+" ("+detailProduct.price+")."+variantChoice+phoneModelNote+" Please share availability and delivery details.";
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
    const normalizeCategory = function (value) {
      return String(value || "").toLowerCase().replace(/&amp;/g, "&")
        .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    };
    const selected = normalizeCategory(category);
    const categoryGroups = {
      "bags": ["bags","handbags","womens-handbags","womens-shoulder-bags","womens-crossbody-bags","womens-clutches-evening-bags","womens-satchels","womens-tote-bags","hobo-bags","womens-purse-set","womens-backpacks","womens-wallets-card-cases","laptop-bags","gym-bag","bags-backpacks","storage-bag","waist-chest-bags","luggage-travel-gear","casual-unisex-backpacks","toiletry-bags"],
      "makeup": ["makeup","makeup-products","makeup-kits","makeup-deals","makeup-palettes","face-makeup","eye-makeup","lip-makeup","face-primer","foundation-concealer","face-powder","blush-highlighter-contour","setting-spray","eyeshadow","eyeliner-mascara","lipstick-lip-gloss","false-eyelashes","beauty-tools","body-paint-makeup","makeup-bags-storage","makeup-mirrors","nails","press-on-nails","nail-polish","nail-tools","nail-appliances","nail-art","nail-powder"],
      "jewelry": ["jewelry","rings","jewelry-sets","womens-jewelry","mens-jewelry","loose-gemstones","jewelry-boxes-organizers","watch-accessories","jewelry-cleaning-care","jewelry-making-accessories"],
      "tech-accessories": ["tech-accessories","phone-accessories","cases-holsters-sleeves","maintenance-upkeep-repairs","cables-adapters","photo-shooting","stands","chargers","power-banks","wireless-chargers"],
      "dresses": ["dresses","womens-clothing","wedding-event-wear","abayas","womens-t-shirts","womens-coats-jackets","womens-sweaters","womens-two-piece-sets","womens-pants","womens-blouses-shirts","womens-jeans","womens-skirts","womens-blazers","womens-undergarments"],
      "shoes": ["shoes","womens-shoes","womens-heeled-sandals","womens-ankle-boots-booties","womens-fashion-sneakers","womens-flats","womens-slippers","womens-flip-flops","womens-sandals","womens-loafers-slip-ons","womens-knee-high-boots","womens-shoe-accessories"],
      "skincare": ["skincare","skin-care","facial-care","body-care","foot-hand-nail-care","oral-care","personal-care","bathing-accessories","refillable-containers"],
      "party-and-event-decorations": ["party-and-event-decorations","party-event-decorations","event-party-supplies","party-decorations-supplies","balloons","banners-backdrops","party-tableware","party-favors","cake-toppers-candles","party-garlands","backdrops-decor","balloons-garlands"],
      "gift-hampers": ["gift-hampers","gift-boxes-hampers","gift-sets","gift-boxes-bags","gift-baskets","chocolate-sweet-hampers","greeting-cards","rose-bears-floral-gifts","keepsakes","led-decorative-lights","craft-supplies","personalized-products","gift-wrapping-supplies"],
      "ribbon-bouquets": ["ribbon-bouquets","flower-bouquets","artificial-flower-bouquets","money-bouquets","chocolate-bouquets","customized-bouquets"],
      "saree": ["saree","silk-sarees","chiffon-sarees","georgette-sarees","cotton-sarees","lawn-sarees","organza-sarees","banarasi-sarees","net-sarees","velvet-sarees","satin-sarees","linen-sarees","jacquard-sarees","tissue-sarees"],
      "perfumes": ["perfumes","mens-fragrance","womens-fragrance","kids-fragrance","couples-fragrance"],
      "accessories": ["accessories","womens-eyewear","womens-hats-caps","womens-scarves-wraps","womens-belts","womens-keyrings-keychains-charms","womens-gloves-mittens","womens-buttons-pins","womens-glasses-accessories","womens-faux-collar","womens-wedding-accessories","hand-fans","costume-wigs","applique-patches","face-covering","womens-earmuffs","handbag-hangers","hair-accessories","wigs-hair-extensions","hair-styling-tools"],
      "mens-clothing": ["mens-clothing","mens-sweaters","mens-t-shirts","mens-casual-dress-shirts","mens-hoodies-sweatshirts","mens-polos","mens-jackets-coats","mens-sets","mens-casual-pants","mens-jeans","mens-suits-separates","mens-tops","mens-shorts","mens-cargo-pants","mens-pants"],
      "mens-shoes": ["mens-shoes","mens-loafers-slip-ons","mens-casual-shoes","mens-sandals","mens-snow-boots","mens-semi-formal-shoes","mens-slippers","mens-wide-fit-shoes","mens-boots","mens-work-utility-footwear","mens-mules-clogs","mens-skateboarding-shoes","mens-canvas-shoes","mens-rain-boots"],
      "mens-accessories": ["mens-accessories","mens-eyewear","mens-watches","mens-hats-caps","mens-belts","mens-ties-accessories","mens-keyrings-keychains-charms","mens-scarves","mens-gloves-mittens","mens-suspenders","cigarette-cases","mens-earmuffs","shaving-hair-removal","hair-cutting-tools"],
      "kids-clothing": ["kids-clothing","girls-dresses","baby-sets","girls-sets","boys-sets","girls-pants","baby-one-pieces","boys-pants","underwear-pajamas","boys-t-shirts","baby-dresses","girls-t-shirts","girls-jackets-coats","baby-tops","boys-jackets-coats","girls-tops","boys-tops","baby-bottoms","boys-shirts","girls-shirts","girls-swimwear","boys-swimwear","baby-girls-0-3-yrs","young-girls-4-7-yrs","tween-girls-8-12-yrs","teen-girls-13-16-yrs","baby-boys-0-3-yrs","young-boys-4-7-yrs","tween-boys-8-12-yrs","teen-boys-13-16-yrs"],
      "kids-shoes": ["kids-shoes","girls-loafers-slip-ons","girls-boots","girls-sandals-slippers","boys-sneakers","girls-sneakers","boys-athletic","baby-girl-shoes","boys-boots","boys-sandals-slippers","baby-boy-shoes","girls-athletic","girls-pumps","boys-loafers-slip-ons","girls-mules-clogs","boys-mules-clogs"],
      "kids-accessories": ["kids-accessories","kids-eyewear","kids-socks","kids-watches","kids-hats-caps","kids-gloves-scarves","kids-hair-accessories","kids-bags","costumes-accessories","kids-backpacks","ties-belts-accessories","kids-keyrings-keychains","kids-buttons-pins"],
      "home-living": ["home-living","seasonal-decor","home-decor-products","lighting-accessories","dining-entertaining","kids-home-store","kitchen-utensils-supplies","kitchen-storage-organization","bedding","home-storage-organization","bath","closet-laundry-storage","couch-sofa-decor","rugs-mats","window-treatments-hardware","bakeware","kitchen-table-linens","cleaning-supplies","cookware","towels-shower-curtains","glassware-drinkware","blankets-throws","wall-art","travel-to-go-drinkware"]
    };
    const matchingCategories = categoryGroups[selected] || [selected];
    $$(".product-item").forEach(function (item) {
      const itemCategory = normalizeCategory(item.dataset.category);
      const visible = selected === "all" || matchingCategories.includes(itemCategory);
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
    if (!$("#featured-products") && !$$(".product-item").length) {
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
    $$(".product-item").forEach(function (item) { item.hidden = false; item.style.display = ""; });
  }

  document.addEventListener("click", function (event) {
    const sidebarToggle = event.target.closest(".sidebar-category-toggle");
    if (sidebarToggle) {
      event.preventDefault();
      const submenuId = sidebarToggle.getAttribute("aria-controls");
      const submenu = submenuId ? document.getElementById(submenuId) : null;
      if (submenu) {
        const expanded = sidebarToggle.getAttribute("aria-expanded") === "true";
        sidebarToggle.setAttribute("aria-expanded", String(!expanded));
        submenu.hidden = expanded;
        sidebarToggle.classList.toggle("expanded", !expanded);
      }
      return;
    }
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
    const categoryLink = event.target.closest("a[data-category]");
    if (categoryLink && !categoryLink.classList.contains("sidebar-category-toggle")) {
      event.preventDefault();
      filterProducts(categoryLink.dataset.category);
      window.location.hash = "featured-products";
      return;
    }
    const categorySubcategory = event.target.closest(".category-subcategory-chip[data-category]");
    if (categorySubcategory) {
      event.preventDefault();
      event.stopPropagation();
      filterProducts(categorySubcategory.dataset.category);
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
    if (event.target === menuOverlay || (event.target.closest(".sidebar a") && !event.target.closest(".sidebar-category-toggle"))) {
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

  if (window.Swiper && $(".heroSwiper")) {
    new Swiper(".heroSwiper", {
      loop: true, speed: 700, autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".heroSwiper .swiper-pagination", clickable: true }
    });
  }

  // Native scroll slider: reliable finger swipe on touchscreens and mouse drag on desktop.
  const categorySliderElement = $(".categorySwiper");
  const subcategoryNav = document.querySelector(".subcategory-nav");
  if (subcategoryNav) {
    subcategoryNav.addEventListener("click", function(event) {
      const chip = event.target.closest(".category-subcategory-chip[data-category]");
      if (!chip) return;
      event.preventDefault();
      event.stopPropagation();
      filterProducts(chip.dataset.category);
    }, true);
  }
  if (categorySliderElement) {
    // Handle collection taps directly before slider/other click handlers.
    categorySliderElement.addEventListener("click", function(event) {
      const card = event.target.closest(".category-card[data-category]");
      if (!card) return;
      if (categorySliderElement.dataset.dragged === "true") return;
      event.preventDefault();
      event.stopPropagation();
      filterProducts(card.dataset.category);
      window.location.hash = "featured-products";
    }, true);
  }
  if (categorySliderElement) {
  // Explicit touch-drag support for Windows touchscreen laptops and mobile devices.
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartScrollLeft = 0;
    let touchMovedHorizontally = false;
    categorySliderElement.addEventListener("touchstart", function(event) {
      if (!event.touches || event.touches.length !== 1) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      touchStartScrollLeft = categorySliderElement.scrollLeft;
      touchMovedHorizontally = false;
    }, { passive: true });
    categorySliderElement.addEventListener("touchmove", function(event) {
      if (!event.touches || event.touches.length !== 1) return;
      const deltaX = event.touches[0].clientX - touchStartX;
      const deltaY = event.touches[0].clientY - touchStartY;
      if (!touchMovedHorizontally && Math.abs(deltaX) > 7 && Math.abs(deltaX) > Math.abs(deltaY)) {
        touchMovedHorizontally = true;
      }
      if (touchMovedHorizontally) {
        event.preventDefault();
        categorySliderElement.scrollLeft = touchStartScrollLeft - deltaX;
      }
    }, { passive: false });
    categorySliderElement.addEventListener("touchend", function() {
      if (touchMovedHorizontally) {
        categorySliderElement.dataset.dragged = "true";
        window.setTimeout(function() { delete categorySliderElement.dataset.dragged; }, 250);
      }
      touchMovedHorizontally = false;
    }, { passive: true });
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;
    categorySliderElement.addEventListener("pointerdown", function(event) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      isDragging = true;
      moved = false;
      startX = event.clientX;
      startScrollLeft = categorySliderElement.scrollLeft;
      categorySliderElement.classList.add("is-mouse-dragging");
      categorySliderElement.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    categorySliderElement.addEventListener("pointermove", function(event) {
      if (!isDragging) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 3) moved = true;
      categorySliderElement.scrollLeft = startScrollLeft - distance;
      if (moved) event.preventDefault();
    });
    const stopDragging = function() {
      if (!isDragging) return;
      isDragging = false;
      categorySliderElement.classList.remove("is-mouse-dragging");
      if (moved) {
        categorySliderElement.dataset.dragged = "true";
        window.setTimeout(function() { delete categorySliderElement.dataset.dragged; }, 120);
      }
    };
    categorySliderElement.addEventListener("pointerup", stopDragging);
    categorySliderElement.addEventListener("pointercancel", stopDragging);
    categorySliderElement.addEventListener("click", function(event) {
      if (categorySliderElement.dataset.dragged === "true") {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
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
