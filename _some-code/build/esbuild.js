import * as esbuild from "esbuild";

const ctx =await esbuild.context({
    entryPoints: ["./src/index.js"],
    outdir: "web/js",
    bundle: true,
    metafile: true,
})

await ctx.watch()

let { host, port } = await ctx.serve({
    servedir: "web",
  });