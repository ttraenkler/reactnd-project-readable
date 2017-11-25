import fetch from "isomorphic-fetch";
import { categories, posts, post, comments } from "./get";

const test = {
  categories: [
    { name: "react", path: "react" },
    { name: "redux", path: "redux" },
    { name: "udacity", path: "udacity" }
  ],
  post: {
    id: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1467166872634,
    title: "Udacity is the best place to learn React",
    body: "Everyone says so after all.",
    author: "thingtwo",
    category: "react",
    voteScore: 6
  },
  comment: {
    author: "thingtwo",
    body: "Hi there! I am a COMMENT.",
    id: "894tuq4ut84ut8v4t8wun89g",
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    voteScore: 6
  }
};

describe("get request", () => {
  it("should get the google homepage", async () => {
    expect.assertions(1);
    await expect(fetch("http://www.google.com")).resolves.toBeDefined();
  });

  /*   it("should get categories from server", async () => {
    expect.assertions(1);
    await expect(categories()).resolves.toEqual(test.categories);
  });

  it("should get all posts from server", async () => {
    await expect(posts()).resolves.toContainEqual(test.post);
  });

  it("should get posts in a specific category from server", async () => {
    await expect(posts("react")).resolves.toContainEqual(test.post);
    await expect(posts("redux")).resolves.not.toContainEqual(test.post);
  });

  it("should get a specific post from server", async () => {
    await expect(post("8xf0y6ziyjabvozdd253nd")).resolves.toEqual(test.post);
  });

  it("should get comments for a specific post from server", async () => {
    await expect(comments("8xf0y6ziyjabvozdd253nd")).resolves.toContainEqual(
      test.comment
    );
  }); */
});
