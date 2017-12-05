import fetch from "isomorphic-fetch";
import { token, url } from "./server";

export async function load(postId: number) {
  const response = await fetch(`${url}/posts/${postId}/comments`, {
    headers: { Authorization: token }
  });
  return await response.json();
}

export async function publish(comment) {
  return await fetch(`${url}/comments`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(comment)
  });
}

export async function edit(
  commentId: string,
  data: {
    body: string,
    timestamp: number
  }
) {
  return await fetch(`${url}/comments/${commentId}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export async function unpublish(commentId: string) {
  return await fetch(`${url}/comments/${commentId}`, {
    headers: {
      Authorization: token
    },
    method: "DELETE"
  });
}

export async function vote(commentId: string, like: boolean) {
  return await fetch(`${url}/comments/${commentId}`, {
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
