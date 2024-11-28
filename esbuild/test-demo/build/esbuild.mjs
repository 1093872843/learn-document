import * as esbuild from "esbuild";

 await esbuild.build({
  entryPoints: ["./entry/*.js"],
  outdir: "web/js",
  banner: {
    js: '//comment',
    css: '/*comment*/',
  },
  bundle: true,
});
