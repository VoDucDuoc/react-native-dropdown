function isEqualValue(a: any, b: any): boolean {
  if (Object.is(a, b)) {
    return true;
  }
  if (a == null || b == null) {
    return a === b;
  }
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  if (Array.isArray(a)) {
    if (a.length !== (b as any[]).length) {
      return false;
    }
    return a.every((v, i) => isEqualValue(v, (b as any[])[i]));
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  return keysA.every(
    k =>
      Object.prototype.hasOwnProperty.call(b, k) &&
      isEqualValue((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
  );
}

export const findIndexInArr = (obj: any, arr: any[]): number => {
  if (!arr?.length) {
    return -1;
  }

  if (typeof obj === 'object' && obj !== null) {
    for (let index = 0; index < arr.length; index++) {
      if (isEqualValue(arr[index], obj)) {
        return index;
      }
    }
    return -1;
  }

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (Object.is(element, obj) || element == obj) {
      return index;
    }
    if (element != null && typeof element === 'object') {
      for (const key in element) {
        if (Object.prototype.hasOwnProperty.call(element, key) && element[key] == obj) {
          return index;
        }
      }
    }
  }

  return -1;
};
