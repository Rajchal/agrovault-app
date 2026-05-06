const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@': './src',
  '@components': './src/components',
  '@screens': './src/screens',
  '@context': './src/context',
  '@styles': './src/styles',
  '@utils': './src/utils',
  '@types': './src/types',
};

module.exports = config;
