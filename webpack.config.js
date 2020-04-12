// webpack.config.js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        entry: __dirname + '/src/index.js'
    },
    output: {
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [new CompressionPlugin()],
}