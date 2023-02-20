const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');


module.exports = (env) => {
  const isDEV = env.mode === 'development'
  console.log('Production: ', env); // true
  return {
    target: 'node',
    entry: './src/index.ts',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    mode: isDEV ? 'development' : 'production', // production,
    devtool: isDEV ? 'eval-cheap-source-map' : 'source-map',
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