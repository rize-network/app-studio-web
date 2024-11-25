const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.md$/, // look for .md files in component folder
        type: 'javascript/auto', // Tell webpack to interpret the result from examples-loader as JavaScript
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/requireInRuntime$/,
      'react-styleguidist/lib/loaders/utils/client/requireInRuntime'
    ),
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/evalInContext$/,
      'react-styleguidist/lib/loaders/utils/client/evalInContext'
    ),
  ],
  stats: {
    errorDetails: true,
  },
};

module.exports = {
  webpackConfig,
  title: 'App-Studio',
  usageMode: 'collapse',
  pagePerSection: true,
  components: 'src/components/**/*.tsx',
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/StyleGuideWrapper'),
  },
  sections: [
    {
      name: 'Basic',
      components: ['src/components/*/*.tsx'],
    },
    {
      name: 'Form',
      components: ['src/components/Form/*/*.tsx'],
    },
    {
      name: 'Layouts',
      components: ['src/components/Layout/*/*.tsx'],
    },
  ],
  theme: {
    color: {
      link: 'rgba(0, 0, 0, 1)',
      linkHover: 'rgba(0, 0, 0, 0.7)',
    },
    fontFamily: {
      base: '"Roboto"',
      link: 'rgba(0, 0, 0, 1)',
      linkHover: 'rgba(0, 0, 0, 0.7)',
    },
  },
  styles: {
    Logo: {
      logo: {
        color: 'rgba(0, 0, 0, 1)',
        fontWeight: 'bold',
        fontSize: '24px',
      },
    },
  },
  ignore: [
    '**/index.tsx',
    '**/__test__/**',
    '**/examples/**',
    'src/components/*.tsx',
    'src/components/**/*.view.tsx',
    'src/components/Layout/Input/**',
    'src/components/Label/**',
    'src/components/Layout/View/View.tsx',
    'src/components/Icon/**.tsx',
  ],
};
