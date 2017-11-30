import { create, edit, remove, vote, type } from "./actions";

const { CREATE_POST, EDIT_POST, REMOVE_POST, VOTE_POST } = type;

const id = "1",
  body = "body",
  author = "author",
  title = "title",
  category = "category",
  voteScore = 1;

describe("post action creators", () => {
  it('should create a "create post" action', () => {
    const action = create({
      body,
      author,
      title,
      category
    });
    expect(action).toEqual({
      type: CREATE_POST,
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
    const action = edit(id, {
      body,
      author,
      title,
      category,
      voteScore
    });
    expect(action).toEqual({
      type: EDIT_POST,
      payload: {
        id,
        body,
        title
      }
    });
  });

  it('should create a "remove post" action', () => {
    const action = remove(id);
    expect(action).toEqual({
      type: REMOVE_POST,
      payload: { id }
    });
  });

  it('should create a "vote on post" action', () => {
    const action = vote(id, true);
    expect(action).toEqual({
      type: VOTE_POST,
      payload: { id, like: true }
    });
  });
});
