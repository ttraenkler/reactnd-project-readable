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
  const result = action.create(await request.publish(post));
  console.log("published post", post, result);
  return result;
}

/** edit post on server and returns as action */
export async function edit(postId: ID, post): EditPostAction {
  await request.edit(postId, post);
  // TODO: check response and pass to action
  const result = action.edit(postId, post);
  console.log("edited post", postId, result);
  return result;
}

/** deletes post from server and returns as action */
export async function unpublish(postId: string): RemovePostAction {
  await request.unpublish(postId);
  const result = action.remove(postId);
  console.log("removed post", postId, result);
  return result;
}

/** vote on post on server and returns as action */
export async function vote(postId: string, like: boolean): VoteOnPostAction {
  await request.vote(postId, like); // TODO: check if successful missing
  return action.vote(postId, like);
}
