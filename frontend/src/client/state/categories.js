// redux logic for managing post categories
import type { Category } from "../types";

/** category action types */
export const type = {
  CREATE_CATEGORY: "create category",
  REMOVE_CATEGORY: "remove category"
};

/** category actions */
export const actions = {
  /** create a new category */
  create: (category: Category) => ({
    type: type.CREATE_CATEGORIES,
    payload: {
      category
    }
  }),
  /** remove an existing category */
  remove: (category: string) => ({
    type: type.REMOVE_CATEGORY,
    payload: {
      category
    }
  })
};

/** categories state reducer - processes category actions */
export const reducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case type.CREATE_CATEGORY:
      return [...state, payload.category];
    case type.REMOVE_CATEGORY:
      const i = state.indexOf(payload.category);
      return state.splice(i);
    default:
      return state;
  }
};
