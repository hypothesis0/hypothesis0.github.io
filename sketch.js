document.addEventListener("DOMContentLoaded", () => {
  let dialogShown = false; // Ensure dialog only shows once

  // Load initial images to populate the page
  addImage();
  addImageTop();

  // Disable/Enable scrolling functions
  function disableScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function enableScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Scroll event listener
  window.addEventListener("scroll", () => {
    const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    const scrollTop = window.scrollY <= 50;

    if (scrollBottom) {
      addImage(); // Add image at the bottom
    } else if (scrollTop) {
      addImageTop(); // Add image at the top
    }

    // Show dialog when scroll exceeds a threshold
    if (window.scrollY >= 185000 && !dialogShown) {
      disableScroll();

      Confirm.open({
        title: '🤔',
        message: 'If we have to work and build, can we work on the build of love?',
        okText: 'Yes',
        cancelText: 'No',
        onok: () => {
          redirectToNextPage();
          enableScroll();
        },
        oncancel: () => {
          closeConfirm();
          enableScroll();
        }
      });

      dialogShown = true;
    }

    // Update page height display on scroll
    updatePageHeightDisplay();
  });

  // Function to add an image at the bottom
  function addImage() {
    const image = createImage();
    document.body.appendChild(image);
  }

  // Function to add an image at the top
  function addImageTop() {
    const image = createImage();
    image.onload = () => {
      window.scrollTo(0, window.scrollY + image.height); // Adjust scroll to maintain position
    };
    document.body.insertBefore(image, document.body.firstChild);
  }

  // Function to create an image element
  function createImage() {
    const img = document.createElement("img");
    img.src = "column3.png"; // Ensure path is correct
    img.alt = "Dynamic Image";
    img.classList.add("dynamic-image");
    return img;
  }

  // Function to update the page height display
  function updatePageHeightDisplay() {
    const pixels = document.documentElement.scrollHeight;
    const centimeters = (pixels / 96) * 2.54;
    const pageHeightDisplay = document.getElementById("pageHeightDisplay");
    if (pageHeightDisplay) {
      pageHeightDisplay.textContent = `Column height: ${centimeters.toFixed(2)} cm`;
    }
  }
});

// Confirm dialog definition
const Confirm = {
  open(options) {
    options = Object.assign({
      title: '',
      message: '',
      okText: 'OK',
      cancelText: 'Cancel',
      onok: () => {},
      oncancel: () => {}
    }, options);

    const html = `
      <div class="confirm">
        <div class="confirm__window">
          <div class="confirm__titlebar">
            <span class="confirm__title">${options.title}</span>
            <button class="confirm__close">&times;</button>
          </div>
          <div class="confirm__content">${options.message}</div>
          <div class="confirm__buttons">
            <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
            <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
          </div>
        </div>
      </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    const confirmEl = template.content.firstChild;

    confirmEl.querySelector('.confirm__button--ok').addEventListener('click', () => {
      options.onok();
      this._close(confirmEl);
    });

    confirmEl.querySelector('.confirm__button--cancel').addEventListener('click', () => {
      options.oncancel();
      this._close(confirmEl);
    });

    confirmEl.querySelector('.confirm__close').addEventListener('click', () => {
      options.oncancel();
      this._close(confirmEl);
    });

    document.body.appendChild(confirmEl);
  },
  _close(confirmEl) {
    confirmEl.classList.add('confirm--close');
    confirmEl.addEventListener('animationend', () => {
      document.body.removeChild(confirmEl);
    });
  }
};

// Close confirm dialog manually
function closeConfirm() {
  const confirm = document.querySelector(".confirm");
  if (confirm) {
    confirm.remove();
  }
}

// Redirect to another page
function redirectToNextPage() {
  window.location.href = "indexheart.html";
}


