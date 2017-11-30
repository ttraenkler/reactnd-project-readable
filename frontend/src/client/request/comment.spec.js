import fetch from "isomorphic-fetch";
import { load, publish, unpublish, vote, edit } from "./comment";

const test = {
  comment: {
    author: "thingtwo",
    body: "Hi there! I am a COMMENT.",
    id: "894tuq4ut84ut8v4t8wun89g",
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },

  newComment: {
    author: "thingthree",
    body: "Hi there! I am a another COMMENT.",
    id: "1",
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  }
};

describe("comment requests", () => {
  it("should get comments for a specific post from server", async () => {
    await expect(load("8xf0y6ziyjabvozdd253nd")).resolves.toContainEqual(
      test.comment
    );
  });

  it("should publish a new comment for a specific post on the server", async () => {
    await expect(publish(test.newComment)).resolves.toBeDefined();
    await expect(load("8xf0y6ziyjabvozdd253nd")).resolves.toContainEqual(
      test.newComment
    );
  });

  it("should vote on a specific comment on the server", async () => {
    await expect(vote("1", true)).resolves.toBeDefined();
    await expect(load("8xf0y6ziyjabvozdd253nd")).resolves.toContainEqual({
      ...test.newComment,
      voteScore: 2
    });
  });

  const timestamp = Date.now();
  const body = "edited comment";
  const voteScore = 2;

  it("should edit a specific comment on the server", async () => {
    await expect(edit("1", { timestamp, body })).resolves.toBeDefined();
    await expect(load("8xf0y6ziyjabvozdd253nd")).resolves.toContainEqual({
      ...test.newComment,
      timestamp,
      body,
      voteScore
    });
  });

  it("should unpublish a specific comment on the server", async () => {
    await unpublish("1");
    await expect(load("8xf0y6ziyjabvozdd253nd")).resolves.not.toContainEqual({
      ...test.newComment,
      timestamp,
      body,
      voteScore
    });
  });
});
