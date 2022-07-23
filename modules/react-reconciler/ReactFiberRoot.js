import { createHostRootFiber } from "./ReactFiber";
import { initializeUpdateQueue } from "./ReactUpdateQueue";

function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}
export function createFiberRoot(containerInfo, tag, hydrate, initialChildren) {
  const root = new FiberRootNode(containerInfo);
  const uninitializedFiber = createHostRootFiber();
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
  const initialState = {
    element: initialChildren,
  };
  uninitializedFiber.memoizedState = initialState;
  initializeUpdateQueue(uninitializedFiber);
  return root;
}
