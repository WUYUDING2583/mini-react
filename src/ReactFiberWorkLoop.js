import {
  updateClassComponent,
  updateFragmentComponent,
  updateFunctionComponent,
  updateHostComponent,
  updateHostTextComponent,
} from "./ReactFiberReconciler";
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTag";
import { Placement } from "./utils";

let workInProgres = null;
let workInProgresRoot = null;

// initial render or update render
export function scheduleUpdateonFiber(fiber) {
  workInProgres = fiber;
  workInProgresRoot = fiber;
}

function performUnitOfWork() {
  const { tag } = workInProgres;

  //  1. update current component
  switch (tag) {
    case HostComponent:
      updateHostComponent(workInProgres);
      break;
    case FunctionComponent:
      updateFunctionComponent(workInProgres);
      break;
    case ClassComponent:
      updateClassComponent(workInProgres);
      break;
    case Fragment:
      updateFragmentComponent(workInProgres);
      break;
    case HostText:
      updateHostTextComponent(workInProgres);
      break;
    default:
      break;
  }

  //  2. update next component, dfs
  if (workInProgres.child) {
    workInProgres = workInProgres.child;
    return;
  }
  let next = workInProgres;
  while (next) {
    if (next.sibling) {
      workInProgres = next.sibling;
      return;
    }
    next = next.return;
  }

  workInProgres = null;
}

function workLoop(IdleDeadline) {
  while (workInProgres && IdleDeadline.timeRemaining() > 0) {
    performUnitOfWork();
  }

  if (!workInProgres && workInProgresRoot) {
    commitRoot();
  }
}

function commitRoot() {
  commitWorker(workInProgresRoot);
  workInProgresRoot = null;
}

function commitWorker(workInProgres) {
  if (!workInProgres) return;
  // 1. commit itself
  const parentNode = getParentNode(workInProgres.return);
  const { flags, stateNode } = workInProgres;
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode);
  }
  // 2. commit child
  commitWorker(workInProgres.child);
  // 3. commit sibiling
  commitWorker(workInProgres.sibling);
}

requestIdleCallback(workLoop);

function getParentNode(workInProgres) {
  let temp = workInProgres;
  while (temp) {
    if (temp.stateNode) {
      return temp.stateNode;
    }
    temp = temp.return;
  }
}
