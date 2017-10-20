import { comment, type } from "./comments";

describe("comment action creator", () => {
  const body = "body",
    author = "author",
    title = "title",
    voteScore = 1;

  it('should create a "create comment" action', () => {
    const action = comment.create(1, {
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

  it('should create an "edit comment" action', () => {
    const action = comment.edit(1, {
      parentId: 1,
      body,
      author,
      title,
      voteScore
    });
    expect(action).toEqual({
      type: type.comment.edit,
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
      type: type.comment.remove,
      payload: { id: 1 }
    });
  });
});
