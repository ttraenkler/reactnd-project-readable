import fetch from "isomorphic-fetch";
import { get } from "./index";

it("should find a result via fetch", async () => {
  expect.assertions(1);
  await expect(fetch("http://www.google.com")).resolves.toBeDefined();
});

it("gets data from server", async () => {
  expect.assertions(1);
  await expect(get.categories()).resolves.toBeDefined();
});
