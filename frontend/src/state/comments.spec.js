import { createStore } from "redux";
import { comment, type, reducer } from "./comments";

const body = "body",
  author = "author",
  title = "title",
  category = "redux",
  voteScore = 1,
  parentId = 1;

describe("comment action creator", () => {
  it('should create a "create comment" action', () => {
    const action = comment.create(parentId, {
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

  it('should create an "edit comment" action', () => {
    const action = comment.edit(parentId, {
      body,
      author,
      title,
      voteScore
    });
    expect(action).toEqual({
      type: type.EDIT_COMMENT,
      payload: {
        id: 1,
        body,
        author,
        title,
        voteScore,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('should create an "remove comment" action', () => {
    const action = comment.remove(1);
    expect(action).toEqual({
      type: type.REMOVE_COMMENT,
      payload: { id: 1 }
    });
  });
});

describe("process comment actions", () => {
  const store = createStore(reducer);
  it("should update the posts state correctly", () => {
    const testPost = comment.create(parentId, {
      body,
      author
    });
    store.dispatch(testPost);
    expect(store.getState().comments).toEqual({
      0: {
        body,
        author,
        deleted: false,
        id: 0,
        timestamp: testPost.payload.timestamp,
        voteScore: 0,
        parentDeleted: false,
        parentId
      }
    });
  });
});
