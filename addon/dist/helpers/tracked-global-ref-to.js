import RefToHelper from './ref-to.js';

class TrackedGlobalRefToHelper extends RefToHelper {
  compute([name], named) {
    return super.compute([name], {
      ...named,
      tracked: true
    });
  }
}

export { TrackedGlobalRefToHelper as default };
//# sourceMappingURL=tracked-global-ref-to.js.map
