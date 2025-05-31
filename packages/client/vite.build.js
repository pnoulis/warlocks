import * as vite from "vite";
import * as Path from "node:path";

if (process.env.NODE_ENV === "production") {
  vite.build({
    // shared options
    configFile: false,
    root: ".",
    mode: process.env.NODE_ENV,

    // build options
    build: {
      target: "esnext",
      outDir: Path.join(Path.relative(".", process.env.BUILDIR_ABS), "client"),
      emptyOutDir: true,
    },
  });
} else {
  vite.build({
    // shared options
    configFile: false,
    root: ".",
    mode: process.env.NODE_ENV,

    // build options
    build: {
      target: "esnext",
      outDir: Path.join(Path.relative(".", process.env.BUILDIR_ABS), "client"),
      emptyOutDir: true,
      minify: false,
    },
  });
}
