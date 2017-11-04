import { createStore } from "redux";
import { actions, type, reducer } from "./posts";

const body = "body",
  author = "author",
  title = "title",
  category = "category",
  voteScore = 1;

describe("create post actions", () => {
  it('created a "create post" action', () => {
    const action = actions.create({
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

  it('created an "edit post" action', () => {
    const action = actions.edit(1, {
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

  it('created a "remove post" action', () => {
    const action = actions.remove(1);
    expect(action).toEqual({
      type: type.REMOVE_POST,
      payload: { id: 1 }
    });
  });
});

describe("create post", () => {
  const store = createStore(reducer);
  it("updated the redux state as expected", () => {
    const testPost = actions.create({
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
