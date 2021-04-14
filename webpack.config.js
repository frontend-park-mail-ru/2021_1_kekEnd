const path = require('path');

module.exports = {
    entry: './src/app.js',
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
    },
    target: 'node',
    mode: 'development',
    devServer: {
        publicPath: '/',
        contentBase: './src',
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
};
