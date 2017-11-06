import { create, edit, remove, type } from "./actions";

const body = "body",
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
    const action = edit(1, {
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

  it('should create a "remove post" action', () => {
    const action = remove(1);
    expect(action).toEqual({
      type: type.REMOVE_POST,
      payload: { id: 1 }
    });
  });
});
