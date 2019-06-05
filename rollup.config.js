import path from 'path';
import { eslint } from 'rollup-plugin-eslint';
import minify from 'rollup-plugin-babel-minify';
import autoExternal from 'rollup-plugin-auto-external';
import resolve from 'rollup-plugin-node-resolve';

const plugins = [
  eslint({
    exclude: ['**/*.css', '**/*.json', '**/*.scss', '**/*.styl']
  }),
  resolve(),
  autoExternal({
    builtins: false,
    dependencies: true,
    packagePath: path.resolve('./package.json'),
    peerDependencies: true
  }),
  minify()
];

const external = [
  'fs',
  'os',
  'path',
  'rimraf',
  'favicons',
  'rollup-plugin-browsersync',
  'rollup-plugin-postcss',
  'rollup-plugin-replace',
  'rollup-plugin-node-resolve',
  'rollup-plugin-babel',
  'rollup-plugin-commonjs',
  'rollup-plugin-eslint',
  'rollup-plugin-json',
  'rollup-plugin-babel-minify'
];

export default [
  {
    input: {
      index: 'src/index.js'
    },
    output: [
      {
        dir: 'dist/esm',
        format: 'esm'
      },
      {
        dir: 'dist/cjs',
        format: 'cjs'
      }
    ],
    external,
    plugins
  }
];
