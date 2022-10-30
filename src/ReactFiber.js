import { FunctionComponent, HostComponent } from "./ReactWorkTag";
import { isFn, isStr, Placement } from "./utils";

export function createFiber(vnode, returnFiber) {
  const fiber = {
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    // HTML tag=> dom node
    // class compoennt=> class instance
    stateNode: null,
    // first child fiber
    child: null,
    // sibiling node
    sibling: null,
    // parent fiber
    return: returnFiber,

    flags: Placement,
    // the index of node under current tier
    index: null,
  };

  const { type } = vnode;
  if (isStr(type)) {
    // when type is string, e.g. "div", "h1", it's a host compoent
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    fiber.tag = FunctionComponent;
  }
  return fiber;
}
