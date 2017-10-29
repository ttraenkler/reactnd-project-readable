export const type = {
  CREATE_CATEGORY: "create category",
  REMOVE_CATEGORY: "remove category"
};

export type CategoryType = string;

export const category = {
  create: (category: CategoryType) => ({
    type: type.CREATE_CATEGORY,
    payload: {
      category
    }
  }),
  remove: (category: CategoryType) => ({
    type: type.REMOVE_CATEGORY,
    payload: {
      category
    }
  })
};

export const reducer = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case type.CREATE_CATEGORY:
      return {
        ...state,
        [payload.category]: {}
      };
    case type.REMOVE_CATEGORY:
      return {
        ...state,
        [payload.category]: undefined
      };
    default:
      return state;
  }
};
