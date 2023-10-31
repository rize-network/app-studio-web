module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: ['react-require'],
};
