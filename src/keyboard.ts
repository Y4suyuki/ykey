import { Action } from "./actions";

const logKeyEvent = (e: KeyboardEvent) => {
  console.log(`code: ${e.code}`);
  console.log(`%ckeyboard event`, "color: green;");
  console.dir(e);
};

export const keyboardEventToAction = (e: KeyboardEvent): Action => {
  logKeyEvent(e);
  const noCtrlShiftAlt = !e.ctrlKey && !e.shiftKey && !e.altKey;
  if (e.code === "MetaLeft") {
    // Mac command key or Windows key
    return {
      type: "IgnoreNext"
    }
  }
  if (e.code === "KeyJ") {
    return {
      type: "ScrollDown",
    };
  }
  if (e.code === "KeyK") {
    return {
      type: "ScrollUp",
    };
  }
  if (e.code === "BracketRight") {
    return {
      type: "NextTab",
    };
  }
  if (e.code === "BracketLeft") {
    return {
      type: "PreviousTab",
    };
  }
  if (e.code === "KeyT" && noCtrlShiftAlt) {
    return {
      type: "NewTab",
    };
  }
  if (e.code === "KeyC" && noCtrlShiftAlt) {
    return {
      type: "HistoryBack",
    };
  }
  if (e.code === "KeyF" && noCtrlShiftAlt) {
    return {
      type: "HistoryForward",
    };
  }
  if (e.code === "KeyX" && noCtrlShiftAlt) {
    return {
      type: "DeleteCurrentTab",
    };
  }
};
