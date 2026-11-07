import { d as _applyDecoratedDescriptor, _ as _defineProperty, s as setGlobalRef, g as getNodeDestructors, b as bucketFor, w as watchFor } from '../ref-BUxaMTFf.js';
import Modifier from 'ember-modifier';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { g as getReferencedKeys } from '../prototype-reference-BGoKFNHf.js';
import { registerDestructor } from '@ember/destroyable';

var _class;
let RefModifier = (_class = class RefModifier extends Modifier {
  constructor() {
    super(...arguments);
    _defineProperty(this, "debugName", 'create-ref');
    _defineProperty(this, "_key", void 0);
    _defineProperty(this, "_ctx", void 0);
    _defineProperty(this, "_element", void 0);
    // to minimise overhead, user should be specific about
    // what they want to observe
    _defineProperty(this, "defaultMutationObserverOptions", {
      attributes: false,
      characterData: false,
      childList: false,
      subtree: false
    });
    setGlobalRef(getOwner(this));
    registerDestructor(this, () => {
      const element = this._element;
      this.cleanMutationObservers();
      this.cleanResizeObservers();
      getNodeDestructors(element).forEach(cb => cb());
      if (this._ctx && element === bucketFor(this._ctx).get(this._key)) {
        bucketFor(this._ctx).add(this._key, null);
      }
      delete this._element;
    });
  }
  markDirty() {
    bucketFor(this._ctx).dirtyTrackedCell(this._key);
  }
  cleanMutationObservers() {
    if (this._mutationsObserver) {
      this._mutationsObserver.disconnect();
    }
  }
  cleanResizeObservers() {
    if (this._resizeObserver) {
      this._resizeObserver.unobserve(this._element);
    }
  }
  installMutationObservers(named = {}) {
    this._mutationsObserver = new MutationObserver(this.markDirty);
    const opts = this.getObserverOptions(named);
    delete opts.resize;
    if (opts.attributes || opts.characterData || opts.childList) {
      // mutations observer throws if observe is attempted
      // with all these options disabled
      this._mutationsObserver.observe(this._element, opts);
    }
  }
  validateTrackedOptions(named = {}) {
    const args = ['subtree', 'attributes', 'children', 'resize', 'character'];
    if (args.some(name => name in named)) {
      assert(`ember-ref-bucket: observer options (${args.join(', ')}) require the tracked flag or a tracked alias`, this.isTracked(named));
    }
  }
  getObserverOptions(named = {}) {
    // to minimise overhead user
    // should be specific about
    // what they want to observe
    let resize = false;
    let subtree = this.defaultMutationObserverOptions.subtree;
    let attributes = this.defaultMutationObserverOptions.attributes;
    let character = this.defaultMutationObserverOptions.characterData;
    let children = this.defaultMutationObserverOptions.childList;
    if ('subtree' in named) {
      subtree = named.subtree;
    }
    if ('attributes' in named) {
      attributes = named.attributes;
    }
    if ('children' in named) {
      children = named.children;
    }
    if ('resize' in named) {
      resize = named.resize;
    }
    if ('character' in named) {
      character = named.character;
    }
    return {
      subtree,
      attributes,
      childList: children,
      resize,
      characterData: character
    };
  }
  installResizeObservers(element) {
    this._resizeObserver = new ResizeObserver(this.markDirty);
    this._resizeObserver.observe(element);
  }
  modify(element, positional, named) {
    const name = this.name(positional);
    assert(`ember-ref-bucket: You must provide a string as the first positional argument for {{${this.debugName}}}`, typeof name === 'string' && name.length > 0);
    const ctx = this.ctx(positional);
    const prevKey = this._key;
    const prevCtx = this._ctx;
    const prevElement = this._element;
    this._key = name;
    this._ctx = ctx;
    this._element = element;
    this.validateTrackedOptions(named);
    this.cleanMutationObservers();
    this.cleanResizeObservers();
    if (prevCtx && (name !== prevKey || ctx !== prevCtx) && bucketFor(prevCtx).get(prevKey) === prevElement) {
      bucketFor(prevCtx).add(prevKey, null);
    }
    watchFor(name, ctx, () => {
      const keys = getReferencedKeys(ctx, name);
      keys.forEach(keyName => {
        // consume keys with callbacks
        ctx[keyName];
      });
    });
    bucketFor(ctx).add(name, element);
    if (this.isTracked(named)) {
      this.installMutationObservers(named);
      if (this.getObserverOptions(named).resize) {
        this.installResizeObservers(element);
      }
    }
  }
  ctx([name, context] = []) {
    assert(`ember-ref-bucket: {{${this.debugName} "${name}"}} requires a context as the second positional argument, e.g. {{${this.debugName} "${name}" this}}. In template-only components, where \`this\` is null, use a global variant instead.`, context !== undefined && context !== null);
    return context;
  }
  isTracked(named = {}) {
    return named.tracked || false;
  }
  name(positional) {
    return positional[0];
  }
}, _applyDecoratedDescriptor(_class.prototype, "markDirty", [action], Object.getOwnPropertyDescriptor(_class.prototype, "markDirty"), _class.prototype), _class);

export { RefModifier as default };
//# sourceMappingURL=create-ref.js.map
