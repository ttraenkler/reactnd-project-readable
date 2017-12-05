import { load, loadAll, publish, unpublish, vote, edit } from "./post";

const test = {
  post: {
    author: "thingtwo",
    body: "Everyone says so after all.",
    category: "react",
    commentCount: 2,
    deleted: false,
    id: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1467166872634,
    title: "Udacity is the best place to learn React",
    voteScore: 6
  },
  newPost: {
    id: "1",
    author: "thingthree",
    body: "Whatever.",
    category: "react",
    timestamp: 1467166872634,
    title: "New post",
    voteScore: 1
  }
};

describe("post requests", () => {
  it("should get all posts from server", async () => {
    await expect(loadAll()).resolves.toContainEqual(test.post);
  });

  it("should get posts in a specific category from server", async () => {
    await expect(loadAll("react")).resolves.toContainEqual(test.post);
    await expect(loadAll("redux")).resolves.not.toContainEqual(test.post);
  });

  it("should get a specific post from server", async () => {
    await expect(load("8xf0y6ziyjabvozdd253nd")).resolves.toEqual(test.post);
  });

  it("should post a new post to the server", async () => {
    expect(publish(test.newPost)).resolves.toBeDefined();
  });

  it("should edit the post on the server", async () => {
    const timestamp = Date.now();
    await edit("1", { title: "new title", body: "new body", timestamp });
    await expect(load("1")).resolves.toEqual({
      ...test.newPost,
      title: "new title",
      body: "new body",
      commentCount: 0,
      deleted: false,
      timestamp
    });
  });

  it("should vote on a post on the server", async () => {
    expect.assertions(2);
    await expect(vote("1", true)).resolves.toBeDefined();
    await expect(vote("1", false)).resolves.toBeDefined();
  });

  it("should delete a post from the server", async () => {
    expect.assertions(1);
    await expect(unpublish("1")).resolves.toBeDefined();
  });
});
