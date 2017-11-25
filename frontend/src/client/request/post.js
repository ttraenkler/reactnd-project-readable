import fetch from "isomorphic-fetch";
import server from "./server";

const token = "whatever-you-want";

export async function post(post) {
  return await fetch(`${server}/posts`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(post)
  });
}

// TODO: use this
export async function postVote(postId: string, like: boolean) {
  return await fetch(`${server}/posts/${postId}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      option: like ? "upVote" : "downVote"
    })
  });
}

// TODO: use this
export async function commentVote(commentId: string, like: boolean) {
  console.log("comment vote post request", commentId, like);
  return await fetch(`${server}/comments/${commentId}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      option: like ? "upVote" : "downVote"
    })
  });
}
