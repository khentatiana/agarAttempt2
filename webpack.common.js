const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new ManifestPlugin({
            fileName: 'manifest.json',
            stripSrc: true,
            publicPath: '/static/',
        }),
    ],
    output: {
        filename: '[hash].bundle.js',
        path: path.resolve(__dirname, 'static'),
    },
};
