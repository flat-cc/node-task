const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  console.log('Production: ', env); // true
  return {
    target: 'node',
    entry: './src/index.ts',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    mode: env.mode === 'development' ? 'development' : 'production', // production,
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        net: false
      }
    },
    plugins: [
      new Dotenv({
        path: path.resolve(`.env.${env.mode}`),
        defaults: path.resolve('.env')
      }),
      new NodePolyfillPlugin()
    ],
    externals: [nodeExternals()]
  };
}