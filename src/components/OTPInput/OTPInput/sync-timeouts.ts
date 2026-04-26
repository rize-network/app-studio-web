// Defines and exports a utility function `syncTimeouts` that schedules a given callback `cb` multiple times with different, staggered delays. It takes a callback function `cb` as an argument and returns an array of timeout IDs.
export function syncTimeouts(cb: (...args: any[]) => unknown): any[] {
  // Schedules the provided callback `cb` for immediate asynchronous execution, essentially placing it at the front of the event queue.
  const t1 = setTimeout(cb, 0);
  // Schedules the provided callback `cb` to execute after a 10-millisecond delay.
  const t2 = setTimeout(cb, 10);
  // Schedules the provided callback `cb` to execute after a 50-millisecond delay.
  const t3 = setTimeout(cb, 50);
  // Returns an array containing the unique IDs of the three scheduled timeouts, allowing them to be referenced or cleared later if needed.
  return [t1, t2, t3];
}
