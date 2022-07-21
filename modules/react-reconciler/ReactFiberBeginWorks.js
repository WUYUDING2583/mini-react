import { reconcileChildFiber } from "./ReactChildFiber";
import { HostRoot } from "./ReactWorkTags";

export function reconcileChildren(
  current,
  workInProgress,
  nextChildren,
  renderLanes
) {
  workInProgress.child = reconcileChildFiber(
    workInProgress,
    current.child,
    nextChildren,
    renderLanes
  );
}

function updateHostRoot(current, workInProgress, renderLanes) {
  reconcileChildren(current, workInProgress, null, renderLanes);
  return workInProgress.child;
}

export function beginWork(current, workInProgress, renderLanes) {
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);
  }
}
