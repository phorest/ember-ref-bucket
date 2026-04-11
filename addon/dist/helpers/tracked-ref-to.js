import RefToHelper from './ref-to.js';

class TrackedRefToHelper extends RefToHelper {
  compute(positional, named) {
    return super.compute(positional, {
      ...named,
      tracked: true
    });
  }
}

export { TrackedRefToHelper as default };
//# sourceMappingURL=tracked-ref-to.js.map
