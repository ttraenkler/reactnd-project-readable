import type { Category } from "../types";

// ACTION TYPE CONSTANTS ______________________________________________________

/** action type constants */
export const type = {
  LOAD_CATEGORIES: "load categories"
};

// ACTION FLOWTYPES ___________________________________________________________

/** action type for loading categories */
export type LoadCategoriesAction = {
  type: "load categories",
  payload: {
    categories: Category[]
  }
};

// ACTION CREATORS ____________________________________________________________

/** action creator for a new category */
export const load = (categories: Category[]): LoadCategoriesAction => ({
  type: type.LOAD_CATEGORIES,
  payload: {
    categories
  }
});
