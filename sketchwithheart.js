document.addEventListener("DOMContentLoaded", () => {
  // Existing image loading functionality
  addImage();
  addImageTop();

  // Combined scroll event listener for images, hearts, and height display
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addImage();
    } else if (window.scrollY === 0) {
      addImageTop();
    }

    adjustHeartsToColumnHeight();
    updatePageHeightDisplay();
  });

  // Initial adjustments
  adjustHeartsToColumnHeight();
  updatePageHeightDisplay();
});

function addImage() {
  const image = document.createElement("img");
  image.onload = function () {
    adjustHeartsToColumnHeight(); // Adjust hearts after the image has loaded and affected layout
    updatePageHeightDisplay(); // Update the displayed height as well
  };
  image.src = "img/column3.jpg"; // Make sure this path is correct
  image.classList.add("dynamic-image");
  document.body.appendChild(image);
}

function addImageTop() {
  const image = document.createElement("img");
  image.onload = function () {
    const imageHeight = this.height;
    window.scrollTo(0, window.scrollY + imageHeight);
    adjustHeartsToColumnHeight(); // Adjust hearts here too
    updatePageHeightDisplay(); // And update the displayed height
  };
  image.src = "img/column3.jpg"; // Ensure this path is correct
  image.classList.add("dynamic-image");
  document.body.insertBefore(image, document.body.firstChild);
}

function addHeart() {
  const heart = document.createElement("div");
  heart.textContent = "♡";
  heart.style.position = "absolute";
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.top = `${
    Math.random() * document.documentElement.scrollHeight
  }px`;
  heart.classList.add("dynamic-heart");
  document.body.appendChild(heart);
}
function calculateHearts() {
  const pixels = document.documentElement.scrollHeight;
  const centimeters = Math.floor((pixels / 96) * 2.54); // Convert scroll height to cm
  return centimeters;
}

function adjustHeartsToColumnHeight() {
  const targetHearts = calculateHearts(); // Desired number of hearts
  const existingHearts = document.querySelectorAll(".dynamic-heart").length;
  const difference = targetHearts - existingHearts;

  if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      addHeart();
    }
  } else {
    for (let i = 0; i < Math.abs(difference); i++) {
      removeHeart();
    }
  }
}

function updatePageHeightDisplay() {
  const pixels = document.documentElement.scrollHeight;
  const centimeters = (pixels / 96) * 2.54;
  document.getElementById(
    "pageHeightDisplay"
  ).textContent = `column height: ${centimeters.toFixed(2)} cm`;
}
function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

document.addEventListener("DOMContentLoaded", adjustHeartsToColumnHeight);

// Adjust hearts on window resize to account for changes in document height
window.addEventListener("resize", debounce(adjustHeartsToColumnHeight, 250));

// Example debounce function
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
