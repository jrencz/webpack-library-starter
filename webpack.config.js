var webpack = require('webpack');
var path = require('path');
var argv = require('yargs')
    .boolean('bundled')
    .argv;

const {
    main,
    dependencies,
    bundledDependencies,
} = require('./package.json');

const {
    env,
    bundled
} = argv;

const ext = '.js';
const srcDir = 'src';
const destDir = path.dirname(main);
const baseName = path.basename(main, ext);
const suffix = bundled ?
    '-bundled' :
    '';

const plugins = [];
let outputFile;

if (env === 'min') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
    outputFile = `${ baseName }${ suffix }.min${ ext }`;
} else {
    outputFile = `${ baseName }${ suffix }${ ext }`;
}

const externals = Object
    .keys(dependencies)
    .filter(bundled ?
        () => false :
        dependencyName => !bundledDependencies.includes(dependencyName)
    );

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
