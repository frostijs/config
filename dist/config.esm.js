import fs$2 from"fs-extra";import os from"os";import path from"path";import browsersync from"rollup-plugin-browsersync";import postcss from"rollup-plugin-postcss";import replace from"rollup-plugin-replace";import resolve from"rollup-plugin-node-resolve";import sass from"@csstools/postcss-sass";import mixins from"postcss-mixins";import pxtorem from"postcss-pxtorem";import easyImport from"postcss-easy-import";import hexrgba from"postcss-hexrgba";import presetEnv from"postcss-preset-env";import favicons from"favicons";import fs$1 from"fs";import babel$1 from"rollup-plugin-babel";import commonjs from"rollup-plugin-commonjs";import json from"rollup-plugin-json";import minify from"rollup-plugin-babel-minify";const babel=({library:a,plugins:b,presets:c,root:d,targets:e})=>{const f=void 0===a?"vanilla":a.toLowerCase(),g=b,h=c,i=d,j=void 0===e?{node:"8",browsers:"> 5% in US"}:e,k={presets:[["@babel/preset-env",{targets:j}]],plugins:["@babel/plugin-proposal-object-rest-spread","@babel/plugin-syntax-dynamic-import","transform-postcss",["module-resolver",{root:["./"],alias:{"@src":`${i}src`,"@containers":`${i}src/containers`,"@components":`${i}src/components`,"@css":`${i}src/css/`,"@styles":`${i}src/css/`,"@config":`${i}config`,"@dist":`${i}.dist`,"@lib":`${i}lib`,"@public":`${i}public`,"@test":`${i}test`}}]]};return"react"===f?k.presets.push("@babel/preset-react"):k.plugins.push(["@babel/plugin-transform-react-jsx",{pragma:"dom",// default pragma is React.createElement
pragmaFrag:"DomFrag",// default is React.Fragment
throwIfNamespace:!1// defaults to true
}]),g&&k.plugins.concat(g),h&&k.presets.concat(h),k},favicon=({DIR_OUTPUT:a,ROOT:b,CONFIG:c})=>{const d={path:"/icons/",// Path for overriding default icons path. `string`
appName:c.appName,// Your application's name. `string`
appShortName:c.appShortName,// Your application's short_name. `string`. Optional. If not set, appName will be used
appDescription:c.appDescription,// Your application's description. `string`
lang:c.lang,// Primary language for name and short_name
background:"#fff",// Background colour for flattened icons. `string`
theme_color:"#fff",// Theme color user for example in Android's task switcher. `string`
appleStatusBarStyle:"black-translucent",// Style for Apple status bar: "black-translucent", "default", "black". `string`
display:"standalone",// Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
orientation:"any",// Default orientation: "any", "natural", "portrait" or "landscape". `string`
scope:"/",// set of URLs that the browser considers within your app
start_url:"/",// Start URL when launching the application from a device. `string`
version:"1.0",// Your application's version string. `string`
logging:!1,// Print logs to console? `boolean`
pixel_art:!1,// Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
loadManifestWithCredentials:!1,// Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
icons:{// Platform Options:
// - offset - offset in percentage
// - background:
//   * false - use default
//   * true - force use default, e.g. set background for Android icons
//   * color - set background for the specified icons
//   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
//   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
//   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
//
android:!0,// Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
appleIcon:!0,// Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
appleStartup:!0,// Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
coast:!0,// Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
favicons:!0,// Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
firefox:!0,// Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
windows:!0,// Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
yandex:!0// Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
}},e=`${a}/icons/`;favicons(`${b}public/icon.png`,d,(b,c)=>b?void console.log(b.message):void(!fs$1.existsSync(a)&&fs$1.mkdirSync(a),fs$1.unlink(e,()=>{fs$1.existsSync(e)||fs$1.mkdirSync(e),c.images.map(a=>{a.name&&fs$1.writeFile(`${e}${a.name}`,a.contents,b=>!b||(console.log("COULD NOT SAVE",`${e}${a.name}`,b),!1))}),c.files.map(a=>{a.name&&fs$1.writeFile(`${e}${a.name}`,a.contents,b=>!b||(console.log("COULD NOT SAVE",`${e}${a.name}`,b),!1))}),c.html.map(a=>{a.name&&fs$1.writeFile(`${e}${a.name}`,a.contents,b=>!b||(console.log("COULD NOT SAVE",`${e}${a.name}`,b),!1))})})))},fs=require("fs"),ENABLE_SW="production"===process.env.NODE_ENV||process.env.ENABLE_SW,generateSW=({ROOT:a})=>{const b=require(`${a}package.json`);// eslint-disable-line
if(ENABLE_SW){const c=`${a}.dist/service-worker.js`;fs.readFile(`${a}public/service-worker.js`,"utf8",(a,d)=>{if(a)"ENOENT"!==a.code&&console.log(a);else{let a=d,e=`${b.name}-${b.version}`;"production"!==process.env.NODE_ENV&&(e=`nocache-${Date.now()}`),console.log(`Frosti: Generated new sw with revision ${e}`),a=d.split("__CACHE_TAG__").join(e),fs.writeFile(c,a,"utf8",a=>a?console.log(a):console.log(`Frosti: Updated service worker in ${c}`))}})}},ENV=process.env.NODE_ENV,basePlugins=({LIBRARY:a})=>{let b=commonjs({include:["node_modules/**"],extensions:[".js"]});"react"===a&&(b=commonjs({include:["node_modules/**"],extensions:[".js",".jsx"],namedExports:{"node_modules/react/index.js":["Children","Component","PropTypes","createElement","Fragment"],"node_modules/react-router-dom/index.js":["BrowserRouter","HashRouter","Link","NavLink"],"node_modules/react-dom/index.js":["render"],"node_modules/react-is/index.js":["isValidElementType"]}}));const c=[// eslint({
//   exclude: ['node_modules/**/*', '**/*.css', '**/*.json', '**/*.scss', '**/*.styl']
// }),
babel$1({exclude:"node_modules/**"}),b,json({compact:!0,extensions:[".json"],preferConst:!1})];// PROD ONLY PLUGINS
return"production"===ENV&&c.push(minify()),c},clientPlugins=({CONFIG:a,DIR_OUTPUT:b,ROOT:c,LIBRARY:d,CLEAN:e})=>{const f=process.env.NODE_ENV,g=path.join(os.homedir(),".nodecert"),h=process.env.PORT||1981,i=basePlugins({LIBRARY:d}),j=[{// Clean dist folder before creating a new build
name:"diskCleaner",generateBundle(){fs$2.existsSync(b)&&(e&&(console.log("CLEAN",e),console.log(`Frosti: cleaning path: ${b}`.white),fs$2.removeSync(b)),favicon({DIR_OUTPUT:b,ROOT:c,CONFIG:a}),generateSW({ROOT:c}))}},resolve({browser:!0}),replace({"process.env.NODE_ENV":JSON.stringify(f)}),postcss({config:!1,extract:!0,loaders:["sass","stylus","less"],plugins:[sass(),mixins,pxtorem,easyImport,hexrgba,presetEnv({autoprefixer:{flexbox:"no-2009"},stage:3,features:{"nesting-rules":!0}})]}),...i];return process.env.DEV_SERVER&&j.push(browsersync({open:!1,files:["src/**/*","config/**/*"],https:{key:path.join(g,"localhost-key.pem"),cert:path.join(g,"localhost.pem")},// server: DIR_OUTPUT
proxy:`https://localhost:${h}`})),j},rollup=({// REQUIRED
config:a,root:b,// OPTIONAL
library:c,input:d,output:e,context:f,plugins:g})=>{const h=d,i=void 0===c?"vanilla":c.toLowerCase(),j=e,k=f,l=g,m=b,n=`${m}/.dist/`;void 0===d&&(fs$2.pathExistsSync(`${m}/src/Client.js`)?d=`${m}/src/Client.js`:fs$2.pathExistsSync(`${m}/src/Client.jsx`)&&(d=`${m}/src/Client.jsx`));const o={input:d,output:{file:`${n}app.js`,format:"iife",sourcemap:!0,globals:{react:"React","react-dom":"ReactDOM"}},plugins:clientPlugins({CONFIG:a,DIR_OUTPUT:n,ROOT:m,LIBRARY:i,CLEAN:!1}),external:["react","react-dom"]};return h&&(o.input=h),j&&(o.output=j),k&&(o.context=k),l&&o.plugins.concat(l),o},rollup$1=({// REQUIRED
config:a,root:b,// OPTIONAL
library:c,input:d,output:e,context:f,plugins:g})=>{const h=d,i=void 0===c?"vanilla":c.toLowerCase(),j=e,k=f,l=g,m=b,n=`${m}/.dist/`;void 0===d&&(fs$2.pathExistsSync(`${m}/src/Server.js`)?d=`${m}/src/Server.js`:fs$2.pathExistsSync(`${m}/src/Server.jsx`)?d=`${m}/src/Server.jsx`:fs$2.pathExistsSync(`${m}/src/Express.js`)?d=`${m}/src/Express.js`:fs$2.pathExistsSync(`${m}/src/Express.jsx`)&&(d=`${m}/src/Express.jsx`));const o={input:d,output:{file:`${n}ssr.js`,format:"cjs",globals:{colors:"colors"}},context:"window",external:["chokidar","colors","compression","cors","express","spdy","fs","os","path","redirect-https","react-helmet"],plugins:clientPlugins({CONFIG:a,DIR_OUTPUT:n,ROOT:m,LIBRARY:i,CLEAN:!1})};return h&&(o.input=h),j&&(o.output=j),k&&(o.context=k),l&&o.plugins.concat(l),o};/* eslint-disable max-len, no-console */var index={client:rollup,server:rollup$1};export{babel,index as rollup};
