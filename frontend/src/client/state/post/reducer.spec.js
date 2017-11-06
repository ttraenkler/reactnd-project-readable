import { createStore } from "redux";
import { reducer } from "./reducer";
import { create } from "./actions";

const body = "body",
  author = "author",
  title = "title",
  category = "category";

describe("create post", () => {
  const store = createStore(reducer);
  it("updated the redux state as expected", () => {
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
      deleted: false,
      comments: [],
      timestamp: testPost.payload.timestamp,
      voteScore: 0
    });
  });
});
