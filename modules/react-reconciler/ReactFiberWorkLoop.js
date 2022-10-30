import { scheduleCallback } from "../scheduler/Scheduler";
import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWorks";
import { completeWork } from "./ReactFiberCompleteWork";

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
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

function completeUnitOfWork(unitOfWork) {
  let completedWork = unitOfWork;
  console.log("completeUnitOfWork", unitOfWork);
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;

    completedWork = null;
    workInProgress = null;
    break;
    let next = completeWork(current, completedWork);
    if (next !== null) {
      workInProgress = next;
      return;
    }
    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }
    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (completedWork !== null);
}

function prepareFreshStack(root, lanes) {
  const rootWorkInProgress = createWorkInProgress(root.current, null);
  workInProgress = rootWorkInProgress;
}
