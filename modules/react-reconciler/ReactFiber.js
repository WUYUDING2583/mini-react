import { HostRoot } from "./ReactWorkTags";

function FiberNode(tag, pendingProps, key = null, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.denpendencies = null;

  this.mode = mode;
  // Effects

  this.alternate = null;
}

export function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}

export function createHostRootFiber() {
  return createFiber(HostRoot);
}

// This is to create a alternate fiber to do work on
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    );
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  }

  workInProgress.child = current.child;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.sibling = current.sibling;
  return workInProgress;
}
