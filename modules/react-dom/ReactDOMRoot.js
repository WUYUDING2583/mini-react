import { updateContainer } from "../react-reconciler/ReactFiberReconciler";
import { createFiberRoot } from "../react-reconciler/ReactFiberRoot";

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  updateContainer(children, root);
};

export function createRoot(container) {
  const root = createFiberRoot(container);
  return new ReactDOMRoot(root);
}
