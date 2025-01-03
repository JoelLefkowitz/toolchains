const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const clear = require("rollup-plugin-delete");

module.exports = {
  input: "dist/main.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
  },
  treeshake: "smallest",
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs({ ignoreDynamicRequires: true }),
    clear({
      hook: "buildEnd",
      targets: ["dist"],
      verbose: true,
    }),
  ],
};
