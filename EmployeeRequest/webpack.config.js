const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const bundleOutputDir = './dist';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        devtool: 'source-map',
        mode: isDevBuild ? 'development' : 'production',
        entry: { 'resourcemanager': './scripts/resourcemanager.js', 'main': './ClientApp/boot.ts' },
        module: {
            rules: [
                { test: /\.vue$/, loader: 'vue-loader', options: { loaders: {} } },
                {
                    test: /\.ts$/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }],
                    exclude: /node_modules/
                },
                { test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ },
                { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : [MiniCssExtractPlugin.loader, 'css-loader'] },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' }
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            },
            extensions: ['.ts', '.js', '.vue', '.json', '.woff']
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name]---[contenthash].js',
            chunkFilename: isDevBuild ? 'chunk[name].js' : 'chunk[name]---[contenthash].js',
            publicPath: isDevBuild ? '/dist/' : '/dist/',
            // Point sourcemap entries to original disk location
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: true
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
        ].concat(isDevBuild ? [] : [
            // new UglifyJsPlugin({ uglifyOptions: { output: { comments: false } } }),
            new MiniCssExtractPlugin({
                filename: '[name]---[contenthash].css',
                chunkFilename: 'chunk[name]---[contenthash].css'
            }),
            new OptimizeCssAssetsPlugin({})
        ]).concat([
            new HtmlWebpackPlugin({
                template: "./Views/Home/Template.cshtml",
                filename: path.join(__dirname, "/Views/Home/Index.cshtml"),
                inject: false,
            }),
            new ServiceWorkerWebpackPlugin({
                entry: path.join(__dirname, 'sw.js'),
                filename: "../service-worker.js",
                //includes: [path.join(__dirname, 'dist/**/*')],
                includes: ['/dist/**/*.*'],
                publicPath: '/',
                minimize: false,
            }),
            //new BundleAnalyzerPlugin({
            //    analyzerMode: "static",
            //}),
        ])
    }];
};
