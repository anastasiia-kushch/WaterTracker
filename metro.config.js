const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const svgTransformer = require.resolve('react-native-svg-transformer');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: svgTransformer,
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
});
