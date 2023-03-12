const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		path: path.resolve(__dirname, '../src/index.tsx'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name]_[contenthash].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts)x?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},
			{
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
			{
        test: /\.json$/,
        loader: 'json-loader',
        type: 'json',
      },
			{
        test: /\.(png|jpg|gif|svg)$/i,
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
		extensions: ['.js', '.ts', '.tsx'],
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
		new CleanWebpackPlugin(),
  ],
};
