document.addEventListener("DOMContentLoaded", () => {
  // Existing image loading functionality
  addImage();
  addImageTop();

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addImage();
    } else if (window.scrollY === 0) {
      addImageTop();
    }
  });

  // Update page height display initially and on scroll
  updatePageHeightDisplay();
  window.addEventListener("scroll", updatePageHeightDisplay);
});

function addImage() {
  const image = document.createElement("img");
  image.src = "img/column3.jpg"; // Make sure this path is correct
  image.classList.add("dynamic-image");
  document.body.appendChild(image);
}

function addImageTop() {
  const image = document.createElement("img");
  image.onload = function () {
    const imageHeight = this.height;
    window.scrollTo(0, window.scrollY + imageHeight);
  };
  image.src = "img/column3.jpg"; // Make sure this path is correct
  image.classList.add("dynamic-image");
  document.body.insertBefore(image, document.body.firstChild);
}

function updatePageHeightDisplay() {
  const pixels = document.documentElement.scrollHeight;
  const centimeters = (pixels / 96) * 2.54;
  const pageHeightDisplay = document.getElementById("pageHeightDisplay");
  pageHeightDisplay.textContent = `column height: ${centimeters.toFixed(2)} cm`;
  // Optionally update the href if it needs to be dynamic
  pageHeightDisplay.href = "your-dynamic-url-based-on-height-or-other-logic";
}

