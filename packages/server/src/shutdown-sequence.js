import { wssStopServer } from "./websocket-server.js";

export function shutdownSequence() {
  const tasks = [wssStopServer];
  const taskResults = [];
  let exitCode = 0;

  return new Promise((resolve, reject) =>
    taskRunner(0)
      .then(resolve)
      .catch((err) => {
        debug(err);
        exitCode = 1;
        reject(err);
      })
  ).finally(() => {
    taskResults.forEach((_) => debug(_));
    process.exit(exitCode);
  });

  function taskRunner(i) {
    const task = tasks[i];
    if (!task) return Promise.resolve();
    return (
      task()
        // The order of the .catch,.then handlers is very important.
        // If the .catch were to come after the .then then an error
        // would cause all previously successful tasks to register as
        // failed. That is due to recursion.
        .catch((err) => {
          taskResults.push(`Task failed: ${tasks[i].name}`);
          debug(err);
        })
        .then(() => {
          taskResults.push(`Task completed: ${tasks[i].name}`);
        })
        .finally(() =>
          // A failure to run a task should not stop the shutdown sequence
          taskRunner(i + 1)
        )
    );
  }
}
