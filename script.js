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

  // Pteranodon gliding silhouette (front view): a smooth wide wing membrane,
  // central head with a pointed beak and the long backward crest, small feet.
  var PTERO =
    '<svg viewBox="0 0 240 130" width="90" height="49" xmlns="http://www.w3.org/2000/svg">' +
    '<g fill="#3f342a">' +
    // smooth wing membrane (pointed tips up, body dip in the middle)
    '<path d="M12 54 Q 120 84 228 54 Q 120 100 12 54 Z"/>' +
    // head
    '<circle cx="120" cy="86" r="12"/>' +
    // pointed beak (points down/forward)
    '<path d="M111 90 L 129 90 L 120 120 Z"/>' +
    // long backward head crest (the pteranodon signature)
    '<path d="M118 80 L 126 73 L 172 38 L 134 82 Z"/>' +
    // feet
    '<path d="M113 100 L 108 118 L 121 104 Z M127 100 L 132 118 L 119 104 Z"/>' +
    '</g></svg>';

  var dino = document.createElement("div");
  dino.className = "dino";
  dino.innerHTML = PTERO;
  forest.appendChild(dino);

  var halfW = 45, halfH = 24;      // roughly half the pterodactyl's size
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
