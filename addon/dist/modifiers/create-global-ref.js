import { _ as _defineProperty } from '../ref-BUxaMTFf.js';
import RefModifier from './create-ref.js';
import { getOwner } from '@ember/application';

class CreateGlobalRefModifier extends RefModifier {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "debugName", 'create-global-ref');
  }
  ctx() {
    return getOwner(this);
  }
}

export { CreateGlobalRefModifier as default };
//# sourceMappingURL=create-global-ref.js.map
