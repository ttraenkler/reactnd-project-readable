import { get } from "./request";
import { actions } from "./state";
const { category, post, comment } = actions;

export async function categories(): void {
  return category.load(await get.categories());
}

export async function posts(): void {
  return post.load(await get.posts());
}

export async function comments(postId: string): void {
  return comment.load(await get.comments(postId));
}
