import { _ as _defineProperty, w as watchFor, b as bucketFor } from '../ref-BUxaMTFf.js';
import Helper from '@ember/component/helper';
import { unregisterDestructor, registerDestructor } from '@ember/destroyable';
import { getOwner } from '@ember/application';

class RefToHelper extends Helper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_watcher", null);
  }
  compute([name, context], {
    tracked
  }) {
    const bucketRef = context ?? getOwner(this);
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
}

export { RefToHelper as default };
//# sourceMappingURL=ref-to.js.map
