import { _ as _defineProperty } from '../ref-BUxaMTFf.js';
import RefToHelper from './ref-to.js';

class TrackedRefToHelper extends RefToHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "debugName", 'tracked-ref-to');
  }
  compute(positional, named) {
    return super.compute(positional, {
      ...named,
      tracked: true
    });
  }
}

export { TrackedRefToHelper as default };
//# sourceMappingURL=tracked-ref-to.js.map
