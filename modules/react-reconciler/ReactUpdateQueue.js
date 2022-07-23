export const UpdateState = 0;

export function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
    },
    effects: null,
  };
  fiber.updateQueue = queue;
}

export function createUpdate(eventTime, lane) {
  const update = {
    eventTime,
    lane,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null,
  };
  return update;
}

export function enqueueUpdate(fiber, update, lane) {
  console.trace();
  const updateQueue = fiber.updateQueue;
  const sharedQueue = updateQueue.shared;
  const pending = sharedQueue.pending;
  if (pending === null) {
    update.next = update;
  }
  sharedQueue.pending = update;
}

export function processUpdateQueue(
  workInProgress,
  props,
  instance,
  renderLanes
) {
  const queue = workInProgress.updateQueue;
  let firstBaseUpdate = queue.firstBaseUpdate;
  let lastBaseUpdate = queue.lastBaseUpdate;
  let update = firstBaseUpdate;
  const newState = getStateFromUpdate(
    workInProgress,
    null,
    update,
    newState,
    props,
    instance
  );
  workInProgress.memoizedState = newState;
}

function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  console.log(arguments);
  const payload = update.payload;
  let partialState = payload;
  return assign({}, prevState, partialState);
}
