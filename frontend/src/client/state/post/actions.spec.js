import { publish, edit, unpublish, vote, type } from "./actions";

const { PUBLISH_POST, EDIT_POST, UNPUBLISH_POST, VOTE_ON_POST } = type;

const id = "1",
  body = "body",
  author = "author",
  title = "title",
  category = "category",
  voteScore = 1;

describe("post action creators", () => {
  it('should create a "create post" action', () => {
    const action = publish({
      body,
      author,
      title,
      category
    });
    expect(action).toEqual({
      type: PUBLISH_POST,
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
    const action = unpublish(id);
    expect(action).toEqual({
      type: UNPUBLISH_POST,
      payload: { id }
    });
  });

  it('should create a "vote on post" action', () => {
    const action = vote(id, true);
    expect(action).toEqual({
      type: VOTE_ON_POST,
      payload: { id, like: true }
    });
  });
});
