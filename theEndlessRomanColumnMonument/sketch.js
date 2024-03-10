document.addEventListener("DOMContentLoaded", (event) => {
  // Load initial images
  addImage(); // Adds an image at the bottom
  addImageTop(); // Adds an image at the top

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // User is at the bottom of the page
      addImage();
    } else if (window.scrollY === 0) {
      // User is at the top of the page
      addImageTop();
    }
  });
});

function addImage() {
  const image = document.createElement("img");
  image.src = "column3.jpg"; // Replace with your image path
  image.classList.add("dynamic-image");
  document.body.appendChild(image);
}

function addImageTop() {
  const image = document.createElement("img");
  image.onload = function () {
    // Adjust the scroll only after the image has loaded and its height is known
    const imageHeight = this.height;
    window.scrollTo(0, window.scrollY + imageHeight);
  };
  image.src = "column3.jpg"; // Replace with your image path
  image.classList.add("dynamic-image");
  document.body.insertBefore(image, document.body.firstChild);
}
