import { _ as _defineProperty } from '../ref-BUxaMTFf.js';
import RefModifier from './create-ref.js';
import { getOwner } from '@ember/application';

class CreateTrackedGlobalRefModifier extends RefModifier {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "debugName", 'create-tracked-global-ref');
  }
  isTracked() {
    return true;
  }
  ctx() {
    return getOwner(this);
  }
}

export { CreateTrackedGlobalRefModifier as default };
//# sourceMappingURL=create-tracked-global-ref.js.map
