const { nodeResolve } = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const commonjs = require("@rollup/plugin-commonjs");
const { spawnSync } = require("child_process");
const { globSync } = require("glob");
const fs = require("fs");
const { unary } = require("ramda");

module.exports = {
  input: "dist/main.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  treeshake: "smallest",
  plugins: [
    { buildStart: () => fs.rmdirSync("dist", { recursive: true }) },
    { buildStart: () => spawnSync("npx", ["tsc"], { stdio: "inherit" }) },
    nodeResolve({ preferBuiltins: true }),
    commonjs({ ignoreDynamicRequires: true }),
    terser(),
    { buildEnd: () => globSync("dist/main.*").map(unary(fs.rmSync)) },
  ],
};
