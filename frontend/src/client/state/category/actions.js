import type { Category } from "../types";

// ACTION TYPE CONSTANTS ______________________________________________________

/** action type constants */
export const type = {
  LOAD_CATEGORIES: "load categories",
  REMOVE_CATEGORY: "remove category"
};

// ACTION FLOWTYPES ___________________________________________________________

/** action type for loading categories */
export type LoadCategoriesAction = {
  type: "load categories",
  payload: {
    categories: Category[]
  }
};

/** action type for removing categories */
export type RemoveCategoriesAction = {
  type: "remove category",
  payload: {
    category: string
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

/** action creator for removing an existing category */
export const remove = (category: string): RemoveCategoriesAction => ({
  type: type.REMOVE_CATEGORY,
  payload: {
    category
  }
});
