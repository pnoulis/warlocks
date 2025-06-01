import { performance } from "node:perf_hooks";

const mapTimingsLabel = new Map();

export const Timings = {
  timestamp: () => {
    return Date.now();
  },
  preciseTimestamp: () => {
    return performance.now();
  },
  start: (label = "default") => {
    if (mapTimingsLabel.has(label)) throw new Error(`Duplicate timing: ${label}`);
    return mapTimingsLabel.set(label, performance.now());
  },
  stop: (label = "default") => {
    if (!mapTimingsLabel.has(label)) throw new Error(`Missing timing: ${label}`);
    const timing = (performance.now() - mapTimingsLabel.get(label)).toFixed(3);
    mapTimingsLabel.clear(label);
    return timing;
  },
};
