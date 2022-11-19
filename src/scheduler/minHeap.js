/**
 * return minHeap top node
 * @param {Array} heap
 * @returns any
 */
export function peak(heap) {
  return heap.length === 0 ? null : heap[0];
}

export function push(heap, node) {
  let index = heap.length;
  heap.push(node);
  shiftUp(heap, node, index);
}

function shiftUp(heap, node, i) {
  let index = i;
  while (index > 0) {
    const parentIndex = (index - 1) >> 1;
    const parent = heap[parentIndex];
    if (compare(node, parent) < 0) {
      heap[parentIndex] = node;
      heap[index] = node;
      index = parentIndex;
    } else {
      return;
    }
  }
}

export function pop(heap) {
  if (heap.length === 0) return null;
  const first = heap[0];
  const last = heap.pop();
  if (first !== last) {
    heap[0] = last;
    shiftDown(heap, last, 0);
  }
  return first;
}

function shiftDown(heap, node, i) {
  let index = i;
  const len = heap.length;
  const halfLen = len >> 1;
  while (index < halfLen) {
    const leftIndex = (index + 1) * 2 - 1;
    const rightIndex = leftIndex + 1;
    const left = heap[leftIndex];
    const right = heap[rightIndex];
    if (compare(left, node) < 0) {
      if (rightIndex < len && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < len && compare(right, left) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      return;
    }
  }
}

function compare(a, b) {
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}

// const a = [3, 7, 4, 10, 12, 9, 6, 15, 14];

// while (true) {
//   if (a.length === 0) break;
//   console.log("a", peak(a));
//   pop(a);
// }
