import { actions as category } from "./categories";
import { actions as post } from "./posts";

export { default as store } from "./store";
export const actions = {
  category,
  post
};
