/* eslint-disable global-require */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
// import { eslint } from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import minify from 'rollup-plugin-babel-minify';

const ENV = process.env.NODE_ENV;

const basePlugins = ({ LIBRARY }) => {
  let common = commonjs({
    include: ['node_modules/**'],
    extensions: ['.js']
  });

  if (LIBRARY === 'react') {
    common = commonjs({
      include: ['node_modules/**'],
      extensions: ['.js', '.jsx'],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement',
          'Fragment'
        ],
        'node_modules/react-router-dom/index.js': [
          'BrowserRouter',
          'HashRouter',
          'Link',
          'NavLink'
        ],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react-is/index.js': ['isValidElementType']
      }
    });
  }

  const plugins = [
    // eslint({
    //   exclude: ['node_modules/**/*', '**/*.css', '**/*.json', '**/*.scss', '**/*.styl']
    // }),
    babel({
      exclude: 'node_modules/**'
    }),
    common,
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
