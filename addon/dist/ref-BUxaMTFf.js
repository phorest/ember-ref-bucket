import { isDestroyed, isDestroying, registerDestructor } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';

function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function (i) {
    a[i] = n[i];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function (r, n) {
    return n(i, e, r) || r;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, {
    enumerable: r.enumerable,
    configurable: r.configurable,
    writable: r.writable,
    value: r.initializer ? r.initializer.call(l) : void 0
  });
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var _class, _descriptor;

/**
 * @type {object | null}
 */
let lastGlobalRef = null;
/**
 * @type {WeakMap<object, ReturnType<typeof createBucket>>}
 */
const buckets = new WeakMap();
/**
 * @type {WeakMap<HTMLElement, Array<() => void>>}
 */
const nodeDestructors = new WeakMap();
const hasWeakRef = typeof WeakRef !== 'undefined';
function fromWeakRefIfSupported(node) {
  if (hasWeakRef && node instanceof WeakRef) {
    return node.deref() ?? null;
  }
  return node;
}

/**
 *
 * @param {null | undefined | WeakRef | HTMLElement } node
 * @returns
 */
function toWeakRefIfSupported(node) {
  if (node === null || node === undefined) {
    return null;
  }
  if (hasWeakRef) {
    if (node instanceof WeakRef) {
      return node;
    }
    return new WeakRef(node);
  }
  return node;
}
let FieldCell = (_class = class FieldCell {
  constructor() {
    /**
    /**
     * @type {null | (WeakRef<HTMLElement> | HTMLElement)}
     */
    _initializerDefineProperty(this, "_element", _descriptor, this);
  }
  get value() {
    if (this._element) {
      return fromWeakRefIfSupported(this._element);
    } else {
      return null;
    }
  }
  set value(element) {
    if (element) {
      this._element = toWeakRefIfSupported(element);
    } else {
      this._element = null;
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_element", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _class);
function setGlobalRef(value) {
  lastGlobalRef = value;
}
function cleanGlobalRef() {
  lastGlobalRef = null;
}
function resolveGlobalRef() {
  return lastGlobalRef;
}
function createBucket() {
  return {
    /**
     * @type { Record<string, HTMLElement> }
     */
    bucket: {},
    /**
     * @type { Record<string, FieldCell> }
     */
    keys: {},
    /**
     * @param {string} key
     */
    createTrackedCell(key) {
      if (!(key in this.keys)) {
        this.keys[key] = new FieldCell();
      }
    },
    /**
     * @param {string} name
     * @returns { HTMLElement | null }
     */
    get(name) {
      this.createTrackedCell(name);
      return fromWeakRefIfSupported(this.bucket[name]) || null;
    },
    /**
     * @param {string} name
     */
    dirtyTrackedCell(name) {
      this.createTrackedCell(name);
      const val = this.keys[name].value;
      this.keys[name].value = val;
    },
    /**
     * @param {string} name
     */
    getTracked(name) {
      this.createTrackedCell(name);
      return this.keys[name].value;
    },
    /**
     * @param {string} name
     * @param {HTMLElement} value
     */
    add(name, value) {
      this.createTrackedCell(name);
      this.keys[name].value = value;
      this.bucket[name] = toWeakRefIfSupported(value);
      if (!(name in this.notificationsFor)) {
        this.notificationsFor[name] = [];
      }
      this.notificationsFor[name].forEach(fn => fn());
    },
    /**
     * @param {string} name
     * @param {() => void} fn
     */
    addNotificationFor(name, fn) {
      if (!(name in this.notificationsFor)) {
        this.notificationsFor[name] = [];
      }
      this.notificationsFor[name].push(fn);
      return () => {
        this.notificationsFor[name] = this.notificationsFor[name].filter(cb => cb !== cb);
      };
    },
    /**
     * @type { Record<string, Array<() => void>> }
     */
    notificationsFor: {}
  };
}

/**
 *
 * @param {HTMLElement} node
 * @returns {Array<() => void>}
 */
function getNodeDestructors(node) {
  return nodeDestructors.get(node) || [];
}

/**
 * @param {HTMLElement} node
 * @param {() => void} cb
 */
function registerNodeDestructor(node, cb) {
  if (!nodeDestructors.has(node)) {
    nodeDestructors.set(node, []);
  }
  nodeDestructors.get(node)?.push(cb);
}
/**
 *
 * @param {HTMLElement} node
 * @param {()=> void} cb
 */
function unregisterNodeDestructor(node, cb) {
  const destructors = nodeDestructors.get(node) || [];
  nodeDestructors.set(node, destructors.filter(el => el !== cb));
}
/**
 *
 * @param {object} rawCtx
 * @returns {ReturnType<typeof createBucket> | undefined}
 */
function bucketFor(rawCtx) {
  const ctx = rawCtx;
  if (!buckets.has(ctx)) {
    buckets.set(ctx, createBucket());
    if (isDestroyed(ctx) || isDestroying(ctx)) {
      try {
        return buckets.get(ctx);
      } finally {
        buckets.delete(ctx);
      }
    }
    registerDestructor(ctx, () => {
      buckets.delete(ctx);
    });
  }
  return buckets.get(ctx);
}
/**
 *
 * @param {string} name
 * @param {object} bucketRef
 * @param {()=>void} cb
 * @returns
 */
function watchFor(name, bucketRef, cb) {
  const bucket = bucketFor(bucketRef);
  return bucket?.addNotificationFor(name, cb);
}

export { _defineProperty as _, registerNodeDestructor as a, bucketFor as b, cleanGlobalRef as c, _applyDecoratedDescriptor as d, getNodeDestructors as g, resolveGlobalRef as r, setGlobalRef as s, unregisterNodeDestructor as u, watchFor as w };
//# sourceMappingURL=ref-BUxaMTFf.js.map
