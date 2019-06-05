import fs from 'fs';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import browsersync from 'rollup-plugin-browsersync';

// CSS PLUGINS
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sass from '@csstools/postcss-sass';
import mixins from 'postcss-mixins';
import pxtorem from 'postcss-pxtorem';
import easyImport from 'postcss-easy-import';
import hexrgba from 'postcss-hexrgba';
import presetEnv from 'postcss-preset-env';

// UTILITIES
import generateIcons from './util/favicon';
import generateSW from './util/sw-generator';
import basePlugins from './plugins.base';

const clientPlugins = (opts) => {
  if (opts === undefined) opts = {};
  const { DIR_OUTPUT, ROOT, CONFIG } = opts;
  const ENV = process.env.NODE_ENV;
  const DIR_CERT = path.join(os.homedir(), '.nodecert');
  const PORT = process.env.PORT || 1981;

  const base = basePlugins(ROOT);

  const plugins = [
    {
      // Clean dist folder before creating a new build
      name: 'diskCleaner',
      generateBundle() {
        if (fs.existsSync(DIR_OUTPUT)) {
          console.log(`Frosti: cleaning path: ${DIR_OUTPUT}`.white); // eslint-disable-line
          rimraf.sync(DIR_OUTPUT);
          generateIcons({ DIR_OUTPUT, ROOT, CONFIG });
          generateSW({ ROOT });
        }
      }
    },
    resolve({
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    postcss({
      config: false,
      extract: true,
      loaders: ['sass', 'stylus', 'less'],
      plugins: [
        sass(),
        mixins,
        pxtorem,
        easyImport,
        hexrgba,
        presetEnv({
          autoprefixer: {
            flexbox: 'no-2009'
          },
          stage: 3,
          features: {
            'nesting-rules': true
          }
        })
      ]
    }),
    ...base
  ];

  // DEV ONLY PLUGINS
  if (ENV === 'development' || process.env.DEV_SERVER) {
    plugins.push(
      browsersync({
        open: false,
        files: ['src/**/*', 'config/**/*'],
        https: {
          key: path.join(DIR_CERT, 'localhost-key.pem'),
          cert: path.join(DIR_CERT, 'localhost.pem')
        },
        // server: DIR_OUTPUT
        proxy: `https://localhost:${PORT}`
      })
    );
  }

  return plugins;
};

export default clientPlugins;
