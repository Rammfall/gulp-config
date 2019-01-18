const path = require('path');
const outputDir = path.resolve(__dirname, 'build');
const env = process.env.NODE_ENV || 'development';

module.exports = {
    mode: env,
    entry:["@babel/polyfill", path.resolve(__dirname, 'dev/js')],
    output: {
        path: outputDir,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    }
};