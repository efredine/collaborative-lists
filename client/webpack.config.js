var path = require('path');
var webpack = require('webpack');
const ENV         = process.env.ENV || "development";

/**
 * In development environment include two entry points in the build.  The first one loads functionality to auto-reload using a web-socket.
 */
const getEntries = () => {
  switch(ENV){
    case 'production':
      return ['./src/index.jsx'];
    default:
      return [
        'webpack-dev-server/client?http://localhost:3000',
        './src/index.jsx'
      ];
  }
}

module.exports = {
  devtool: 'eval',
  entry: getEntries(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file"
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
