import { createStore } from "redux";
import { create } from "./actions";
import { reducer } from "./reducer";

const body = "body",
  author = "author",
  parentId = 1;

describe("create comment", () => {
  const store = createStore(reducer);
  it("updated the redux state as expected", () => {
    const testPost = create(parentId, {
      body,
      author
    });
    store.dispatch(testPost);
    const comments = store.getState();

    expect(Object.keys(comments).map(key => comments[key])).toContainEqual({
      body,
      author,
      deleted: false,
      timestamp: testPost.payload.timestamp,
      voteScore: 0,
      parentDeleted: false,
      parentId
    });
  });
});
