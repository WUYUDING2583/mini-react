import { renderWithHooks } from "./hooks";
import { createFiber } from "./ReactFiber";
import { isArray, isStringOrNumber, Update, updateNode } from "./utils";

export function updateFunctionComponent(workInProgres) {
  renderWithHooks(workInProgres);
  const { type, props } = workInProgres;
  const children = type(props);
  // console.log("updateFunctionComponent", children);
  reconcilerChildren(workInProgres, children);
}

export function updateHostComponent(workInProgres) {
  if (!workInProgres.stateNode) {
    workInProgres.stateNode = document.createElement(workInProgres.type);
    updateNode(workInProgres.stateNode, {}, workInProgres.props);
  }

  reconcilerChildren(workInProgres, workInProgres.props.children);
}
export function updateClassComponent(workInProgres) {
  const { type, props } = workInProgres;
  const instance = new type(props);
  const children = instance.render();
  reconcilerChildren(workInProgres, children);
  // console.log("updateClassComponent", workInProgres, children);
}
export function updateFragmentComponent(workInProgres) {
  reconcilerChildren(workInProgres, workInProgres.props.children);
}

export function updateHostTextComponent(workInProgres) {
  const { props } = workInProgres;
  workInProgres.stateNode = document.createTextNode(props.children);
}

// diff
function reconcilerChildren(workInProgres, children) {
  if (isStringOrNumber(children)) {
    return;
  }
  const newChildren = isArray(children) ? children : [children];

  let oldFiber = workInProgres.alternate?.child;

  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, workInProgres);
    const same = sameNode(newFiber, oldFiber);
    if (same) {
      Object.assign(newFiber, {
        stateNode: oldFiber.stateNode,
        alternate: oldFiber,
        flags: Update,
      });
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (previousNewFiber === null) {
      // first child
      workInProgres.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

// To reuse node
// 1. in same level
// 2. same type
// 3. same key
function sameNode(a, b) {
  return a && b && a.type === b.type && a.key === b.key;
}
