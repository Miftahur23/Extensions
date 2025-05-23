const buttonClass = "VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-Bz112c-M1Soyc VfPpkd-LgbsSe-OWXEXe-dgl2Hf LjDxcd XhPA0b HDnnrf LQeN7 IVKqHd n7tYFd C9y3Me";
const selector = '.' + buttonClass.trim().split(' ').join('.');

const waitForButton = () => {
  const btn = document.querySelector(selector);
  if (!btn) {
    setTimeout(waitForButton, 500);
    return;
  }

btn.addEventListener("click", () => {
    console.log("Button clicked — sending reloadTargetTab message");
            chrome.runtime.sendMessage({ type: "reloadTargetTab" }, (response) => {
            console.log("Background response:", response);
        });
    });
};

waitForButton();
