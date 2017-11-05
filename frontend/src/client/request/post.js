import fetch from "isomorphic-fetch";
import server from "./server";

type PostType = {};

export async function post(post: PostType) {
  const url = server + "/posts";
  fetch(url, {
    method: "POST",
    body: {
      test: "test"
    }
  });
}
