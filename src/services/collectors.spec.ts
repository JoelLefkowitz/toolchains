import { collect } from "./collectors";

describe("collect", () => {
  it("parses a default exported script", () => {
    const { name, description, action } = collect({
      file: "",
      imported: {
        name: "example",
        description: "Does nothing",
        action: () => {},
      },
    });

    expect(name).toBe("example");
    expect(description).toBe("Does nothing");
    expect(action).toBeTruthy();
  });

  it("parses a named exported script", () => {
    const { name, description, action } = collect({
      file: "",
      imported: {
        default: {
          name: "example",
          description: "Does nothing",
          action: () => {},
        },
      },
    });

    expect(name).toBe("example");
    expect(description).toBe("Does nothing");
    expect(action).toBeTruthy();
  });

  it("parses a default exported function", () => {
    const { name, description, action } = collect({
      file: "example",
      imported: { default: () => {} },
    });

    expect(name).toBe("example");
    expect(description).toBe("");
    expect(action).toBeTruthy();
  });
});
