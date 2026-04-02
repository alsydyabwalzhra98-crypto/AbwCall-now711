const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.watchFolders = [__dirname];

config.resolver = {
  ...config.resolver,
  blockList: [
    /\.local\/skills\/.*/,
    /\.git\/.*/,
    /node_modules\/.*\/node_modules\/.*/,
  ],
};

module.exports = config;
