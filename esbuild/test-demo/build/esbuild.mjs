import * as esbuild from "esbuild";

import path from "node:path";
let n = 0;
const cwd = process.cwd();
let exampleOnResolvePlugin = {
  name: "example",
  setup(build) {
    // 重定向所有以"images/"开头的路径到"./public/images/"
    build.onResolve({ filter: /^react$/ }, (args) => {
      return {
        warnings: [{ text: `The path '${args.path}' is deprecated.` }],
      };
    });
  },
};

await esbuild.build({
  entryPoints: ["./src/app.jsx"],
  outdir: "web/js",
  bundle: true,
  plugins: [exampleOnResolvePlugin],
});
