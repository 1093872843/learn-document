const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const env = require('dotenv').config({ path: './.env.prod' }).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new ESLintPlugin({
      extensions: ['json', 'js', 'vue'],
      exclude: '/node_modules/',
      // fix: true, // 自动修复问题
    }),
    new webpack.DefinePlugin(envKeys),
  ],
});
