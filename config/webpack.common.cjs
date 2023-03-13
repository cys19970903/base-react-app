const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
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
				test: /\.(ts)x?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},
			{
        test: /\.less$/,
        include: /src/,
        exclude: /\.module\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.module\.less$/,
        include: /src/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { exportLocalsConvention: 'camelCase' },
            },
          },
          'less-loader',
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
		extensions: ['.js', '.ts', '.tsx'],
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};