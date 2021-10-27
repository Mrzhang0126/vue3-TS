export function deepClone(obj: any, hash = new WeakMap()): any {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== 'object') return obj;
  //循环引用的情况
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const newObj = new obj.constructor();
  hash.set(obj, newObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key], hash);
    }
  }
  //考虑symbol的情况
  const symbolObj = Object.getOwnPropertySymbols(obj);
  for (let i = 0; i < symbolObj.length; i++) {
    if (obj.hasOwnProperty(symbolObj[i])) {
      newObj[symbolObj[i]] = deepClone(obj[symbolObj[i]], hash);
    }
  }
  return newObj;
}
