jest.mock("uuid", () => ({
  v1: jest.fn(() => 1)
}));

/* eslint-disable */
import { createStore } from "redux";
import { create, edit, remove, load } from "./actions";
import { reducer } from "./reducer";
/* eslint-enable */

const body = "body",
  author = "author",
  parentId = "1";

describe("comment reducer", () => {
  const store = createStore(reducer);

  it("should update the redux state as expected when creating a new comment", () => {
    const testPost = create(parentId, {
      body,
      author
    });
    store.dispatch(testPost);
    const comments = store.getState();

    expect(comments).toEqual({
      "1": {
        "1": {
          body,
          author,
          deleted: false,
          timestamp: testPost.payload.timestamp,
          voteScore: 0,
          parentDeleted: false,
          parentId
        }
      }
    });
  });

  it("should update the redux state as expected when editing a comment", () => {
    const testPost = edit("1", "1", {
      body: "new body"
    });
    store.dispatch(testPost);
    const comments = store.getState();

    expect(comments).toEqual({
      "1": {
        "1": {
          id: "1",
          body: "new body",
          author,
          deleted: false,
          timestamp: testPost.payload.timestamp,
          voteScore: 0,
          parentDeleted: false,
          parentId
        }
      }
    });
  });

  it("should update the redux state as expected when removing a comment", () => {
    const testPost = remove("1", "1");
    store.dispatch(testPost);
    const comments = store.getState();

    expect(comments).not.toEqual({
      "1": {
        "1": expect.any(Object)
      }
    });
  });
});
