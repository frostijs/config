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

  if (INPUT === undefined) {
    if (fs.pathExistsSync(`${ROOT}/src/Client.js`)) input = `${ROOT}/src/Client.js`;
    else if (fs.pathExistsSync(`${ROOT}/src/Client.jsx`)) input = `${ROOT}/src/Client.jsx`;
    else if (fs.pathExistsSync(`${ROOT}/src/render/Client.js`)) input = `${ROOT}/src/render/Client.js`;
    else if (fs.pathExistsSync(`${ROOT}/src/render/Client.jsx`)) input = `${ROOT}/src/render/Client.jsx`;
  }

  const ROLLUP = {
    input,
    output: {
      file: `${DIR_OUTPUT}app.js`,
      format: 'iife',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    plugins: clientPlugins({
      CONFIG,
      DIR_OUTPUT,
      ROOT,
      LIBRARY,
      CLEAN: false
    }),
    // We load React via cdn in HTML template to reduce bundle size and leverage browser caching
    external: ['react', 'react-dom']
  };

  if (INPUT) ROLLUP.input = INPUT;
  if (OUTPUT) ROLLUP.output = OUTPUT;
  if (CONTEXT) ROLLUP.context = CONTEXT;
  if (PLUGINS) ROLLUP.plugins.concat(PLUGINS);

  return ROLLUP;
};

export default rollup;
