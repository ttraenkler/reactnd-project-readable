export default {
  post: async () => {
    const url = "http://localhost:3001/posts";
    fetch(url, {
      method: "POST",
      body: {
        test: "test"
      }
    });
  }
};
