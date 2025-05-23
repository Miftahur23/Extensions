chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "saveTargetUrl") {
    const urlFragment = message.data.urlFragment;
    chrome.storage.local.set({ urlFragment }, () => {
      console.log("Background: URL fragment saved:", urlFragment);
      sendResponse({ success: true });
    });
    return true; // keep message channel open
  }

  if (message.type === "reloadTargetTab") {
    chrome.storage.local.get("urlFragment", ({ urlFragment }) => {
      if (!urlFragment) {
        console.log("Background: No URL fragment saved.");
        sendResponse({ success: false, error: "No URL fragment found" });
        return;
      }

      chrome.tabs.query({}, (tabs) => {
        const targetTab = tabs.find(tab => tab.url && tab.url.includes(urlFragment));
        if (targetTab) {
          console.log("Background: Reloading tab:", targetTab.url);
          chrome.tabs.reload(targetTab.id, () => {
            sendResponse({ success: true });
          });
        } else {
          console.log("Background: No matching tab found.");
          sendResponse({ success: false, error: "No matching tab found" });
        }
      });
    });

    return true; // keep message channel open
  }
});
