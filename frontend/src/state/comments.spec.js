import { comment, type } from "./comments";

describe("comment action creator", () => {
  it("should create a comment action", () => {
    const { body, author } = {
      body: "body",
      author: "author"
    };
    const action = comment.create({
      parentId: 1,
      body,
      author
    });
    expect(action).toEqual({
      type: type.comment.create,
      payload: {
        parentId: 1,
        body,
        author,
        timestamp: action.payload.timestamp
      }
    });
  });
});
