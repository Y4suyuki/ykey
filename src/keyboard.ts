import { Action } from "./actions";
type Mode = "normal" | "dom" | "switch" | "delete";

let mode: Mode = "normal";

const logKeyEvent = (e: KeyboardEvent) => {
  console.log(`code: ${e.code}`);
  console.log(`%ckeyboard event`, "color: green;");
  console.dir(e);
};

const backToNormalModeAfter = (s: number) => {
  setTimeout(() => {
    console.log("hello from timeout");
    mode = "normal";
    console.log("now mode is " + mode);
  }, s);
};

const setMode = (m: Mode) => {
  mode = m;
  console.log(`%csetting mode: ${m}`, "color: green;");
  backToNormalModeAfter(1800);
};

const createAction = (
  action: Action,
  cond: boolean,
  fallback: null | (() => void) = null
) => {
  if (cond) {
    return action;
  }

  fallback ? fallback() : null;
};
export const keyboardEventToAction = (e: KeyboardEvent): Action => {
  logKeyEvent(e);
  const noCtrlShiftAlt = !e.ctrlKey && !e.shiftKey && !e.altKey;
  const isNormal = mode === "normal";
  if (e.code === "MetaLeft") {
    // Mac command key or Windows key
    mode = "normal";
    return {
      type: "Ignore",
    };
  }
  if (e.code === "KeyJ") {
    return createAction({ type: "ScrollDown" }, isNormal);
  }
  if (e.code === "KeyK") {
    return createAction({ type: "ScrollUp" }, isNormal);
  }
  if (e.code === "BracketRight") {
    return createAction({ type: "NextTab" }, isNormal);
  }
  if (e.code === "BracketLeft") {
    return createAction({ type: "PreviousTab" }, isNormal);
  }
  if (e.code === "KeyT" && noCtrlShiftAlt) {
    return createAction({ type: "NewTab" }, isNormal);
  }
  if (e.code === "KeyC" && noCtrlShiftAlt) {
    return createAction({ type: "HistoryBack" }, mode === "switch", () => {
      setMode("switch");
      return { type: "Ignore" };
    });
  }
  if (e.code === "KeyF" && noCtrlShiftAlt) {
    return createAction({ type: "HistoryForward" }, mode === "switch");
  }
  if (e.code === "KeyX" && noCtrlShiftAlt) {
    return createAction({ type: "DeleteCurrentTab" }, mode === "delete", () => {
      setMode("delete");
      return {
        type: "Ignore",
      };
    });
  }

  return {
    type: "Ignore",
  };
};
