import plugins from './plugins.client';

const rollup = (opts) => {
  const ROOT = opts.ROOT || opts.root;
  const DIR_OUTPUT = `${ROOT}/.dist/`;

  if (opts === undefined) opts = {};

  const config = {
    input: 'src/Server.js',
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
      'redirect-https'
    ],
    plugins
  };

  if (opts.input) config.input = opts.input;
  if (opts.output) config.output = opts.output;
  if (opts.context) config.context = opts.context;
  if (opts.plugins) config.plugins.concat(opts.plugins);

  return config;
};

export default rollup;
