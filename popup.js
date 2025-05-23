document.getElementById("saveUrl").addEventListener("click", () => {
  const urlFragment = document.getElementById("targetUrl").value.trim();
  if (!urlFragment) return;

  chrome.runtime.sendMessage({ type: "saveTargetUrl", data: { urlFragment } }, (response) => {
    if (response && response.success) {
      alert("Target URL fragment saved!");
    }
  });
});
