import { isAction } from "./guards";

describe("isAction", () => {
  it("checks if an object is a function with no parameters", () => {
    expect(isAction(() => {})).toBe(true);
    expect(isAction((_: unknown) => {})).toBe(false);
  });
});
