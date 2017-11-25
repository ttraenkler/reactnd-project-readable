import { createStore } from "redux";
import { reducer } from "./reducer";
import { create, remove } from "./actions";

const body = "body",
  author = "author",
  title = "title",
  category = "category";

describe("post reducer", () => {
  const store = createStore(reducer);
  it("should update store as expected when creating a post", () => {
    const testPost = create({
      body,
      author,
      title,
      category
    });
    store.dispatch(testPost);
    const posts = store.getState();

    expect(Object.keys(posts).map(key => posts[key])).toContainEqual({
      body,
      author,
      title,
      category,
      comments: [],
      timestamp: testPost.payload.timestamp,
      voteScore: 1
    });
  });
});
