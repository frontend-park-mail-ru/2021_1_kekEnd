const path = require('path');
const MiniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app.js',
    module: {
        rules: [
            {
                test: /\.(js)$/, use: 'babel-loader',
            },
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCss.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
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
    plugins: [
        new MiniCss({
            filename: 'style.css',
        }),
    ],
};
