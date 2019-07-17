require.extensions['.css'] = () => {};
require.extensions['.scss'] = () => {};
require.extensions['.styl'] = () => {};

const babel = ({
  library, plugins, presets, root, targets
}) => {
  const LIBRARY = library !== undefined ? library.toLowerCase() : 'vanilla';
  const PLUGINS = plugins;
  const PRESETS = presets;
  const ROOT = root;
  const TARGETS = targets !== undefined
    ? targets
    : {
      node: '8',
      browsers: '> 5% in US'
    };

  const BABEL = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: TARGETS
        }
      ]
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      [
        'module-resolver',
        {
          root: [ROOT],
          alias: {
            '@src': './src',
            '@containers': './src/containers',
            '@components': './src/components',
            '@css': './src/css/',
            '@styles': './src/css/',
            '@config': './config',
            '@dist': './.dist',
            '@lib': './lib',
            '@public': './public',
            '@render': './src/render',
            '@test': './test'
          }
        }
      ]
    ]
  };

  if (LIBRARY === 'react') {
    BABEL.presets.push('@babel/preset-react');
  } else {
    BABEL.plugins.push([
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'dom', // default pragma is React.createElement
        pragmaFrag: 'DomFrag', // default is React.Fragment
        throwIfNamespace: false // defaults to true
      }
    ]);
  }

  if (PLUGINS) BABEL.plugins.concat(PLUGINS);
  if (PRESETS) BABEL.presets.concat(PRESETS);

  return BABEL;
};

export default babel;
