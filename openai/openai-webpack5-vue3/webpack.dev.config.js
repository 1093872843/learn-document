const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [new webpack.DefinePlugin(envKeys)],
});
