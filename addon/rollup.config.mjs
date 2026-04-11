import babel from '@rollup/plugin-babel';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  output: addon.output(),

  plugins: [
    // Public modules — what consumers are allowed to import from this addon.
    addon.publicEntrypoints([
      'index.js',
      'modifiers/**/*.js',
      'helpers/**/*.js',
      'instance-initializers/**/*.js',
    ]),

    // App-tree re-exports — generates the shim files that ember-cli expects
    // under the app namespace (replaces the old addon/app/ directory).
    addon.appReexports([
      'modifiers/**/*.js',
      'helpers/**/*.js',
      'instance-initializers/**/*.js',
    ]),

    addon.dependencies(),

    babel({
      babelHelpers: 'bundled',
    }),

    addon.hbs(),
    addon.keepAssets(['**/*.css']),
    addon.clean(),
  ],
};
