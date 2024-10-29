const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add this line at the beginning
  const fallback = config.resolve.fallback || {};

  config.resolve.fallback = {
    ...fallback,
    "process": require.resolve("process/browser"),
    "zlib": require.resolve("browserify-zlib"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util"),
    "buffer": require.resolve("buffer"),
    "asset": require.resolve("assert"),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  // This is to ensure the 'process/browser' module is properly resolved
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser'),
  };

  return config;
}
