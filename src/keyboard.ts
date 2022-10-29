import { Action } from "./actions";
type Mode = "normal" | "dom" | "switch" | "delete" | "jumpScroll" | "search";

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
  backToNormalModeAfter(800);
};

const createAction = (
  action: Action,
  cond: boolean,
  fallback: null | (() => Action) = null
) => {
  if (cond) {
    return action;
  }

  return fallback ? fallback() : ({ type: "Ignore" } as Action);
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
    if (mode === "switch") {
      return {
        type: "HistoryForward",
      };
    }
    if (mode === "search") {
      return {
        type: "SearchClickables",
      };
    }
    setMode("search");
    return {
      type: "Ignore",
    };
  }
  if (e.code === "KeyX" && noCtrlShiftAlt) {
    return createAction({ type: "DeleteCurrentTab" }, mode === "delete", () => {
      setMode("delete");
      return {
        type: "Ignore",
      };
    });
  }
  if (e.code === "KeyG" && noCtrlShiftAlt) {
    return createAction(
      { type: "JumpScrollToTop" },
      mode === "jumpScroll",
      () => {
        setMode("jumpScroll");
        return {
          type: "Ignore",
        };
      }
    );
  }
  if (e.code === "KeyG" && e.shiftKey) {
    return createAction({ type: "JumpScrollToBottom" }, isNormal);
  }
  if (e.code === "KeyF" && noCtrlShiftAlt) {
  }

  return {
    type: "Ignore",
  };
};
