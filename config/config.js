let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  let config = require('./config.json');
  let environmentConfig = config[env];

  Object.keys(environmentConfig).forEach((key) => {
    process.env[key] = environmentConfig[key];
  });
}

module.exports.env = env;
