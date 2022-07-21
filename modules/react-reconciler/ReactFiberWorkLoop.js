import { scheduleCallback } from "../scheduler/Scheduler";
import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWorks";

let workInProgress = null;

export function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  const root = fiber.stateNode;
  ensureRootIsScheduled(root, eventTime);
  return root;
}

export function ensureRootIsScheduled(root, currentTime) {
  scheduleCallback(null, performConcurrentWorkOnRoot.bind(null, root));
}

function performConcurrentWorkOnRoot(root) {
  renderRootSync(root);
}

function renderRootSync(root, lanes) {
  prepareFreshStack(root, lanes);
  do {
    workLoopSync();
    break;
  } while (true);
}

function workLoopSync() {
  while (workInProgress != null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  let next = beginWork(current, unitOfWork);
  workInProgress = null;
}

function prepareFreshStack(root, lanes) {
  const rootWorkInProgress = createWorkInProgress(root.current, null);
  workInProgress = rootWorkInProgress;
}
