import { collect } from "./collectors";
import path from "path";

const fixtures = path.resolve(__dirname, "../../tests/fixtures");

describe("collect", () => {
  it("parses a default exported task", async () => {
    const [{ name, description, action }] = await collect([
      path.join(fixtures, "objects.ts"),
    ]);

    expect(name).toBe("example");
    expect(description).toBe("Does nothing");
    expect(action).toBeTruthy();
  });

  it("parses a named exported task", async () => {
    const [{ name, description, action }] = await collect([
      path.join(fixtures, "named.ts"),
    ]);

    expect(name).toBe("example");
    expect(description).toBe("Does nothing");
    expect(action).toBeTruthy();
  });

  it("parses a default exported function", async () => {
    const [{ name, description, action }] = await collect([
      path.join(fixtures, "functions.ts"),
    ]);

    expect(name).toBe("functions");
    expect(description).toBe("");
    expect(action).toBeTruthy();
  });
});
