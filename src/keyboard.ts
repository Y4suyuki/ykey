import { Action } from "./actions";

const logKeyEvent = (e: KeyboardEvent) => {
  console.log(`code: ${e.code}`);
  console.log(`%ckeyboard event`, "color: green;");
  console.dir(e);
};

export const keyboardEventToAction = (e: KeyboardEvent): Action => {
  logKeyEvent(e);
  const noCtrlAndShift = !e.ctrlKey && !e.shiftKey;
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
  if (e.code === "KeyT" && noCtrlAndShift) {
    return {
      type: "NewTab",
    };
  }
  if (e.code === "KeyC" && noCtrlAndShift) {
    return {
      type: "HistoryBack",
    };
  }
  if (e.code === "KeyF" && noCtrlAndShift) {
    return {
      type: "HistoryForward",
    };
  }
  if (e.code === "KeyX" && noCtrlAndShift) {
    return {
      type: "DeleteCurrentTab",
    };
  }
};
