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
          root: ['./'],
          alias: {
            '@src': `${ROOT}src`,
            '@containers': `${ROOT}src/containers`,
            '@components': `${ROOT}src/components`,
            '@css': `${ROOT}src/css/`,
            '@styles': `${ROOT}src/css/`,
            '@config': `${ROOT}config`,
            '@dist': `${ROOT}.dist`,
            '@lib': `${ROOT}lib`,
            '@public': `${ROOT}public`,
            '@render': `${ROOT}src/render`,
            '@test': `${ROOT}test`
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
