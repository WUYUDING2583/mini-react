import { createFiber } from "./ReactFiber";
import { isArray, isStringOrNumber, updateNode } from "./utils";

export function updateFunctionComponent() {}

export function updateHostComponent(workInProgres) {
  if (!workInProgres.stateNode) {
    workInProgres.stateNode = document.createElement(workInProgres.type);
    updateNode(workInProgres.stateNode, workInProgres.props);
  }

  reconcilerChildren(workInProgres, workInProgres.props.children);
}
export function updateClassComponent() {}
export function updateFragmentComponent() {}
export function updateHostTextComponent() {}

// diff
function reconcilerChildren(workInProgres, children) {
  if (isStringOrNumber(children)) {
    return;
  }
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, workInProgres);
    if (previousNewFiber === null) {
      // first child
      workInProgres.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}
