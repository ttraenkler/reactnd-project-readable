// redux logic for managing post categories
import type { Category } from "../types";

/** category action types */
export const type = {
  LOAD_CATEGORIES: "load categories",
  REMOVE_CATEGORY: "remove category"
};

/** category actions */
export const actions = {
  /** create a new category */
  load: (categories: Category[]) => ({
    type: type.LOAD_CATEGORIES,
    payload: {
      categories
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
    case type.LOAD_CATEGORIES:
      return state.splice().concat(payload.categories);
    case type.REMOVE_CATEGORY:
      const i = state.indexOf(payload.category);
      return state.splice(i);
    default:
      return state;
  }
};
