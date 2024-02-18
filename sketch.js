document.addEventListener("DOMContentLoaded", (event) => {
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // User is at the bottom of the page, so add a new image
      addImage();
    }
  });

  // Initially load some images
  addImage();
  addImage();
});

function addImage() {
  const image = document.createElement("img");
  image.src = "column1.jpg"; // Replace with your image path
  image.classList.add("dynamic-image");
  document.body.appendChild(image);
}
