import { keyboardEventToAction } from "./keyboard";

type Mode = "normal" | "dom" | "switch" | "delete" | "ignoreNext";

let mode: Mode = "normal";
const scrollPitch = 50;

const isEngagingInputForm = () => {
  const activeTagName = document.activeElement.tagName;

  const inputFormTagNames = ["INPUT", "TEXTAREA"];

  return (
    inputFormTagNames.some((x) => x === activeTagName) ||
    isEngagingInMiroStickyNote()
  );
};

const isEngagingInMiroStickyNote = () => {
  const activeElement = document.activeElement;
  return activeElement.className === "ql-editor";
};

const actionWithKey = (e: KeyboardEvent) => {
  let action = keyboardEventToAction(e);
  if (mode === "ignoreNext") {
    console.log("Ignoring. setting mode normal.")
    mode = "normal"
    return
  }
  switch (action.type) {
    case "IgnoreNext":
      mode = "ignoreNext"
      break;
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
      if (mode === "switch") {
        window.history.back();
        mode = "normal";
      } else {
        mode = "switch";
        console.log(`%cmode changed to ${mode}`, "color: green;");
      }
      break;
    case "HistoryForward":
      if (mode === "switch") {
        window.history.forward();
      }
      mode = "normal";
      break;
    case "DeleteCurrentTab":
      if (mode === "delete") {
        chrome.runtime.sendMessage(action, async function (res) {
          console.log(res);
        });
        mode = "normal";
      } else {
        mode = "delete";
        console.log(`%cmode changed to ${mode}`, "color: green;");
      }
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
    if (window.location.hostname === ignoreHosts) {
      return;
    }
    actionWithKey(e);
  })
});
