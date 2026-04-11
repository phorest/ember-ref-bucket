const PrototypeReferences = new WeakMap();
function addPrototypeReference(klass, objectKey, referenceName) {
  if (!PrototypeReferences.has(klass)) {
    PrototypeReferences.set(klass, {});
  }
  let obj = PrototypeReferences.get(klass);
  if (!(referenceName in obj)) {
    obj[referenceName] = new Set();
  }
  obj[referenceName].add(objectKey);
}
function getReferencedKeys(klassInstance, referenceName) {
  let proto = klassInstance;
  while (proto.__proto__) {
    proto = proto.__proto__;
    if (PrototypeReferences.has(proto)) {
      let maybeData = PrototypeReferences.get(proto);
      if (referenceName in maybeData) {
        return Array.from(maybeData[referenceName]);
      }
    }
  }
  return [];
}

export { addPrototypeReference as a, getReferencedKeys as g };
//# sourceMappingURL=prototype-reference-BGoKFNHf.js.map
