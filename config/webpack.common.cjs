const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		path: path.resolve(__dirname, '../src/index.tsx'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name][contenthash].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts)x?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},
		],
	},
	resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
		extensions: ['.js', '.ts', '.tsx'],
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
		new CleanWebpackPlugin(),
  ],
};
