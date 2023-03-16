const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.cjs');

module.exports = require('webpack-merge').merge(common, {
	mode: 'development',
	plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
	devServer: {
		port: 3000,
		open: false,
		historyApiFallback: true,
	},
});
