const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.cjs');

module.exports = require('webpack-merge').merge(common, {
  mode: 'production',
  devtool: false,
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
  module: {
    rules: [
      {
        test: /\.less$/,
        include: /src/,
        exclude: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.module\.less$/,
        include: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: { exportLocalsConvention: 'camelCase' },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
      chunkFilename: 'style/[id].[contenthash].css',
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
        {
          module: 'react-router-dom',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/6.9.0/react-router-dom.production.min.js',
          global: 'ReactRouterDOM',
        },
      ],
    }),
  ],
});
