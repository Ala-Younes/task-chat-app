const simulateServerWaiting = (callback: any, delay: number) => {
  setTimeout(function () {
    callback();
  }, delay);
};

export { simulateServerWaiting };
