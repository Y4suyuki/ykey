import { keyboardEventToAction } from "./keyboard";

const scrollPitch = 50;

const isEngagingInputForm = () => {
  const activeTagName = document.activeElement.tagName;

  const inputFormTagNames = ["INPUT", "TEXTAREA"];

  return (
    inputFormTagNames?.some((x) => x === activeTagName) ||
    isEngagingInMiroStickyNote()
  );
};

const isEngagingInMiroStickyNote = () => {
  const activeElement = document.activeElement;
  return activeElement.className === "ql-editor";
};

const actionWithKey = (e: KeyboardEvent) => {
  let action = keyboardEventToAction(e);
  switch (action.type) {
    case "ScrollDown":
      window.scrollBy(0, scrollPitch);
      break;
    case "ScrollUp":
      window.scrollBy(0, -scrollPitch);
      break;
    case "NextTab":
      chrome.runtime.sendMessage(action, async function (res) {
        console.log(res);
      });
      break;
    case "PreviousTab":
      chrome.runtime.sendMessage(action, async function (res) {
        console.log(res);
      });
      break;
    case "NewTab":
      chrome.runtime.sendMessage(action, async function (res) {
        console.log(res);
      });
      break;

    case "HistoryBack":
      window.history.back();
      break;
    case "HistoryForward":
      window.history.forward();
      break;
    case "DeleteCurrentTab":
      chrome.runtime.sendMessage(action, async function (res) {
        console.log(res);
      });
      break;
    default:
      console.log("%cno match", "color: green;");
  }
};

console.log("load content-script.ts");

window.addEventListener("keydown", function (e) {
  if (isEngagingInputForm()) {
    return;
  }
  chrome.storage.sync.get("ignoreHosts", ({ ignoreHosts }) => {
    if (ignoreHosts?.some((x: string) => x === window.location.hostname)) {
      return;
    }
    actionWithKey(e);
  });
});
