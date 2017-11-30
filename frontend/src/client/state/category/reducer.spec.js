import { createStore } from "redux";
import { load } from "./actions";
import { reducer } from "./reducer";

describe("category reducer", () => {
  const store = createStore(reducer);
  const categories = [{ name: "react", path: "react" }];
  it("should process a load categories action", () => {
    const action = load(categories);
    store.dispatch(action);
    const state = store.getState();

    expect(state).toEqual(categories);
  });
});
