import { createFiberFromElement } from "./ReactFiber";

function placeSingleChild(newFiber) {
  return newFiber;
}

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
  function reconcileChildFibers(
    returnFiber,
    currentFirstChild,
    newChild,
    lanes
  ) {
    return placeSingleChild(
      reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes)
    );
  }
  return reconcileChildFibers;
}

export const reconcileChildFibers = ChildReconciler(true);
