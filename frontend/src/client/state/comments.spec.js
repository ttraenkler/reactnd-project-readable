import { createStore } from "redux";
import { actions, type, reducer } from "./comments";

const body = "body",
  author = "author",
  voteScore = 1,
  parentId = 1;

describe("create comment actions", () => {
  it('created a "create comment" action', () => {
    const action = actions.create(parentId, {
      body,
      author
    });
    expect(action).toEqual({
      type: type.CREATE_COMMENT,
      payload: {
        parentId,
        body,
        author,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('created an "edit comment" action', () => {
    const action = actions.edit(parentId, {
      body,
      author,
      voteScore
    });
    expect(action).toEqual({
      type: type.EDIT_COMMENT,
      payload: {
        id: 1,
        body,
        author,
        voteScore,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('created a "remove comment" action', () => {
    const action = actions.remove(1);
    expect(action).toEqual({
      type: type.REMOVE_COMMENT,
      payload: { id: 1 }
    });
  });
});

describe("create comment", () => {
  const store = createStore(reducer);
  it("updated the redux state as expected", () => {
    const testPost = actions.create(parentId, {
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
