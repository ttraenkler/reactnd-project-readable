import { post, type } from "./posts";

describe("post action creator", () => {
  const body = "body",
    author = "author",
    title = "title",
    category = "category",
    voteScore = 1;

  it('should create a "create post" action', () => {
    const action = post.create({
      body,
      author,
      title,
      category
    });
    expect(action).toEqual({
      type: type.post.create,
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
      type: type.post.edit,
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
      type: type.post.remove,
      payload: { id: 1 }
    });
  });
});
