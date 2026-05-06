module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@context': './src/context',
            '@styles': './src/styles',
            '@utils': './src/utils',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};
