import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTag";
import { isFn, isStr, isUndefined, Placement } from "./utils";

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

    // store old fiber
    alternate: null,
    // the hook linked list head
    memorizedState: null,
  };

  const { type } = vnode;
  if (isStr(type)) {
    // when type is string, e.g. "div", "h1", it's a host compoent
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    fiber.tag = type.prototype.isReactComponent
      ? ClassComponent
      : FunctionComponent;
  } else if (isUndefined(type)) {
    fiber.tag = HostText;
    fiber.props = { children: vnode };
  } else {
    fiber.tag = Fragment;
  }
  return fiber;
}
