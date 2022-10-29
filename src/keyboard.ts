import { Action } from "./actions";
import { detachTags } from "./searchClickables";
type Mode =
  | "normal"
  | "dom"
  | "switch"
  | "delete"
  | "jumpScroll"
  | "search"
  | "clicking";

let mode: Mode = "normal";
let idContainer: NodeJS.Timeout[] = [];

const IgnoreAction: Action = { type: "Ignore" };

const logKeyEvent = (e: KeyboardEvent) => {
  console.log(`%cmode: ${mode}`, "color: white; background: deeppink;");
  console.log(`code: ${e.code}`);
  console.log(`%ckeyboard event`, "color: green;");
  console.dir(e);
};

const backToNormalModeAfter = (s: number) => {
  const _id = setTimeout(() => {
    console.log("hello from timeout");
    mode = "normal";
    console.log("now mode is " + mode);
  }, s);
  idContainer.push(_id);
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

  return fallback ? fallback() : IgnoreAction;
};

const findTooltipAndClick = (e: KeyboardEvent, key: string) => {
  if (e.key === key) {
    const tooltip = document.querySelector(`span.${key}`);
    const p = tooltip.parentElement;
    p.click();
  }
};
export const clickWithKey = (e: KeyboardEvent) => {
  // TODO: fix
  for (let x of "abcdefghijklmnopqrstuvwxyz") {
    findTooltipAndClick(e, x);
  }
  if (e.key === "Escape") {
    mode = "normal";
  }
  detachTags();
};

export const keyboardEventToAction = (e: KeyboardEvent): Action => {
  logKeyEvent(e);
  const noCtrlShiftAlt = !e.ctrlKey && !e.shiftKey && !e.altKey;
  const isNormal = mode === "normal";
  if (mode === "clicking") {
    console.log(`%cmode is clicking`, "color: red");
    clickWithKey(e);
    return IgnoreAction;
  }
  if (e.code === "MetaLeft") {
    // Mac command key or Windows key
    mode = "normal";
    return IgnoreAction;
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
      return IgnoreAction;
    });
  }
  if (e.code === "KeyF" && noCtrlShiftAlt) {
    if (mode === "switch") {
      return {
        type: "HistoryForward",
      };
    }
    if (mode === "search") {
      for (let _id of idContainer) {
        clearTimeout(_id);
      }
      mode = "clicking";
      return {
        type: "SearchClickables",
      };
    }
    setMode("search");
    return IgnoreAction;
  }
  if (e.code === "KeyX" && noCtrlShiftAlt) {
    return createAction({ type: "DeleteCurrentTab" }, mode === "delete", () => {
      setMode("delete");
      return IgnoreAction;
    });
  }
  if (e.code === "KeyG" && noCtrlShiftAlt) {
    return createAction(
      { type: "JumpScrollToTop" },
      mode === "jumpScroll",
      () => {
        setMode("jumpScroll");
        return IgnoreAction;
      }
    );
  }
  if (e.code === "KeyG" && e.shiftKey) {
    return createAction({ type: "JumpScrollToBottom" }, isNormal);
  }

  return IgnoreAction;
};
