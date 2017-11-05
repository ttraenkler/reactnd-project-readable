// @flow
// used for initial loading of all data
import fetch from "isomorphic-fetch";
import server from "./server";

export async function categories() {
  const url = server + "/categories";
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" }
  });
  return await response.json();
}

export async function posts() {
  const url = server + "/posts";
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" }
  });
  return await response.json();
}
