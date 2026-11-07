import { _ as _defineProperty, w as watchFor, b as bucketFor } from '../ref-BUxaMTFf.js';
import Helper from '@ember/component/helper';
import { unregisterDestructor, registerDestructor } from '@ember/destroyable';
import { assert } from '@ember/debug';

class RefToHelper extends Helper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "debugName", 'ref-to');
    _defineProperty(this, "_watcher", null);
  }
  compute(positional, {
    tracked
  }) {
    const [name] = positional;
    const bucketRef = this.ctx(positional);
    if (this._name !== name) {
      if (this._watcher) {
        unregisterDestructor(this, this._watcher);
      }
      this._watcher = watchFor(name, bucketRef, () => {
        this.recompute();
      });
      registerDestructor(this, this._watcher);
      this._name = name;
    }
    if (tracked) {
      return bucketFor(bucketRef).getTracked(name);
    } else {
      return bucketFor(bucketRef).get(name);
    }
  }
  ctx([name, context] = []) {
    assert(`ember-ref-bucket: (${this.debugName} "${name}") requires a context as the second positional argument, e.g. (${this.debugName} "${name}" this). In template-only components, where \`this\` is null, use a global variant instead.`, context !== undefined && context !== null);
    return context;
  }
}

export { RefToHelper as default };
//# sourceMappingURL=ref-to.js.map
