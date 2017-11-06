import type { Category } from "../types";

export const type = {
  LOAD_CATEGORIES: "load categories",
  REMOVE_CATEGORY: "remove category"
};

export type LoadCategoriesAction = {
  type: "load categories",
  payload: {
    categories: Category[]
  }
};
/** create a new category */
export const load = (categories: Category[]): LoadCategoriesAction => ({
  type: type.LOAD_CATEGORIES,
  payload: {
    categories
  }
});

export type RemoveCategoriesAction = {
  type: "remove category",
  payload: {
    category: string
  }
};
/** remove an existing category */
export const remove = (category: string): RemoveCategoriesAction => ({
  type: type.REMOVE_CATEGORY,
  payload: {
    category
  }
});
