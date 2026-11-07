import { _ as _defineProperty } from '../ref-BUxaMTFf.js';
import RefToHelper from './ref-to.js';
import { getOwner } from '@ember/application';

class GlobalRefToHelper extends RefToHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "debugName", 'global-ref-to');
  }
  ctx() {
    return getOwner(this);
  }
}

export { GlobalRefToHelper as default };
//# sourceMappingURL=global-ref-to.js.map
