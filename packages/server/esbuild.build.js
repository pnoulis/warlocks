import * as esbuild from "esbuild";
import * as Path from "node:path";

const transformAbsoluteModuleImports = {
  name: "transformAbsoluteModuleImports",
  setup(build) {
    build.onResolve({ filter: /@warlocks\/server/ }, (args) => ({
      path: Path.join(import.meta.dirname, "src", args.path.split("/").slice(2)),
    }));
  },
};

if (process.env.NODE_ENV === "production") {
  esbuild.build({
    sourceRoot: ".",
    bundle: true,
    entryPoints: ["src/main.js"],
    outdir: Path.join(process.env.BUILDIR_ABS, "server"),
    plugins: [],
    minify: true,
    treeShaking: true,
    format: "esm",
    platform: "node",
    target: "es2022",
    packages: "external",
  });
} else {
  esbuild.build({
    sourceRoot: ".",
    bundle: true,
    entryPoints: ["src/main.js"],
    outdir: Path.join(process.env.BUILDIR_ABS, "server"),
    plugins: [],
    minify: false,
    treeShaking: false,
    format: "esm",
    platform: "node",
    target: "es2022",
    packages: "external",
  });
}
