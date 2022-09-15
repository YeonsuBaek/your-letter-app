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

const resizeMsgForm = (e) => {
  if (messageInput) {
    messageInput.style.height = "auto";
    let height = messageInput.scrollHeight;
    messageInput.style.height = `${height}px`;
  }

  if (messageInput.childNodes.length != 0) {
    messagePlaceholder.classList.add("hidden");
  } else {
    messagePlaceholder.classList.remove("hidden");
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

  let fontName = currentFont.firstElementChild.innerHTML;

  if (fontName == "교보손글씨") {
    messageInput.style.fontFamily = "KyoboHand";
  }
  if (fontName == "다이어리체") {
    messageInput.style.fontFamily = "EarlyFontDiary";
  }
  if (fontName == "코트라희망체") {
    messageInput.style.fontFamily = "KOTRAHOPE";
  }
}

function changeColor() {
  currentColor.classList.remove("is-selected");
  this.classList.add("is-selected");
  currentColor = this;
}

fontOptionButtonList.forEach(function (button) {
  button.addEventListener("click", changeFont);
});

colorOptionButtonList.forEach(function (button) {
  button.addEventListener("click", changeColor);
});
