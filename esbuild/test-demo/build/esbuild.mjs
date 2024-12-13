import * as esbuild from "esbuild";

import path from "node:path";

let exampleOnResolvePlugin = {
  name: "example",
  setup(build) {
    // 重定向所有以"images/"开头的路径到"./public/images/"

    build.onResolve({ filter: /^react$/ }, (args) => {
      args.pluginData = { customInfo: "This is custom data" };

    });
    build.onLoad({ filter: /react-dom/ }, (args) => {
      console.log(args.path, args.pluginData);
    });
  },
};

await esbuild.build({
  entryPoints: ["./src/app.jsx"],
  outdir: "web/js",
  bundle: true,
  plugins: [exampleOnResolvePlugin],
});
