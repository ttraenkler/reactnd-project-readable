import { post as postRequest } from "./request";
import { actions } from "./state";

/** upload vote on posts to server and returns as action to update redux state if succeeds */
export async function post(postId: string, like: boolean): void {
  await postRequest.postVote(postId, like); // TODO: check if successful missing
  return actions.post.vote(postId, like);
}

/** upload vote on comments to server and returns as action to update redux state if succeeds */
export async function comment(commentId: string, like: boolean): void {
  await postRequest.commentVote(commentId, like); // TODO: check if successful missing
  console.log("voted on comment");
  return actions.comment.vote(commentId, like);
}
