const path = require('path');
const { ProvidePlugin } = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VERSION = require("./src/version");

module.exports = {
  entry: './src/index.ts',
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "url": false,
    },
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[chunkhash].js',
    filename: "index.js"
  },
  devtool: 'source-map',
  devServer: {
    port: 8000,
    hot: true,
    static: './dist',
    client: {
      overlay: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "browsers": "Chrome >= 49, Firefox >= 45, Edge >= 13, Safari >= 10, iOS >= 10, Android >= 79"
                  }
                }
              ],
              "@babel/preset-typescript"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        exclude: /node_modules[\\/](?!@bide)/,
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset',
        generator: {
            filename: 'assets/[hash][ext][query]'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { context: './src/static', from: './', to: './', globOptions: { ignore: ['**/.DS_Store'] } },
        { from: './src/monaco-faust/primitives.lib', to: './' },
        { from: './node_modules/@grame/faustwasm/libfaust-wasm/libfaust-wasm.*', to: './faustwasm/[name][ext]' },
        { from: './node_modules/@shren/faust-ui/dist/index.*', to: './faust-ui/[name][ext]' }
      ]
    }),
    new MonacoWebpackPlugin({
      output: 'js',
      languages: []
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      cacheId: VERSION + new Date().getTime(),
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 16 * 1024 * 1024,
    })
  ]
};
