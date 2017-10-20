import { post, type } from "./posts";

describe("post action creator", () => {
  it("should create a post action", () => {
    const { body, author, title, category } = {
      body: "body",
      author: "author",
      title: "title",
      category: "category"
    };

    const action = post.create({
      body,
      author,
      title,
      category
    });
    expect(action).toEqual({
      type: type.post.create,
      payload: {
        body,
        author,
        title,
        category,
        timestamp: action.payload.timestamp
      }
    });
  });
});
