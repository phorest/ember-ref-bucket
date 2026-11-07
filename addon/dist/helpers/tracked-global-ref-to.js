import { _ as _defineProperty } from '../ref-BUxaMTFf.js';
import RefToHelper from './ref-to.js';
import { getOwner } from '@ember/application';

class TrackedGlobalRefToHelper extends RefToHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "debugName", 'tracked-global-ref-to');
  }
  compute(positional, named) {
    return super.compute(positional, {
      ...named,
      tracked: true
    });
  }
  ctx() {
    return getOwner(this);
  }
}

export { TrackedGlobalRefToHelper as default };
//# sourceMappingURL=tracked-global-ref-to.js.map
