const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = (devMode, directories) => {
  return {
    output: {
      path: devMode ? __dirname + directories.dev + 'js/' : __dirname + directories.public + 'js/',
      filename: 'main.js',
    },
    devtool: devMode ? 'source-map' : '',
    mode: devMode ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env']
          }
        }
      ]
    },
    plugins: [],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i,
          sourceMap: true,
          extractComments: true
        })
      ],
    },
  };
};

module.exports = webpackConfig;
