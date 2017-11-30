import fetch from "isomorphic-fetch";
import { load } from "./category";

const test = {
  categories: [
    { name: "react", path: "react" },
    { name: "redux", path: "redux" },
    { name: "udacity", path: "udacity" }
  ]
};

describe("get request", () => {
  /* it("should get the google homepage", async () => {
    expect.assertions(1);
    await expect(fetch("http://www.google.com")).resolves.toBeDefined();
  }); */

  it("should get categories from server", async () => {
    expect.assertions(1);
    await expect(load()).resolves.toEqual(test.categories);
  });
});
