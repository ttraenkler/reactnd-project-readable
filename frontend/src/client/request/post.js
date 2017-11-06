import fetch from "isomorphic-fetch";
import server from "./server";

const token = "whatever-you-want";

export async function post(post) {
  return await fetch(`${server}/posts`, {
    headers: { Authorization: token },
    method: "POST",
    body: post
  });
}
