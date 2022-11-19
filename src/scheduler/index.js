import { peak, pop, push } from "./minHeap";

let taskQueue = [];
let taskIdCounter = 1;

export function scheduleCallback(callback) {
  const currentTime = getCurrentTime();
  const timeout = -1;
  const expirationTime = currentTime - timeout;

  const newTask = {
    id: taskIdCounter++,
    callback,
    expirationTime,
    sortIndex: expirationTime,
  };

  push(taskQueue, newTask);

  requestHostCallback();
}

function requestHostCallback() {
  port.postMessage(null);
}

const channel = new MessageChannel();
const port = channel.port2;

channel.port1.onmessage = function () {
  workLoop();
};

function workLoop() {
  let currentTask = peak(taskQueue);
  while (currentTask) {
    const { callback } = currentTask;
    currentTask.callback = null;
    callback();
    pop(taskQueue);
    currentTask = peak(taskQueue);
  }
}

export function getCurrentTime() {
  return performance.now();
}
