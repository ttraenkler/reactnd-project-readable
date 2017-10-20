import { createStore } from "redux";
import { post, type, reducer } from "./posts";

const body = "body",
  author = "author",
  title = "title",
  category = "category",
  voteScore = 1;

describe("post action creator", () => {
  it('should create a "create post" action', () => {
    const action = post.create({
      body,
      author,
      title,
      category
    });
    expect(action).toEqual({
      type: type.CREATE_POST,
      payload: {
        body,
        author,
        title,
        category,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('should create an "edit post" action', () => {
    const action = post.edit(1, {
      body,
      author,
      title,
      category,
      voteScore
    });
    expect(action).toEqual({
      type: type.EDIT_POST,
      payload: {
        id: 1,
        body,
        author,
        title,
        category,
        voteScore,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('should create an "remove post" action', () => {
    const action = post.remove(1);
    expect(action).toEqual({
      type: type.REMOVE_POST,
      payload: { id: 1 }
    });
  });
});

describe("process post actions", () => {
  const store = createStore(reducer);
  it("should update the posts state correctly", () => {
    const testPost = post.create({
      body,
      author,
      title,
      category
    });
    store.dispatch(testPost);
    expect(store.getState().posts).toEqual({
      0: {
        body,
        author,
        title,
        category,
        deleted: false,
        id: 0,
        timestamp: testPost.payload.timestamp,
        voteScore: 0
      }
    });
  });
});
