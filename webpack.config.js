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
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                  }
            }
        ]
    },
    plugins: [new CompressionPlugin()],
}