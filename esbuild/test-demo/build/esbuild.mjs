import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
let n = 0;
const cwd = process.cwd();
let exampleOnResolvePlugin = {
  name: "example",
  setup(build) {
    const rootPath = process.cwd();
    console.log(build.initialOptions)
    // 重定向所有以"images/"开头的路径到"./public/images/"
    build.onResolve({ filter: /.*/ }, (args) => {
      console.log("onresolve", args.path);
    });
    build.onLoad({ filter: /foo/ }, (args) => {
      console.log("onLoad", args.path);
    });
    build.onStart(() => {
      console.log("build started start");
    });

 
  },
};

await esbuild.build({
  entryPoints: ["./src/app.jsx"],
  outdir: "web/js",
  bundle: true,
  metafile: true,
  plugins: [exampleOnResolvePlugin],
});
