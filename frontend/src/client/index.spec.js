import { load, store } from "./index";

it("loads all data", async () => {
  await load.categories();
  await load.posts();
  console.log(JSON.stringify(store.getState(), null, 2));
});
