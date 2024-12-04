
let dialogShown = false; // To prevent the dialog from showing again

document.addEventListener("DOMContentLoaded", () => {
  // Initialize a flag to track if the confirm dialog has been shown
  let dialogShown = false;

  // Load initial images
  addImage();
  addImageTop();



// Function to disable scrolling
function disableScroll() {
    // Disable scroll by setting overflow to hidden
    document.documentElement.style.overflow = 'hidden'; // Prevent scrolling on the whole page
    document.body.style.overflow = 'hidden'; // Prevent scrolling specifically on body
}

// Function to enable scrolling
function enableScroll() {
    // Enable scroll by resetting overflow
    document.documentElement.style.overflow = ''; // Restore the default overflow value
    document.body.style.overflow = ''; // Restore the default overflow value
}

// Scroll event listener
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        addImage(); // Add image at the bottom
    } else if (window.scrollY === 0) {
        addImageTop(); // Add image at the top
    }

    // Show the confirm dialog when scroll position exceeds 29000 pixels
    if (window.scrollY >= 185000 && !dialogShown) {
        // Disable scrolling when the confirmation window opens
        disableScroll();
        
        Confirm.open({
            title: '🤔',
            message: 'Sigmund freud says human needs two things for happiness, love and work. <br> If we humans have to work, can we work for love?',
            okText: 'Yes',
            cancelText: 'No',
            onok: () => {
                redirectToNextPage();
                enableScroll(); // Re-enable scrolling after the dialog is confirmed
            },
            oncancel: () => {
                closeConfirm();
                enableScroll(); // Re-enable scrolling if the dialog is canceled
            }
        });

        dialogShown = true; // Prevent the dialog from showing again
    }
});


  // Update page height display initially and on scroll
  updatePageHeightDisplay();
  window.addEventListener("scroll", updatePageHeightDisplay);
});

// Function to add an image at the bottom
function addImage() {
  const image = document.createElement("img");
  image.src = "column3.png"; // Ensure this path is correct
  image.classList.add("dynamic-image");
  document.body.appendChild(image);
}

// Function to add an image at the top
function addImageTop() {
  const image = document.createElement("img");
  image.onload = function () {
    const imageHeight = this.height;
    window.scrollTo(0, window.scrollY + imageHeight);
  };
  image.src = "column3.png"; // Ensure this path is correct
  image.classList.add("dynamic-image");
  document.body.insertBefore(image, document.body.firstChild);
}

// Function to update page height display in centimeters
function updatePageHeightDisplay() {
  const pixels = document.documentElement.scrollHeight;
  const centimeters = (pixels / 96) * 2.54; // Convert pixels to cm
  const pageHeightDisplay = document.getElementById("pageHeightDisplay");
  pageHeightDisplay.textContent = `Column height: ${centimeters.toFixed(2)} cm`;
}

// Confirm dialog object
const Confirm = {
  open(options) {
    options = Object.assign({}, {
      title: '',
      message: '',
      okText: 'OK',
      cancelText: 'Cancel',
      onok: function () {},
      oncancel: function () {}
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

    // Event listeners for dialog buttons
    const btnClose = confirmEl.querySelector('.confirm__close');
    const btnOk = confirmEl.querySelector('.confirm__button--ok');
    const btnCancel = confirmEl.querySelector('.confirm__button--cancel');

    confirmEl.addEventListener('click', e => {
      if (e.target === confirmEl) {
        options.oncancel();
        this._close(confirmEl);
      }
    });

    btnOk.addEventListener('click', () => {
      options.onok();
      this._close(confirmEl);
    });

    [btnCancel, btnClose].forEach(el => {
      el.addEventListener('click', () => {
        options.oncancel();
        this._close(confirmEl);
      });
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

// Function to close the confirm dialog manually
function closeConfirm() {
  const confirmDialog = document.querySelector(".confirm");
  if (confirmDialog) {
    confirmDialog.style.display = "none";
  }
}

// Function to redirect to another page
function redirectToNextPage() {
  window.location.href = "indexheart.html";
}

