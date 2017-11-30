import { type } from "./actions";
import type { Action } from "./actions";

/** categories state reducer - processes category actions */
export const reducer = (state = [], action: Action) => {
  const { payload } = action;
  switch (action.type) {
    case type.LOAD_CATEGORIES: {
      return [...payload.categories];
    }
    default:
      return state;
  }
};
