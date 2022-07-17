import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

export function updateContainer(element, container) {
  console.log(element, container);
  const current = container.current;
  const root = scheduleUpdateOnFiber(current);
  return root;
}
