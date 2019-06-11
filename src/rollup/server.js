import fs from 'fs-extra';
import clientPlugins from './plugins.client';

const rollup = ({
  // REQUIRED
  config,
  root,
  // OPTIONAL
  library,
  input,
  output,
  context,
  plugins
}) => {
  const CONFIG = config;
  const INPUT = input;
  const LIBRARY = library !== undefined ? library.toLowerCase() : 'vanilla';
  const OUTPUT = output;
  const CONTEXT = context;
  const PLUGINS = plugins;
  const ROOT = root;

  const DIR_OUTPUT = `${ROOT}/.dist/`;

  if (input === undefined) {
    if (fs.pathExistsSync(`${ROOT}/src/Server.js`)) input = `${ROOT}/src/Server.js`;
    else if (fs.pathExistsSync(`${ROOT}/src/Server.jsx`)) input = `${ROOT}/src/Server.jsx`;
    else if (fs.pathExistsSync(`${ROOT}/src/Express.js`)) input = `${ROOT}/src/Express.js`;
    else if (fs.pathExistsSync(`${ROOT}/src/Express.jsx`)) input = `${ROOT}/src/Express.jsx`;
  }

  const ROLLUP = {
    input,
    output: {
      file: `${DIR_OUTPUT}ssr.js`,
      format: 'cjs',
      globals: {
        colors: 'colors'
      }
    },
    context: 'window',
    external: [
      'chokidar',
      'colors',
      'compression',
      'cors',
      'express',
      'spdy',
      'fs',
      'os',
      'path',
      'redirect-https',
      'react-helmet'
    ],
    plugins: clientPlugins({
      CONFIG,
      DIR_OUTPUT,
      ROOT,
      LIBRARY,
      CLEAN: false
    })
  };

  if (INPUT) ROLLUP.input = INPUT;
  if (OUTPUT) ROLLUP.output = OUTPUT;
  if (CONTEXT) ROLLUP.context = CONTEXT;
  if (PLUGINS) ROLLUP.plugins.concat(PLUGINS);

  return ROLLUP;
};

export default rollup;
