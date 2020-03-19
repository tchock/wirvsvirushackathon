module.exports = () => ({
  sourceMaps: 'both',
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 8,
        },
      },
    ],
  ],
  plugins: [
    'source-map-support',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-modules-commonjs',
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.graphql'],
      },
    ],
  ],
});
