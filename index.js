/*require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3'],
  plugins:["transform-strict-mode", 
    "transform-async-to-generator",
    "syntax-async-functions"
  ]]
});*/
require('babel-core/register');
//require('babel-polyfill');
//import 'babel-polyfill';
require("./src/app.js");
