import jasmineNMatchers from 'jasmine-n-matchers';

const testsContext = require.context('./test', true, /\.js$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('./src', true, /\.js$/);
srcContext.keys().forEach(srcContext);
