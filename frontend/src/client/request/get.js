// used for initial loading of all data
export default {
  categories: async () => {
    const url = "http://localhost:3001/categories";
    const response = await fetch(url, {
      headers: { Authorization: "whatever-you-want" }
    });
    return await response.json();
  },

  posts: async () => {
    const url = "http://localhost:3001/posts";
    const response = await fetch(url, {
      headers: { Authorization: "whatever-you-want" }
    });
    return await response.json();
  }
};
