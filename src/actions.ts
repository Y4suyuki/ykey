type ActionType =
  | "ScrollDown"
  | "ScrollUp"
  | "NextTab"
  | "NewTab"
  | "PreviousTab"
  | "HistoryBack"
  | "HistoryForward"
  | "DeleteCurrentTab";

export type Action = {
  type: ActionType;
};
