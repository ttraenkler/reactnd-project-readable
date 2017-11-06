import uuid from "uuid";
import { post } from "./post";

const test = {
  post: {
    id: "9xf0y6ziyjabvozdd253ne",
    timestamp: Date.now(),
    title: "Test Post",
    body: "body",
    author: "author",
    category: "react",
    voteScore: 0,
    deleted: false
  },
  comment: {
    author: "author",
    body: "body",
    deleted: false,
    id: uuid.v1(),
    parentDeleted: false,
    parentId: "9xf0y6ziyjabvozdd253ne",
    timestamp: Date.now(),
    voteScore: 0
  }
};

describe("post request", () => {
  it("should post a new post to the server", async () => {
    expect.assertions(1);
    await expect(post(test.post)).resolves.toBeDefined();
  });
});
