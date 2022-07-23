import { createFiberFromElement } from "./ReactFiber";

function reconcileSingleElement(
  returnFiber,
  currentFirstChild,
  element,
  lanes
) {
  const created = createFiberFromElement(element, returnFiber.mode, lanes);
  created.return = returnFiber;
  return created;
}

function ChildReconciler(shouldTracksSideEffects) {
  function reconcileChildFiber(
    returnFiber,
    currentFirstChild,
    newChild,
    lanes
  ) {
    reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes);
  }
  return reconcileChildFiber;
}

export const reconcileChildFiber = ChildReconciler(true);
