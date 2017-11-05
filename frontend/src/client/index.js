import { get } from "./request";
import { store, actions } from "./state";

const { category, post, comment } = actions;

export async function categories(): void {
  const { categories } = await get.categories();
  store.dispatch(category.load(categories));
}

export async function posts(): void {
  store.dispatch(post.load(await get.posts()));
}

export async function comments(): void {
  store.dispatch(comment.load(await get.comments()));
}
