// popup.js
document.getElementById("save").addEventListener("click", () => {
    const key = document.getElementById("apikey").value;
    chrome.storage.local.set({ openai_key: key }, () => {
      alert("API key saved!");
    });
  });
  
  document.getElementById("run").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  });
  