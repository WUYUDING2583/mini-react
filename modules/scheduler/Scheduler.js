import { peek, push } from "./SchedulerMinHeap";

let scheduledHostCallback = null;
let currentTask = null;

const performWorkUnitDeadline = () => {
  if (scheduledHostCallback !== null) {
    try {
      scheduledHostCallback();
    } finally {
    }
  }
};

const taskQueue = [];

const channel = new MessageChannel();
const port = channel.port2;

channel.port1.onmessage = performWorkUnitDeadline;

const schedulePerformWorkUnitDeadline = () => {
  port.postMessage(null);
  console.trace();
};

export function scheduleCallback(priorityLevel, callback, options) {
  const newTask = {
    callback,
  };

  push(taskQueue, newTask);

  requestHostCallback(flushWork);
}

function requestHostCallback(callback) {
  scheduledHostCallback = callback;
  schedulePerformWorkUnitDeadline();
}

function flushWork(hasTimeRemaining, initialTime) {
  return workLoop(hasTimeRemaining, initialTime);
}

function workLoop(hasTimeRemaining, initialTime) {
  console.trace("workLoop");
  currentTask = peek(taskQueue);
  // while (currentTask) {
  const callback = currentTask.callback;

  if (typeof callback === "function") {
    currentTask.callback = null;
    callback();
  }
  // }
}
