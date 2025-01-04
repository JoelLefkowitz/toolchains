import { Module } from "../models/Module.model";
import { spawnSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

export const transpile = async (files: string[]): Promise<Module[]> => {
  const dist = fs.mkdtempSync(path.join(os.tmpdir(), "transpilation-"));
  const paths = files.map((file) => path.relative(".", file));

  if (files.length > 0) {
    spawnSync(
      "npx",
      ["tsc", ...paths, "--rootDir", ".", "--allowJs", "--outDir", dist],
      { stdio: "inherit" },
    );
  }

  return Promise.all(
    paths.map(async (file) => {
      const transpiled = path.resolve(dist, file.replace(".ts", ".js"));
      const imported = (await import(transpiled)) as Record<string, unknown>;
      return { file, imported };
    }),
  );
};
