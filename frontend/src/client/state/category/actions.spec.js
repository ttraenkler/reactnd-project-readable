import { load, type } from "./actions";

const { LOAD_CATEGORIES } = type;

describe("category action creators", () => {
  const categories = [{ name: "react", path: "react" }];
  it('should create a "load categories" action', () => {
    const action = load(categories);
    expect(action).toEqual({
      type: LOAD_CATEGORIES,
      payload: {
        categories
      }
    });
  });
});
