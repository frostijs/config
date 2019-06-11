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
    builtins: true,
    dependencies: true,
    packagePath: path.resolve('./package.json'),
    peerDependencies: true
  }),
  minify()
];

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/config.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/config.cjs.js',
        format: 'cjs'
      }
    ],
    external: ['fs', 'os', 'path'],
    plugins
  }
];
