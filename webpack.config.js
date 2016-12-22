var webpack = require('webpack');
var path = require('path');
var argv = require('yargs').argv;

const {
    main,
    dependencies,
    bundledDependencies,
} = require('./package.json');

const {
    env,
} = argv;

const ext = '.js';
const srcDir = 'src';
const destDir = path.dirname(main);
const baseName = path.basename(main, ext);

const plugins = [];
let outputFile;

if (env === 'min') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
    outputFile = `${ baseName }.min${ ext }`;
} else {
    outputFile = `${ baseName }${ ext }`;
}

const externals = Object
    .keys(dependencies)
    .filter(dependencyName => !bundledDependencies.includes(dependencyName));

var config = {
    entry: path.join(__dirname, `${ srcDir }/index${ ext }`),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, destDir),
        filename: outputFile,
        library: baseName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.js)$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        root: path.resolve(`./${ srcDir }`),
        extensions: ['', ext]
    },
    plugins,
    externals: externals.reduce((externals, dependencyName) => Object.assign(externals, {
        [dependencyName]: dependencyName,
    }), {}),
};

module.exports = config;
