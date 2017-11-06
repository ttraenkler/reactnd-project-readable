import { create, edit, remove, type } from "./actions";

const body = "body",
  author = "author",
  voteScore = 1,
  parentId = 1;

describe("create comment actions", () => {
  it('created a "create comment" action', () => {
    const action = create(parentId, {
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
    const action = edit(parentId, {
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
    const action = remove(1);
    expect(action).toEqual({
      type: type.REMOVE_COMMENT,
      payload: { id: 1 }
    });
  });
});
