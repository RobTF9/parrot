function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

async function runTimers(s: number): Promise<void> {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < s; i++) {
    jest.advanceTimersByTime(1000);
    // eslint-disable-next-line no-await-in-loop
    await flushPromises();
  }
}

export default runTimers;
