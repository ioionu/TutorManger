// Karma configuration
// Generated on Tue Sep 15 2015 17:35:53 GMT+1000 (AEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      '../public/javascripts/angular.js',
      '../public/javascripts/angular-route.js',
      '../public/javascripts/angular-resource.js',
      '../public/javascripts/angular-messages.js',
      '../public/javascripts/stripe-angular.js',
      '../public/javascripts/jquery.js',
      '../public/jquery-ui-1.11.4.custom/jquery-ui.js',
      '../public/javascripts/jquery-ui-sliderAccess.js',
      '../public/javascripts/jquery-ui-timepicker-addon.js',
      '../public/javascripts/foundation.js',
      '../public/javascripts/foundation.alert.js',
      '../public/javascripts/foundation.joyride.js',
      '../public/javascripts/angular-local-storage.js',
      '../public/javascripts/card.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../client/client.js',
      '../client/tm-service.js',
      '../client/tm-ctrl.js',
      '../client/tm-filters.js',
      'https://js.stripe.com/v2/',
      'controllerSpec.js',
      'resourceSpec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
          outputFile: '/tmp/unit.xml',
          suite: 'unit'
        },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
