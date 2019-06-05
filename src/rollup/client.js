import plugins from './plugins.client';

const rollup = (opts) => {
  const ROOT = opts.ROOT || opts.root;
  const CONFIG = opts.CONFIG || opts.config;
  const DIR_OUTPUT = `${ROOT}/.dist/`;

  if (opts === undefined) opts = {};

  const config = {
    input: 'src/Client.js',
    output: {
      file: `${DIR_OUTPUT}app.js`,
      format: 'iife',
      sourcemap: true
    },
    plugins: plugins({ DIR_OUTPUT, ROOT, CONFIG })
  };

  if (opts.input) config.input = opts.input;
  if (opts.output) config.output = opts.output;
  if (opts.context) config.context = opts.context;
  if (opts.plugins) config.plugins.concat(opts.plugins);

  return config;
};

export default rollup;
