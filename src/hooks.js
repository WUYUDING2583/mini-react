import { scheduleUpdateonFiber } from "./ReactFiberWorkLoop";

let currentlyRenderingFiber = null;
let workInProgresHook = null;

export function renderWithHooks(workInProgres) {
  currentlyRenderingFiber = workInProgres;
  currentlyRenderingFiber.memorizedState = null;
  workInProgresHook = null;
}
function updateWorkInProgressHook() {
  let hook;
  // current is the old fiber which still be rendered in screen
  // workInProgress is the fiber which will be rendered in screen
  const current = currentlyRenderingFiber.alternate;
  if (current) {
    // component update
    currentlyRenderingFiber.memorizedState = current.memorizedState;
    if (workInProgresHook) {
      workInProgresHook = hook = workInProgresHook.next;
    } else {
      // hook list head
      workInProgresHook = hook = currentlyRenderingFiber.memorizedState;
    }
  } else {
    // component initial render
    hook = {
      memorizedState: null,
      next: null,
    };
    if (workInProgresHook) {
      workInProgresHook = workInProgresHook.next = hook;
    } else {
      // hook list head
      workInProgresHook = currentlyRenderingFiber.memorizedState = hook;
    }
  }
  return hook;
}
export function useReducer(reducer, initialState) {
  const hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    // initial render
    hook.memorizedState = initialState;
  }
  const dispatch = () => {
    hook.memorizedState = reducer(hook.memorizedState);
    currentlyRenderingFiber.alternate = { ...currentlyRenderingFiber };
    scheduleUpdateonFiber(currentlyRenderingFiber);
    console.log("dispatch");
  };
  return [hook.memorizedState, dispatch];
}
