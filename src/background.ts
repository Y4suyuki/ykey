chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  console.log("reason:", reason);

  if (reason === "install") {
    console.log("on install");

    chrome.tabs.create({
      url: "onboarding.html",
    });
  } else if (reason === "update") {
    console.log("on update");
    chrome.tabs.create({
      url: "onboarding.html",
    });
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function getNextTab(tab: chrome.tabs.Tab) {
  console.log(`tabId: ${tab.id}`);
  console.log(`tab.index: ${tab.index}`);
  const [nextTab] = await chrome.tabs.query({ index: tab.index + 1 });
  return nextTab;
}

async function getPreviousTab(tab: chrome.tabs.Tab) {
  console.log(`tabId: ${tab.id}`);
  console.log(`tab.index: ${tab.index}`);
  const [previousTab] = await chrome.tabs.query({ index: tab.index - 1 });
  return previousTab;
}

// app scripts
chrome.runtime.onMessage.addListener(async function (
  req,
  sender,
  sendResponse
) {
  console.log(
    sender.tab ? "from content script:" + sender.tab.url : "from the extension"
  );

  const currentTab = await getCurrentTab();
  switch (req.type) {
    case "NextTab":
      const nextTab = await getNextTab(currentTab);
      await chrome.tabs.update(nextTab.id, { active: true });
      sendResponse({ farewell: "goodbye" });
      break;

    case "PreviousTab":
      const previousTab = await getPreviousTab(currentTab);
      await chrome.tabs.update(previousTab.id, { active: true });
      sendResponse({ farewell: "goodbye" });
      break;
    case "NewTab":
      await chrome.tabs.create({
        active: true,
      });
      sendResponse({ farewell: "goodbye" });
      break;
    case "DeleteCurrentTab":
      await chrome.tabs.remove(currentTab.id);
      sendResponse({ farewell: "goodbye" });
      break;
    default:
      console.log("%cNothing matched", "color: green;");
  }
});
