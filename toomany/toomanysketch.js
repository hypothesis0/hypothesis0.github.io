document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("image-container");
  const images = container.getElementsByTagName("img");

  for (let img of images) {
    // Random size between 50px and 200px
    const dimension = Math.random() * (200 - 50) + 50;
    img.style.width = `${dimension}px`;
    img.style.height = `auto`;

    // Wait for image to load to get proper height for positioning
    img.onload = function () {
      const maxX = container.clientWidth - img.clientWidth; // Prevent overflow on the right
      const maxY = container.clientHeight - img.clientHeight; // Prevent overflow at the bottom
      const posX = Math.random() * maxX;
      const posY = Math.random() * maxY;

      img.style.left = `${posX}px`;
      img.style.top = `${posY}px`;
    };

    // For images already loaded before the script runs
    if (img.complete) {
      img.onload();
    }
  }
});
