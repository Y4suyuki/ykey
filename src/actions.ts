type ActionType =
  | "ScrollDown"
  | "ScrollUp"
  | "NextTab"
  | "NewTab"
  | "PreviousTab"
  | "HistoryBack"
  | "HistoryForward"
  | "DeleteCurrentTab"
  | "Ignore";

export type Action = {
  type: ActionType;
};
