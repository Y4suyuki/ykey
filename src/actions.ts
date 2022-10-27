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
  | "JumpScrollToBottom";

export type Action = {
  type: ActionType;
};
