import { get } from "./request";
import { actions } from "./state";

/** loads categories from server and returns as action */
export async function categories(): void {
  const categories = actions.category.load(await get.categories());
  console.log("loaded categories", categories);
  return categories;
}

/** loads posts from server and returns as action */
export async function posts(): void {
  const action = actions.post.load(await get.posts());
  console.log("loaded posts", action);
  return action;
}

/** loads a specific post from server and returns as action */
export async function post(id: string): void {
  const action = actions.post.load([await get.post(id)]);
  console.log("loaded post", id, action);
  return action;
}

/** loads comments for a post from server and returns as action */
export async function comments(postId: string): void {
  const action = actions.comment.load(await get.comments(postId));
  console.log("loaded comments for post", postId, action);
  return action;
}
