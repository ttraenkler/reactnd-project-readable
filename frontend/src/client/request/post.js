import server from "./server";

type PostType = {};

export default {
  post: async (post: PostType) => {
    const url = server + "/posts";
    fetch(url, {
      method: "POST",
      body: {
        test: "test"
      }
    });
  }
};
