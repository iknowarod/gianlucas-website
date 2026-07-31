// ===== Cheerful time-based greeting =====
// Morning  -> "Good morning"
// Afternoon -> "Good afternoon"
// Night    -> "Good evening"

function showGreeting() {
  var greetingEl = document.getElementById("greeting");
  var emojiEl = document.getElementById("greeting-emoji");
  if (!greetingEl) return;

  var hour = new Date().getHours();
  var text, emoji;

  if (hour >= 5 && hour < 12) {
    text = "Good morning!";
    emoji = "🌅";
  } else if (hour >= 12 && hour < 18) {
    text = "Good afternoon!";
    emoji = "☀️";
  } else {
    text = "Good evening!";
    emoji = "🌙";
  }

  greetingEl.textContent = text;
  if (emojiEl) emojiEl.textContent = emoji;
}

// ===== Fun fact of the day =====
// A big list of fun facts. We pick one using today's date,
// so it is different every single day and rotates through the list.

var FUN_FACTS = [
  "A bearded dragon can wave its arm to say hello to other lizards! 🦎",
  "Soccer is the most popular sport in the whole world! ⚽",
  "Sushi means 'sour rice' — the rice is a little tangy! 🍣",
  "A group of trees is called a forest. 🌳",
  "Some lizards can grow their tails back if they lose them! 🦎",
  "Karate started on an island in Japan called Okinawa. 🥋",
  "The first Pokémon ever made was Rhydon, not Pikachu! ⚡",
  "Honey never goes bad — it can last for thousands of years! 🍯",
  "A day on the planet Venus is longer than its whole year! 🪐",
  "Octopuses have three hearts and blue blood! 🐙",
  "Butterflies taste with their feet! 🦋",
  "A bolt of lightning is hotter than the surface of the Sun! ⚡",
  "Bearded dragons can change color a little to warm up or cool down. 🦎",
  "Bananas are berries, but strawberries are not! 🍌",
  "The heart of a shrimp is in its head! 🦐",
  "Sea otters hold hands while they sleep so they don't float away. 🦦",
  "A cloud can weigh more than a million pounds! ☁️",
  "Cows have best friends and get sad when they are apart. 🐄",
  "The longest hiccup lasted 68 years! 😅",
  "A snail can sleep for three years! 🐌",
  "Sharks existed before trees did! 🦈",
  "There are more stars in space than grains of sand on Earth. ⭐",
  "Pokémon started as a video game about collecting bugs. 🐛",
  "Your body has enough water to fill a big bucket! 💧",
  "Frogs can breathe through their skin! 🐸",
  "Wombat poop is shaped like little cubes! 🟫",
  "A jumping flea can leap 200 times its own height! 🦗",
  "Some soccer balls have exactly 32 panels sewn together. ⚽",
  "The smallest lizard can fit on a coin! 🦎",
  "Karate belts change color as you get better and better. 🥋",
  "Rainbows are actually full circles — we just see half! 🌈"
];

function showFunFact() {
  var factEl = document.getElementById("fun-fact");
  if (!factEl) return;

  // Figure out which day of the year it is (1 to 366).
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var dayOfYear = Math.floor(diff / oneDay);

  // Pick a fact based on the day so it changes every single day.
  var index = dayOfYear % FUN_FACTS.length;
  factEl.textContent = FUN_FACTS[index];
}

// ===== Click a picture to see it bigger =====
function setupLightbox() {
  var box = document.getElementById("lightbox");
  if (!box) return;
  var bigImg = box.querySelector("img");
  var zoomables = document.querySelectorAll(".zoomable");

  zoomables.forEach(function (img) {
    img.addEventListener("click", function () {
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      box.classList.add("open");
    });
  });

  box.addEventListener("click", function () {
    box.classList.remove("open");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") box.classList.remove("open");
  });
}

// ===== Pterodactyl that flies after the cursor (up, down, left & right) =====
function setupDino() {
  var forest = document.querySelector(".forest");
  if (!forest) return;

  // A detailed, colored pteranodon illustration (side view, facing LEFT).
  var PTERO =
    '<svg viewBox="0 0 240 160" width="96" height="64" xmlns="http://www.w3.org/2000/svg">' +
    // far wing (behind, darker)
    '<path fill="#8a5e39" d="M104 70 C 142 46 182 38 210 44 C 182 58 154 76 132 96 C 124 86 112 76 104 70 Z"/>' +
    // far leg
    '<path fill="#7d5330" d="M122 92 L 128 118 L 135 116 L 129 92 Z"/>' +
    // near leg
    '<path fill="#9c6a3c" d="M110 90 L 116 120 L 124 118 L 118 90 Z"/>' +
    // body
    '<path fill="#a9764c" d="M60 66 C 84 58 112 60 138 72 C 158 82 172 84 180 90 C 170 98 150 98 134 93 C 112 100 88 95 72 84 C 60 77 52 71 60 66 Z"/>' +
    // cream belly
    '<path fill="#e8cfa2" d="M80 84 C 100 94 122 96 140 91 C 156 94 170 93 179 90 C 166 99 146 101 124 99 C 104 97 88 92 80 84 Z"/>' +
    // neck to head
    '<path fill="#a9764c" d="M64 66 C 52 60 42 60 40 66 C 46 72 56 74 66 74 C 76 72 82 68 64 66 Z"/>' +
    // orange head crest (the pteranodon signature)
    '<path fill="#d1543a" d="M58 52 C 66 44 80 36 102 26 C 90 42 78 54 70 60 C 65 59 60 57 58 52 Z"/>' +
    // head
    '<circle fill="#a9764c" cx="52" cy="60" r="13"/>' +
    // beak (points left)
    '<path fill="#e9cf98" d="M44 56 L 8 67 L 44 71 C 51 66 51 61 44 56 Z"/>' +
    // eye
    '<circle fill="#ffffff" cx="50" cy="57" r="4.2"/>' +
    '<circle fill="#20140a" cx="49" cy="57" r="2.1"/>' +
    // near wing: arm (brown) + membrane (lighter)
    '<path fill="#a9764c" d="M76 62 C 118 38 170 32 224 44 C 198 50 172 58 150 68 Z"/>' +
    '<path fill="#c99c68" d="M150 68 C 172 58 198 50 224 44 C 192 64 156 86 126 98 C 129 84 139 73 150 68 Z"/>' +
    '</svg>';

  var dino = document.createElement("div");
  dino.className = "dino";
  dino.innerHTML = PTERO;
  forest.appendChild(dino);

  var halfW = 48, halfH = 32;      // roughly half the pterodactyl's size
  var rect = forest.getBoundingClientRect();
  var currentX = rect.width / 2, currentY = rect.height / 2;
  var targetX = currentX, targetY = currentY;
  var facing = 1;                  // 1 = flying right, -1 = flying left

  // Follow the cursor in BOTH directions, but keep the target inside the banner
  document.addEventListener("mousemove", function (e) {
    var r = forest.getBoundingClientRect();
    var x = e.clientX - r.left;
    var y = e.clientY - r.top;
    targetX = Math.max(halfW, Math.min(r.width - halfW, x));
    targetY = Math.max(halfH, Math.min(r.height - halfH, y));
  });

  function tick() {
    var dx = targetX - currentX;
    var dy = targetY - currentY;
    currentX += dx * 0.03;         // gentle glide toward the cursor
    currentY += dy * 0.03;
    if (Math.abs(dx) > 0.5) facing = dx > 0 ? 1 : -1;
    // drawing faces left, so flip when flying right
    var flip = facing === 1 ? -1 : 1;
    dino.style.transform =
      "translate(" + (currentX - halfW) + "px," + (currentY - halfH) + "px) scaleX(" + flip + ")";
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== Tap a price to see how to buy =====
function setupBuyPopup() {
  var popup = document.getElementById("buy-popup");
  if (!popup) return;
  var prices = document.querySelectorAll(".price");
  var closeBtn = popup.querySelector(".popup-close");

  function open() { popup.classList.add("open"); }
  function close() { popup.classList.remove("open"); }

  prices.forEach(function (price) {
    price.addEventListener("click", open);
  });

  // Close via the × button (its own handler so it always works)
  if (closeBtn) closeBtn.addEventListener("click", close);

  // Close when tapping the dark background outside the box
  popup.addEventListener("click", function (e) {
    if (e.target === popup) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
}

// ===== Press the "Hire Me" button to see how to hire =====
function setupHirePopup() {
  var popup = document.getElementById("hire-popup");
  if (!popup) return;
  var btns = document.querySelectorAll(".hire-btn");
  var closeBtn = popup.querySelector(".popup-close");

  function open() { popup.classList.add("open"); }
  function close() { popup.classList.remove("open"); }

  btns.forEach(function (b) { b.addEventListener("click", open); });
  if (closeBtn) closeBtn.addEventListener("click", close);
  popup.addEventListener("click", function (e) {
    if (e.target === popup) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showGreeting();
  showFunFact();
  setupLightbox();
  setupDino();
  setupBuyPopup();
  setupHirePopup();
});
