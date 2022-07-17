const performWorkUnitDeadline = () => {
  console.trace("perform work unit");
};

const channel = new MessageChannel();
const port = channel.port2;

channel.port1.onmessage = performWorkUnitDeadline;

const schedulePerformWorkUnitDeadline = () => {
  port.postMessage(null);
  console.trace();
};

export function scheduleCallback(priorityLevel, callback, options) {
  requestHostCallback(flushWork);
}

function requestHostCallback(callback) {
  schedulePerformWorkUnitDeadline();
}

function flushWork(hasTimeRemaining, initialTime) {
  return workLoop(hasTimeRemaining, initialTime);
}

function workLoop(hasTimeRemaining, initialTime) {}
