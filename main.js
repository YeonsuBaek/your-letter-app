const messageForm = document.querySelector(".msg-form");
const messageInput = document.querySelector(".msg-input");
const messagePlaceholder = document.querySelector(".msg-placeholder");
const exportButton = document.querySelector(".export-button");
const captureImage = document.querySelector(".capture-image");
const exportModal = document.querySelector(".export-modal");
const overlay = document.querySelector(".overlay");
const fontOptionButtonList = document.querySelectorAll(".font-option");
const colorOptionButtonList = document.querySelectorAll(".color-option");
let currentFont = document.querySelector(".font-option.is-selected");
let currentColor = document.querySelector(".color-option.is-selected");

const startWritting = () => {
  if (messageInput.innerHTML == "") {
    messagePlaceholder.classList.remove("hidden");
  } else {
    messagePlaceholder.classList.add("hidden");
  }
};

const resizeMsgForm = (e, onkey) => {
  if (messageInput) {
    messageInput.style.height = "auto";
    let height = messageInput.scrollHeight;
    messageInput.style.height = `${height}px`;
  }

  if (onkey == "up") {
    startWritting();
    if (e.keyCode == 13) {
      messageInput.lastChild.style.color = window
        .getComputedStyle(messageInput)
        .getPropertyValue("color");

      messageInput.lastChild.style.fontFamily = window
        .getComputedStyle(messageInput)
        .getPropertyValue("font-family");
    }
  }
};

const captureExport = () => {
  html2canvas(document.querySelector(".msg-form"), {
    logging: true,
    letterRendering: 1,
    allowTaint: true,
    useCORS: true,
    width: 345,
    height: messageInput.offsetHeight + 16,
  }).then((canvas) => {
    captureImage.appendChild(canvas).classList.add("canvas");
    let el = document.createElement("a");
    el.href = canvas.toDataURL("image/jpeg");
    el.download = "letter.jpg";
    el.click();
  });

  exportModal.classList.remove("hidden");
};

const closeExportModal = () => {
  captureImage.removeChild(captureImage.firstElementChild);

  exportModal.classList.add("hidden");
};

exportButton.addEventListener("click", captureExport);
overlay.addEventListener("click", closeExportModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeExportModal();
  }
});

function changeFont() {
  currentFont.classList.remove("is-selected");
  this.classList.add("is-selected");
  currentFont = this;

  let fontName = currentFont.firstElementChild.className;

  if (fontName == "font-01") {
    messageInput.style.fontFamily = "KyoboHand";
  }
  if (fontName == "font-02") {
    messageInput.style.fontFamily = "EarlyFontDiary";
  }
  if (fontName == "font-03") {
    messageInput.style.fontFamily = "KOTRAHOPE";
  }

  for (const child of messageInput.children) {
    child.style.fontFamily = window
      .getComputedStyle(messageInput)
      .getPropertyValue("font-family");
  }
}

function changeColor() {
  currentColor.classList.remove("is-selected");
  this.classList.add("is-selected");
  currentColor = this;

  let colorName = currentColor.firstElementChild.className;

  if (colorName == "color-blue") {
    messageForm.style.backgroundColor = "#dfe3ee";
    messageInput.style.color = "#3b5998";
  }
  if (colorName == "color-green") {
    messageForm.style.backgroundColor = "#b2d8d8";
    messageInput.style.color = "#004c4c";
  }
  if (colorName == "color-pink") {
    messageForm.style.backgroundColor = "#ffcae5";
    messageInput.style.color = "#ff0081";
  }
  if (colorName == "color-brown") {
    messageForm.style.backgroundColor = "#ffdbac";
    messageInput.style.color = "#8d5524";
  }

  for (const child of messageInput.children) {
    child.style.color = window
      .getComputedStyle(messageInput)
      .getPropertyValue("color");
  }
}

fontOptionButtonList.forEach(function (button) {
  button.addEventListener("click", changeFont);
});

colorOptionButtonList.forEach(function (button) {
  button.addEventListener("click", changeColor);
});
