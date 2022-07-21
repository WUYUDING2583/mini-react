function reconcileSingleElement(
  returnFiber,
  currentFirstChild,
  element,
  lanes
) {
  console.trace();
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
