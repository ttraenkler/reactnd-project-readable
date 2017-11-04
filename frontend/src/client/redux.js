import * as request from "./request";
import { store, actions } from "./state";
export { store, actions };
export async function load() {
  console.log("load()");
  /* const categories = await request.get.categories();
  store.dispatch(actions.category.load(categories));
  const posts = await request.get.posts();
  store.dispatch(actions.post.load(posts));
  console.log(store.getState()); */
}

export async function testPost() {
  request.post.post();
}
