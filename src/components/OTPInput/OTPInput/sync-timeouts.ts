export function syncTimeouts(cb: (...args: any[]) => unknown): any[] {
  const t1 = setTimeout(cb, 0); // For faster machines
  const t2 = setTimeout(cb, 10);
  const t3 = setTimeout(cb, 50);
  return [t1, t2, t3];
}
