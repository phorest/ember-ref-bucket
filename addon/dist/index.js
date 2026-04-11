import { b as bucketFor, r as resolveGlobalRef } from './ref-BUxaMTFf.js';
export { a as registerNodeDestructor, u as unregisterNodeDestructor } from './ref-BUxaMTFf.js';
import { getOwner } from '@ember/application';
import { a as addPrototypeReference } from './prototype-reference-BGoKFNHf.js';

function nodeFor(context, name) {
  return bucketFor(context).get(name);
}
function maybeReturnCreated(value, createdValues, fn, ctx) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof fn === 'function') {
    if (!createdValues.has(value)) {
      createdValues.set(value, fn.call(ctx, value));
    }
    return createdValues.get(value);
  } else {
    return value;
  }
}
function ref(name, fn) {
  return function (klass, objectKey) {
    const createdValues = new WeakMap();
    if (typeof fn === 'function') {
      addPrototypeReference(klass, objectKey, name);
    }
    return {
      get() {
        const value = bucketFor(this).get(name);
        return maybeReturnCreated(value, createdValues, fn, this);
      },
      configurable: true
    };
  };
}
function globalRef(name, fn) {
  return function (klass, objectKey) {
    const createdValues = new WeakMap();
    if (typeof fn === 'function') {
      addPrototypeReference(klass, objectKey, name);
    }
    return {
      get() {
        const value = bucketFor(getOwner(this) || resolveGlobalRef()).get(name);
        return maybeReturnCreated(value, createdValues, fn, this);
      },
      configurable: true
    };
  };
}
function trackedRef(name, fn) {
  return function (klass, objectKey) {
    const createdValues = new WeakMap();
    if (typeof fn === 'function') {
      addPrototypeReference(klass, objectKey, name);
    }
    return {
      get() {
        const value = bucketFor(this).getTracked(name);
        return maybeReturnCreated(value, createdValues, fn, this);
      },
      configurable: true
    };
  };
}
function trackedGlobalRef(name, fn) {
  return function (klass, objectKey) {
    const createdValues = new WeakMap();
    if (typeof fn === 'function') {
      addPrototypeReference(klass, objectKey, name);
    }
    return {
      get() {
        const value = bucketFor(getOwner(this) || resolveGlobalRef()).getTracked(name);
        return maybeReturnCreated(value, createdValues, fn, this);
      },
      configurable: true
    };
  };
}

export { globalRef, nodeFor, ref, resolveGlobalRef, trackedGlobalRef, trackedRef };
//# sourceMappingURL=index.js.map
