const common = require('./webpack.common.cjs');

module.exports = require('webpack-merge').merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
