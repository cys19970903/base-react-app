const common = require('./webpack.common.cjs');

module.exports = require('webpack-merge').merge(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
});
