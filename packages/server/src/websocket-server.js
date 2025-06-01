import { WebSocketServer } from "ws";

export let wss;
export let connected = false;

export function wssWarlocksConfig() {
  return {
    port: process.env.WARLOCKS_SERVER_PORT,
  };
}

export function wssStartServer() {
  let config;
  return new Promise((resolve, reject) => {
    try {
      config = wssWarlocksConfig();
      wss = new WebSocketServer(config);
      wss.on("listening", () => {
        debug(`Warlocks server listening to: ws://localhost:${config.port}`);
        connected = true;
        resolve();
      });
    } catch (err) {
      reject(new Error("Failed to start web socket server", { cause: err }));
    }
  });
}

export function wssStopServer() {
  return new Promise((resolve, reject) => {
    if (!connected) return resolve();
    wss.close((err) => {
      if (err) return reject(err);
      debug(`Warlocks server stopped listening`);
      resolve();
    });
  });
}
