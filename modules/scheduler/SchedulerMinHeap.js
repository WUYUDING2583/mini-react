export function push(heap, node) {
  heap.push(node);
}

export function peek(heap) {
  return heap.length === 0 ? null : heap[0];
}
