import uuid from "uuid";
import { post as request } from "./request";
import { post as action } from "./state/actions";
import type PostType from "./state/post/types";
import type {
  LoadPostsAction,
  CreatePostAction,
  EditPostAction,
  RemovePostAction,
  VoteOnPostAction
} from "./state/post/actions";

/** loads all posts or a specific post from server and returns as action */
export async function load(postId: string = ""): LoadPostsAction {
  if (postId) {
    const response = await request.load(postId);
    const result = action.load([response]);
    return result;
  } else {
    const response = await request.loadAll();
    const result = action.load(response);
    return result;
  }
}

/** creates post on server and returns as action */
export async function publish(post: PostType): CreatePostAction {
  const newPost = { ...post, id: uuid.v1(), timestamp: Date.now() };
  const result = action.publish(await request.publish(newPost));
  console.log("published post", newPost, result);
  return result;
}

/** edit post on server and returns as action */
export async function edit(postId: ID, post): EditPostAction {
  const editedPost = { ...post, timestamp: Date.now() };
  await request.edit(postId, editedPost);
  const result = action.edit(postId, editedPost);
  console.log("edited post", postId, result);
  return result;
}

/** deletes post from server and returns as action */
export async function unpublish(postId: string): RemovePostAction {
  await request.unpublish(postId);
  const result = action.unpublish(postId);
  console.log("unpublish post", postId, result);
  return result;
}

/** vote on post on server and returns as action */
export async function vote(postId: string, like: boolean): VoteOnPostAction {
  console.log("vote on post");
  await request.vote(postId, like);
  return action.vote(postId, like);
}
