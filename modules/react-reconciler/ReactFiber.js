import { HostRoot } from "./ReactWorkTags";

function FiberNode(tag) {
  // Instance
  this.tag = tag;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
}

export function createFiber(tag) {
  return new FiberNode(tag);
}

export function createHostRootFiber() {
  return createFiber(HostRoot);
}
