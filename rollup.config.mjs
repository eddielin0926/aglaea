import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import stylexPlugin from "@stylexjs/rollup-plugin";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// This is required to read package.json file when
// using Native ES modules in Node.js
// https://rollupjs.org/command-line-interface/#importing-package-json
import { createRequire } from "node:module";
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".js", ".ts", ".jsx", ".tsx"],
      }),
      commonjs(),
      terser(),
      stylexPlugin.default(),
      babel({
        extensions: [".js", ".ts", ".jsx", "tsx"],
        exclude: "node_modules/**",
      }),
    ],
    external: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
  },
];
