import postcss from 'rollup-plugin-postcss';
import basePlugins from './plugins.base';

const clientPlugins = (opts) => {
  if (opts === undefined) opts = {};

  const { ROOT } = opts;

  const base = basePlugins(ROOT);

  const plugins = [
    postcss({
      extract: false
    }),
    ...base
  ];

  return plugins;
};

export default clientPlugins;
