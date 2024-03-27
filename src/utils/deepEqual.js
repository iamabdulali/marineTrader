export const deepEqual = (obj1, obj2) => {
  // Check if both objects are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // Compare array lengths
    if (obj1.length !== obj2.length) {
      return false;
    }
    // Compare array elements recursively
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  // Check if both objects are objects
  if (
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    obj1 !== null &&
    obj2 !== null
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // Compare object key lengths
    if (keys1.length !== keys2.length) {
      return false;
    }
    // Compare object keys and values recursively
    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }

  // Compare primitive values
  return obj1 === obj2;
};
