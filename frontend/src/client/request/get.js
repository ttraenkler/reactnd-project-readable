// @flow
// used for initial loading of all data
import fetch from "isomorphic-fetch";
import server from "./server";

const token = "whatever-you-want";

export async function categories() {
  const response = await fetch(`${server}/categories`, {
    headers: { Authorization: token }
  });
  return await response.json();
}

export async function posts(category: string = "") {
  const url = category ? `${server}/${category}/posts` : `${server}/posts`;
  const response = await fetch(url, {
    headers: { Authorization: token }
  });
  return await response.json();
}

export async function post(id: string) {
  const response = await fetch(`${server}/posts/${id}`, {
    headers: { Authorization: token }
  });
  return await response.json();
}

export async function comments(postId: number) {
  const response = await fetch(`${server}/posts/${postId}/comments`, {
    headers: { Authorization: token }
  });
  return await response.json();
}
