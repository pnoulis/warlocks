import { wssStopServer } from "./websocket-server.js";

export function shutdownSequence() {
  const tasks = [wssStopServer];
  const taskResults = [];
  let exitCode = 0;

  taskRunner(0).finally(() => {
    taskResults.forEach((_) => debug(_));
    process.exit(exitCode);
  });

  function taskRunner(i) {
    const task = tasks[i];
    if (!task) return Promise.resolve();
    return task()
      .then(() => {
        taskResults.push(`Task completed: ${tasks[i].name}`);
        return taskRunner(i + 1);
      })
      .catch((err) => {
        taskResults.push(`Task failed: ${tasks[i].name}`);
        exitCode = 1;
        debug(err);
        // A failed task does not halt the shutdown sequence
        return taskRunner(i + 1);
      });
  }
}
