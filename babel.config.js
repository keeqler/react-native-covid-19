module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // prettier-ignore
    plugins: [
      ['babel-plugin-root-import', { rootPathSuffix: 'src' }]
    ]
  };
};
