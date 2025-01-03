import { head } from "./strings";

describe("head", () => {
  it("extracts a path's head", () => {
    expect(head("a/b/c.ts")).toBe("c");
  });
});
