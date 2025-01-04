import { Module } from "../models/Module.model";
import fs from "fs";
import os from "os";
import path from "path";
import tscw from "tscw-config";

export const transpile = async (files: string[]): Promise<Module[]> => {
  const dist = fs.mkdtempSync(path.join(os.tmpdir(), "transpilation-"));
  const paths = files.map((file) => path.relative(".", file));

  if (files.length > 0) {
    await tscw(files.concat(["--outDir", dist, "--rootDir", "."]));
  }

  return Promise.all(
    paths.map(async (file) => {
      const transpiled = path.resolve(dist, file.replace(".ts", ".js"));
      const imported = (await import(transpiled)) as Record<string, unknown>;
      return { file, imported };
    }),
  );
};
