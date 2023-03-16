const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.cjs');

module.exports = require('webpack-merge').merge(common, {
	mode: 'production',
	optimization: {
		runtimeChunk: {
			name: 'runtime',
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					compress: {
						drop_console: true,
						drop_debugger: true,
					},
				},
			}),
			new CssMinimizerPlugin(),
		],
		splitChunks: {
			chunks: 'all',
			maxSize: 500 * 1000,
			cacheGroups: {
				// use HtmlWebpackExternalsPlugin
				// react: {
				//   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
				//   name: 'react',
				//   chunks: 'all',
				//   priority: 10,
				// },
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					priority: 5,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	plugins: [
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
		}),
		new MiniCssExtractPlugin({
			filename: 'style/[name].[contenthash].css',
			chunkFilename: 'style/[id].[contenthash].css',
		}),
		new HtmlWebpackTagsPlugin({
			tags: [
				{
					path: 'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
					external: {
						packageName: 'react',
						variableName: 'React',
					},
				},
				{
					path: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
					external: {
						packageName: 'react-dom',
						variableName: 'ReactDOM',
					},
				},
				{
					path: 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/6.9.0/react-router-dom.production.min.js',
					external: {
						packageName: 'react-router-dom',
						variableName: 'ReactRouterDOM',
					},
				},
			],
		}),
	],
});
