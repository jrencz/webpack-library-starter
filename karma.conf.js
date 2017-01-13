const webpackConfig = require('./webpack.config');

const source = './src/**/*.js';
const suite = './test/**/*.spec.js';

module.exports = function (config) {
  const configuration = {
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'jasmine-matchers',
    ],

    // list of files/patterns to load in the browser
    files: [
      { pattern: source, watched: false },
      { pattern: suite, watched: false }
    ],

    // files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [source]: ['webpack', 'sourcemap'],
      [suite]: ['webpack', 'sourcemap']
    },

    webpack: Object.assign({}, {
      devtool: 'inline-source-map',
      module: Object.assign({}, webpackConfig.module, {
        preLoaders: [
          {
            test: /(\.js)$/,
            include: [/src/],
            exclude: [/dist/, /node_modules/],
            loader: 'babel-istanbul',
            query: {
              cacheDirectory: true,
            },
          },
          ...(webpackConfig.module.preLoaders || []),
        ],
      })
    }),

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: '.'},
        {type: 'text-summary'},
      ],
      // Watermarks define a boundaries between 3 classes of coverage: low,
      // medium and high:
      // [low-medium, medium-high], percentage
      // default: [50, 80]
      watermarks: {
        statements: [80, 90],
        branches: [80, 90],
        functions: [80, 90],
        lines: [80, 90],
      },
    },

    webpackServer: {
      // @see https://webpack.js.org/configuration/watch/#watchoptions
      watchOptions: {
        aggregateTimeout: 500,
      },
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'longest',
      'progress',
      'coverage',
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: true
  };

  if(process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
