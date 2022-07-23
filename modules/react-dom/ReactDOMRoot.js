import { updateContainer } from "../react-reconciler/ReactFiberReconciler";
import { createFiberRoot } from "../react-reconciler/ReactFiberRoot";
import { ConcurrentRoot } from "../react-reconciler/ReactRootTags";

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  updateContainer(children, root);
};

export function createRoot(container) {
  const initialChildren = null;
  const root = createFiberRoot(container, ConcurrentRoot, initialChildren);
  return new ReactDOMRoot(root);
}
