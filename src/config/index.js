let config = require('./config');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
config.env=env;
if (fs.existsSync(`${__dirname}/config.${env}.json`)) {
  const configForEnv = require(`${__dirname}/config.${env}.json`);
  config = Object.assign({}, config, configForEnv);
}

module.exports = config;
