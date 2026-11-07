'use strict';

const LOCAL_NAMES = new Set([
  'create-ref',
  'create-tracked-ref',
  'ref-to',
  'tracked-ref-to',
]);

const GLOBAL_NAMES = new Set([
  'create-global-ref',
  'create-tracked-global-ref',
  'global-ref-to',
  'tracked-global-ref-to',
]);

const ALL_KNOWN = new Set([...LOCAL_NAMES, ...GLOBAL_NAMES]);

// v5 fell back to the owner when bucket was undefined, which is what the
// global variants do in v6
const GLOBAL_EQUIVALENT = {
  'create-ref': 'create-global-ref',
  'create-tracked-ref': 'create-tracked-global-ref',
  'ref-to': 'global-ref-to',
  'tracked-ref-to': 'tracked-global-ref-to',
};

module.exports = function hbsTransform(env) {
  const { builders: b } = env.syntax;

  function transformNode(node) {
    const name = node.path.original;
    if (!ALL_KNOWN.has(name)) return;

    const bucketIndex = node.hash.pairs.findIndex((p) => p.key === 'bucket');

    if (bucketIndex !== -1) {
      const { value } = node.hash.pairs[bucketIndex];
      node.hash.pairs.splice(bucketIndex, 1);

      if (GLOBAL_NAMES.has(name)) {
        // v5 ignored bucket on global variants -> just drop it
        return;
      }
      if (value.type === 'UndefinedLiteral') {
        // bucket=undefined meant the owner -> switch to the global variant
        node.path = b.path(GLOBAL_EQUIVALENT[name]);
        return;
      }
      // bucket=someVar -> move to second positional arg
      node.params.push(value);
    } else if (LOCAL_NAMES.has(name) && node.params.length < 2) {
      // local variant with no context yet -> add this
      node.params.push(b.path('this'));
    }
    // global variants with no bucket: no change needed
  }

  return {
    ElementModifierStatement: transformNode,
    MustacheStatement: transformNode,
    SubExpression: transformNode,
  };
};
