const resizeMsgForm = (e) => {
  let textarea = document.querySelector(".msg-input");

  if (textarea) {
    textarea.style.height = "auto";
    let height = textarea.scrollHeight; // 높이
    textarea.style.height = `${height}px`;
  }
};
