const common = require('./webpack.common.cjs');

module.exports = require('webpack-merge').merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
});
