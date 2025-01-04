import { transpile } from "./transpilers";
import path from "path";

describe("transpile", () => {
  it("transpiles", async () => {
    const [functions, named, objects] = await transpile(
      ["functions.ts", "named.ts", "objects.ts"].map((file) =>
        path.resolve(__dirname, "../../tests/fixtures", file),
      ),
    );

    expect(functions.file).toEqual("tests/fixtures/functions.ts");
    expect(functions.imported).toBeTruthy();

    expect(named.file).toEqual("tests/fixtures/named.ts");
    expect(named.imported).toBeTruthy();

    expect(objects.file).toEqual("tests/fixtures/objects.ts");
    expect(objects.imported).toBeTruthy();
  });
});
