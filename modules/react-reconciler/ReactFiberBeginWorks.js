import { reconcileChildFibers } from "./ReactChildFiber";
import { processUpdateQueue } from "./ReactUpdateQueue";
import { HostRoot } from "./ReactWorkTags";

export function reconcileChildren(
  current,
  workInProgress,
  nextChildren,
  renderLanes
) {
  workInProgress.child = reconcileChildFibers(
    workInProgress,
    current.child,
    nextChildren,
    renderLanes
  );
}

function updateHostRoot(current, workInProgress, renderLanes) {
  const nextProps = workInProgress.pendingProps;
  const prevState = workInProgress.memoizedState;
  processUpdateQueue(workInProgress, nextProps, null, renderLanes);
  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

export function beginWork(current, workInProgress, renderLanes) {
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);
    default:
      return null;
  }
}
