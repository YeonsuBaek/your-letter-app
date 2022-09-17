const inAppModal = document.querySelector(".in-app-modal");

window.onload = function () {
  if (
    navigator.userAgent.match(
      /inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i
    )
  ) {
    document.body.innerHTML = "";
    if (navigator.userAgent.match(/iPhone|iPad/i)) {
      inAppModal.classList.add("is-show");
    } else {
      location.href =
        "intent://" +
        location.href.replace(/https?:\/\//i, "") +
        "#Intent;scheme=http;package=com.android.chrome;end";
    }
  }
};
