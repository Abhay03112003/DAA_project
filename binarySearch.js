export function binarySearchMultiple(array, target, field) {
  let start = 0;
  let end = array.length - 1;
  target = target.toLowerCase();
  const results = [];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const midValue = array[mid][field].toString().toLowerCase();

    if (midValue === target) {
      // Collect the matching item and expand to find all neighboring matches
      results.push(array[mid]);

      // Check left of mid for additional matches
      let left = mid - 1;
      while (left >= 0 && array[left][field].toString().toLowerCase() === target) {
        results.push(array[left]);
        left--;
      }

      // Check right of mid for additional matches
      let right = mid + 1;
      while (right < array.length && array[right][field].toString().toLowerCase() === target) {
        results.push(array[right]);
        right++;
      }

      return results; // Return all found results
    }

    if (midValue < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return results.length > 0 ? results : null;
}
