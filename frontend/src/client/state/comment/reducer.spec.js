/* eslint-disable import/first */
jest.mock("uuid", () => ({
  v1: jest.fn(() => 1)
}));

import { createStore } from "redux";
import { create, edit, remove, load } from "./actions";
import { reducer } from "./reducer";

const body = "body",
  author = "author",
  parentId = "1";

describe("comment reducer", () => {
  const store = createStore(reducer);

  it("should process a create comment action", () => {
    const testPost = create(parentId, {
      body,
      author
    });
    store.dispatch(testPost);
    const comments = store.getState();

    expect(comments).toEqual({
      "1": {
        body,
        author,
        timestamp: testPost.payload.timestamp,
        voteScore: 1,
        parentId
      }
    });
  });

  it("should process an edit comment action", () => {
    const testPost = edit("1", {
      body: "new body"
    });
    store.dispatch(testPost);
    const comments = store.getState();

    expect(comments).toEqual({
      "1": {
        id: "1",
        body: "new body",
        author,
        timestamp: testPost.payload.timestamp,
        voteScore: 1,
        parentId
      }
    });
  });

  it("should process a remove comment action", () => {
    const testPost = remove("1");
    store.dispatch(testPost);
    const comments = store.getState();

    expect(comments).not.toEqual({
      "1": expect.any(Object)
    });
  });
});
