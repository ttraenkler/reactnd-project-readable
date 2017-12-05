import { publish, edit, unpublish, type } from "./actions";

const id = "1",
  parentId = "1",
  author = "author",
  body = "body";

describe("comment action creators", () => {
  it('should create a "create comment" action', () => {
    const action = publish({
      parentId,
      body,
      author
    });
    expect(action).toEqual({
      type: type.PUBLISH_COMMENT,
      payload: {
        parentId,
        body,
        author,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('should create an "edit comment" action', () => {
    const action = edit(id, {
      body
    });
    expect(action).toEqual({
      type: type.EDIT_COMMENT,
      payload: {
        id: "1",
        body,
        timestamp: action.payload.timestamp
      }
    });
  });

  it('should create a "remove comment" action', () => {
    const action = unpublish("1", "1");
    expect(action).toEqual({
      type: type.UNPUBLISH_COMMENT,
      payload: { id: "1", parentId: "1" }
    });
  });
});
