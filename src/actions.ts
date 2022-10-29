type ActionType =
  | "ScrollDown"
  | "ScrollUp"
  | "NextTab"
  | "NewTab"
  | "PreviousTab"
  | "HistoryBack"
  | "HistoryForward"
  | "DeleteCurrentTab"
  | "Ignore"
  | "JumpScrollToTop"
  | "JumpScrollToBottom"
  | "SearchClickables";

export type Action = {
  type: ActionType;
};
