// @flow
// used for initial loading of all data
import fetch from "isomorphic-fetch";
import { token, url } from "./server";

export async function load() {
  const response = await fetch(`${url}/categories`, {
    headers: { Authorization: token }
  });
  const json = await response.json();
  return json.categories;
}
