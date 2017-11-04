// used for initial loading of all data
import server from "./server";
import type { Category } from "../types";

export default {
  categories: async (): CategoryType[] => {
    const url = server + "/categories";
    const response = await fetch(url, {
      headers: { Authorization: "whatever-you-want" }
    });
    return await response.json();
  },

  posts: async () => {
    const url = server + "/posts";
    const response = await fetch(url, {
      headers: { Authorization: "whatever-you-want" }
    });
    return await response.json();
  }
};
