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

// ===== Dinosaur that chases the cursor across the forest =====
function setupDino() {
  var forest = document.querySelector(".forest");
  if (!forest) return;

  var dino = document.createElement("div");
  dino.className = "dino";
  dino.textContent = "🦖";
  forest.appendChild(dino);

  var half = 28;           // roughly half the dino's width
  var currentX = 60;       // where the dino is now
  var targetX = 60;        // where it wants to go (the cursor)
  var facing = 1;          // 1 = facing right, -1 = facing left

  // Follow the cursor's horizontal position (left to right)
  document.addEventListener("mousemove", function (e) {
    var rect = forest.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var maxX = rect.width - half;
    targetX = Math.max(half, Math.min(maxX, x));
  });

  function tick() {
    var dx = targetX - currentX;
    currentX += dx * 0.025;                // ease toward the cursor (slower)
    if (Math.abs(dx) > 0.5) facing = dx > 0 ? 1 : -1;
    // 🦖 emoji faces left by default, so flip when running right
    var flip = facing === 1 ? -1 : 1;
    dino.style.transform =
      "translateX(" + (currentX - half) + "px) scaleX(" + flip + ")";
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", function () {
  showGreeting();
  showFunFact();
  setupLightbox();
  setupDino();
});
