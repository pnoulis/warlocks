import "./globals.js";
import { startupSequence } from "./startup-sequence.js";
import { shutdownSequence } from "./shutdown-sequence.js";

startupSequence();

process.on("SIGINT", shutdownSequence);
process.on("SIGTERM", shutdownSequence);
process.on("unhandledRejection", (err) => {
  debug(err);
});
process.on("uncaughtException", (err) => {
  debug(err);
});
