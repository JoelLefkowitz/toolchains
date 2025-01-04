import { collect } from "./services/collectors";
import { glob } from "glob";
import { hideBin } from "yargs/helpers";
import path from "path";
import yargs from "yargs";

const version = "0.3.0";

const cli = yargs(hideBin(process.argv))
  .scriptName("toolchain")
  .version(version)
  .option("path", {
    alias: "p",
    description: "Set the search path",
    default: "scripts",
  })
  .option("include", {
    alias: "i",
    description: "Set the include pattern",
    default: "*.ts",
  })
  .option("debug", {
    alias: "d",
    description: "Enable debug logging",
    type: "boolean",
  })
  .alias("h", "help")
  .alias("v", "version");

(async () => {
  const { path: root, include, debug } = cli.parseSync();

  const pattern = path.join(process.cwd(), root, include);

  if (debug) {
    console.log("Search pattern:", pattern);
  }

  const files = await glob(pattern);

  if (debug) {
    console.log("Found files:", files);
  }

  const tasks = await collect(files);

  if (debug) {
    console.log("Found tasks:", tasks);
  }

  tasks
    .reduce(
      (acc, { name, description, action }) =>
        action ? acc.command(name, description, action) : acc,
      cli,
    )
    .strict()
    .demandCommand()
    .parse();
})();
