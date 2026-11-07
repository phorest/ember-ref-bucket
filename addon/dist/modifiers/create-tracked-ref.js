import { _ as _defineProperty } from '../ref-BUxaMTFf.js';
import RefModifier from './create-ref.js';

class CreateTrackedRefModifier extends RefModifier {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "debugName", 'create-tracked-ref');
  }
  isTracked() {
    return true;
  }
}

export { CreateTrackedRefModifier as default };
//# sourceMappingURL=create-tracked-ref.js.map
