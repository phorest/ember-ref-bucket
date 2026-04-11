import { registerDestructor } from '@ember/destroyable';
import { c as cleanGlobalRef } from '../ref-BUxaMTFf.js';

function initialize(appInstance) {
  registerDestructor(appInstance, () => {
    cleanGlobalRef();
  });
}
var globalRefCleanup = {
  initialize
};

export { globalRefCleanup as default, initialize };
//# sourceMappingURL=global-ref-cleanup.js.map
