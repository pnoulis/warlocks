import * as esbuild from "esbuild";
import * as Path from "node:path";

const transformAbsoluteModuleImports = {
  name: "transformAbsoluteModuleImports",
  setup(build) {
    build.onResolve({ filter: /^\// }, (args) => ({
      path: join(import.meta.dirname, args.path),
    }));
  },
};

if (process.env.NODE_ENV === "production") {
  esbuild.build({
    sourceRoot: ".",
    bundle: true,
    entryPoints: ["src/main.js"],
    outdir: Path.join(process.env.BUILDIR_ABS, "server"),
    plugins: [transformAbsoluteModuleImports],
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
    plugins: [transformAbsoluteModuleImports],
    minify: false,
    treeShaking: false,
    format: "esm",
    platform: "node",
    target: "es2022",
    packages: "external",
  });
}
