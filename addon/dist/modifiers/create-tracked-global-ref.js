import RefModifier from './create-ref.js';
import { getOwner } from '@ember/application';

class CreateTrackedGlobalRefModifier extends RefModifier {
  isTracked() {
    return true;
  }
  ctx() {
    return getOwner(this);
  }
}

export { CreateTrackedGlobalRefModifier as default };
//# sourceMappingURL=create-tracked-global-ref.js.map
