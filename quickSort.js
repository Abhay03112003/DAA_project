export function quickSort(array, field) {
    if (array.length <= 1) return array;
    const pivot = array[array.length - 1];
    const left = [];
    const right = [];
  
    for (const item of array.slice(0, -1)) {
      item[field] < pivot[field] ? left.push(item) : right.push(item);
    }
  
    return [...quickSort(left, field), pivot, ...quickSort(right, field)];
  }
  