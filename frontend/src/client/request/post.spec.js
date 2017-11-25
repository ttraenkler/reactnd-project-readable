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
    voteScore: 1
  },
  comment: {
    author: "author",
    body: "body",
    id: uuid.v1(),
    parentId: "9xf0y6ziyjabvozdd253ne",
    timestamp: Date.now(),
    voteScore: 1
  }
};

describe("post request", () => {
  it("should post a new post to the server", async () => {
    expect.assertions(1);
    await expect(post(test.post)).resolves.toBeDefined();
  });
});
