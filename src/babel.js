const babel = (ROOT, opts) => {
  if (opts === undefined) opts = {};

  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: '8',
            browsers: '> 5% in US'
          }
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'dom', // default pragma is React.createElement
          pragmaFrag: 'DomFrag', // default is React.Fragment
          throwIfNamespace: false // defaults to true
        }
      ],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      'transform-postcss',
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
            '@test': `${ROOT}test`
          }
        }
      ]
    ]
  };

  if (opts.plugins) config.plugins.concat(opts.plugins);
  if (opts.plesets) config.plesets.concat(opts.plesets);

  return config;
};

export default babel;
