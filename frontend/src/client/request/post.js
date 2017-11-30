import fetch from "isomorphic-fetch";
import { token, url } from "./server";
import type Post from "../state/post/types";

type ID = string;

// load a specific post from the server
export async function load(postId: ID) {
  const response = await fetch(`${url}/posts/${postId}`, {
    headers: { Authorization: token }
  });
  return await response.json();
}

// load all posts from the server - optionally filtered by category
export async function loadAll(category: string = "") {
  const response = await fetch(
    category ? `${url}/${category}/posts` : `${url}/posts`,
    {
      headers: { Authorization: token }
    }
  );
  return await response.json();
}

// publish a new post on the server
export async function publish(post: Post) {
  return await fetch(`${url}/posts`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(post)
  });
}

// edit an existing post on the server
export async function edit(postId: ID, data: { title: string, body: string }) {
  return await fetch(`${url}/posts/${postId}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify({
      title: data.title || null,
      body: data.body || null
    })
  });
}

// delete a post on the server
export async function unpublish(postId: ID) {
  return await fetch(`${url}/posts/${postId}`, {
    headers: {
      Authorization: token
    },
    method: "DELETE"
  });
}

// TODO: use this
// vote on a post on the server
export async function vote(postId: ID, like: boolean) {
  return await fetch(`${url}/posts/${postId}`, {
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
