import { scheduleCallback } from "../scheduler/Scheduler";

export function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  const root = fiber.stateNode;
  ensureRootIsScheduled(root, eventTime);
  return root;
}

export function ensureRootIsScheduled(root, currentTime) {
  scheduleCallback(null, performConcurrentWorkOnRoot.bind(null, root));
}

function performConcurrentWorkOnRoot(root) {
  console.trace();
}
