const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.cjs');

module.exports = require('webpack-merge').merge(common, {
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
							plugins: ['react-refresh/babel'],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
	devServer: {
		port: 3000,
		open: false,
		hot: 'only',
		historyApiFallback: true,
	},
});
