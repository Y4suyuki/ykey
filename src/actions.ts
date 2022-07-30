type ActionType =
  | "ScrollDown"
  | "ScrollUp"
  | "NextTab"
  | "NewTab"
  | "PreviousTab"
  | "HistoryBack"
  | "HistoryForward"
  | "DeleteCurrentTab"
  | "IgnoreNext";


export type Action = {
  type: ActionType;
};
