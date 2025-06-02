import { wssStartServer } from "./websocket-server.js";

export function startupSequence() {
  const tasks = [wssStartServer];
  const taskResults = [];

  return new Promise((resolve, reject) =>
    taskRunner(0)
      .then(resolve)
      .catch((err) => {
        taskResults.forEach((_) => debug(_));
        process.exit(1);
      })
  );

  function taskRunner(i) {
    const task = tasks[i];
    if (!task) return Promise.resolve();

    // The order of the .catch,.then handlers is very important.
    // If the .catch were to come after the .then then an error
    // would cause all previously successful tasks to register as
    // failed. That is due to recursion.
    return task()
      .catch((err) => {
        taskResults.push(`Task failed: ${task.name}`);
        debug(err);
        // A failure to run a task halts the startup sequence
        throw err;
      })
      .then(() => {
        taskResults.push(`Task completed: ${task.name}`);
        return taskRunner(i + 1);
      });
  }
}
