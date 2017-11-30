import { comment as request } from "./request";
import { comment as action } from "./state/actions";
import type CommentType from "./state/comment/types";

/** loads comments for a post from server and returns as action */
export async function load(postId: string): void {
  const response = await request.load(postId);
  const result = action.load(response);
  console.log("loaded comments for post", postId, result);
  return result;
}

export async function publish(comment: CommentType) {
  await request.publish(comment);
  console.log("published comment", comment);
  return action.create(comment);
}

/** loads comments for a post from server and returns as action */
export async function unpublish(commentId: string) {
  await request.remove(commentId);
  console.log("removed comment", commentId);
  return action.remove(commentId);
}

/** upload vote on comments to server and returns as action to update redux state if succeeds */
export async function vote(commentId: string, like: boolean) {
  await request.vote(commentId, like);
  console.log("voted on comment", commentId, true);
  return action.vote(commentId, like);
}
