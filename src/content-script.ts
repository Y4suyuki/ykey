type Mode = "normal" | "dom" | "switch" | "delete";

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

const logKeyEvent = (e: KeyboardEvent) => {
  console.log(`code: ${e.code}`);
  console.log(`%ckeyboard event`, "color: green;");
  console.dir(e);
};

const actionWithKey = (e: KeyboardEvent) => {
  logKeyEvent(e);
  switch (e.code) {
    case "KeyJ":
      window.scrollBy(0, scrollPitch);
      break;
    case "KeyK":
      window.scrollBy(0, -scrollPitch);
      break;
    case "BracketRight":
      chrome.runtime.sendMessage({ action: "NextTab" }, async function (res) {
        console.log(res);
      });
      break;
    case "BracketLeft":
      chrome.runtime.sendMessage(
        { action: "PreviousTab" },
        async function (res) {
          console.log(res);
        }
      );
      break;
    case "KeyT":
      chrome.runtime.sendMessage({ action: "NewTab" }, async function (res) {
        console.log(res);
      });

    case "KeyC":
      if (mode === "switch") {
        window.history.back();
        mode = "normal";
      } else {
        mode = "switch";
        console.log(`%cmode changed to ${mode}`, "color: green;");
      }
      break;
    case "KeyF":
      if (mode === "switch") {
        window.history.forward();
      }
      mode = "normal";
      break;
    case "KeyX":
      if (mode === "delete") {
        chrome.runtime.sendMessage(
          { action: "DeleteCurrentTab" },
          async function (res) {
            console.log(res);
          }
        );
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
  actionWithKey(e);
});
