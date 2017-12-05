import uuid from "uuid";
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
  const newComment = {
    ...comment,
    id: uuid.v1(),
    timestamp: Date.now()
  };
  await request.publish(newComment);
  console.log("published comment", newComment);
  return action.publish(newComment);
}

export async function edit(commentId: string, comment: CommentType) {
  const editedComment = { ...comment, timestamp: Date.now() };
  await request.edit(commentId, editedComment);
  console.log("edited comment", editedComment);
  return action.edit(commentId, editedComment);
}

export async function unpublish(postId: string, commentId: string) {
  await request.unpublish(commentId);
  console.log("removed comment", commentId);
  return action.unpublish(postId, commentId);
}

/** upload vote on comments to server and returns as action to update redux state if succeeds */
export async function vote(commentId: string, like: boolean) {
  await request.vote(commentId, like);
  console.log("voted on comment", commentId, true);
  return action.vote(commentId, like);
}
