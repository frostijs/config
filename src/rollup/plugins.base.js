/* eslint-disable global-require */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import minify from 'rollup-plugin-babel-minify';

const ENV = process.env.NODE_ENV;

const basePlugins = () => {
  const plugins = [
    eslint({
      exclude: [
        'node_modules/**/*',
        '/Confidential/Sites/frosti/packages/**/*',
        '**/*.css',
        '**/*.json',
        '**/*.scss',
        '**/*.styl'
      ]
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: ['node_modules/**'],
      extensions: ['.js']
    }),
    json({
      compact: true,
      extensions: ['.json'],
      preferConst: false
    })
  ];

  // PROD ONLY PLUGINS
  if (ENV === 'production') {
    plugins.push(minify());
  }

  return plugins;
};

export default basePlugins;
