const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
	devtool: isDev ? 'source-map' : false,
	entry: {
		main: path.resolve(__dirname, '../src/index.tsx'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[contenthash].js',
		clean: true,
	},
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
							presets: isDev ? ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] : [],
							plugins: isDev ? ['react-refresh/babel'] : [],
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
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader',
				type: 'json',
			},
			{
				test: /\.(png|jpg|gif|svg|webp)$/i,
				type: 'asset/resource',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'images/[name]_[contenthash].[ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name]_[contenthash].[ext]',
				},
			},
		],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src'),
		},
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	plugins: [
		new WebpackBar(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
		}),
	],
};
