import { get } from "./request";
import { actions } from "./state";
const { category, post, comment } = actions;

export async function categories(): void {
  category.load(await get.categories());
}

export async function posts(): void {
  post.load(await get.posts());
}

export async function comments(postId: string): void {
  comment.load(await get.comments(postId));
}
