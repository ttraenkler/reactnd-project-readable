import { createStore } from "redux";
import { reducer } from "./reducer";
import { publish, edit, unpublish, vote } from "./actions";

const body = "body",
  author = "author",
  title = "title",
  category = "category";

describe("post reducer", () => {
  const store = createStore(reducer);
  let postId;
  const testPost = publish({
    body,
    author,
    title,
    category
  });

  it("should process a create post action", () => {
    store.dispatch(testPost);
    const posts = store.getState();
    postId = Object.keys(posts).map(key => key)[0];

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

  it("should process a vote post action", () => {
    const action = vote(postId, true);
    store.dispatch(action);
    const posts = store.getState();

    expect(Object.keys(posts).map(key => posts[key])).toContainEqual({
      body,
      author,
      title,
      category,
      comments: [],
      timestamp: testPost.payload.timestamp,
      voteScore: 2
    });
  });

  it("should process an edit post action", () => {
    const body = "new body",
      title = "new title";
    const testPost = edit(postId, {
      body,
      title
    });
    store.dispatch(testPost);
    const posts = store.getState();

    expect(Object.keys(posts).map(key => posts[key])).toContainEqual({
      body,
      author,
      title,
      category,
      comments: [],
      timestamp: posts[postId].timestamp,
      voteScore: 2
    });
  });

  it("should process a remove post action", () => {
    store.dispatch(unpublish(postId));
    const posts = store.getState();

    expect(Object.keys(posts).map(key => posts[key])).not.toContainEqual({
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
