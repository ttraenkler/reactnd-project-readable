export const type = {
  LOAD_CATEGORIES: "create categories",
  REMOVE_CATEGORY: "remove category"
};

export type CategoryType = string;

export const actions = {
  load: (categories: CategoryType) => ({
    type: type.LOAD_CATEGORIES,
    payload: {
      categories
    }
  }),
  remove: (category: CategoryType) => ({
    type: type.REMOVE_CATEGORY,
    payload: {
      category
    }
  })
};

export const reducer = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case type.LOAD_CATEGORIES:
      return [...state, ...payload.categories];
    case type.REMOVE_CATEGORY:
      const i = state.indexOf(payload.category);
      return state.splice(i);
    default:
      return state;
  }
};
