import { create, edit, remove, type } from "./actions";

const body = "body",
  author = "author",
  parentId = "1",
  id = "1";

describe("comment action creators", () => {
  it('should create a "create comment" action', () => {
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

  it('should create an "edit comment" action', () => {
    const action = edit(parentId, id, {
      body
    });
    expect(action).toEqual({
      type: type.EDIT_COMMENT,
      payload: {
        id: "1",
        parentId: "1",
        body,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('should create a "remove comment" action', () => {
    const action = remove("1", "1");
    expect(action).toEqual({
      type: type.REMOVE_COMMENT,
      payload: { id: "1", parentId: "1" }
    });
  });
});
