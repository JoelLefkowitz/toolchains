import { dropLast } from "ramda";
import path from "path";

export const head = (file: string): string =>
  dropLast(path.extname(file).length, path.basename(file));
