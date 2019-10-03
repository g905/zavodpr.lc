const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin= require('copy-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    optimization: {
      minimizer: [
          new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true
          }),
          new OptimizeCSSAssetsPlugin({})
      ],
        runtimeChunk: {name: 'common'},
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /\.jsx?$/,
                    chunks: 'all',
                    minChunks: 2,
                    name: 'common',
                    enforce: true,
                },
            },
        },

    },
    entry: [
        './src/js/index.js',
        './src/sass/style.sass'
    ],
    output: {
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                exclude: "/node_modules/",
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/sass'),
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        },
                    },
                        {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: ['ie >= 8', 'last 4 versions']
                                })
                            ],
                            sourceMap: true
                        }

                    },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,

                            }
                        }
                    ]
                })
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.bundle.css',
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: './src/fonts',
            to: './fonts'
        },
            {
                from: './src/img/favicon',
                to: './favicon'
            },
            {
                from: './src/img',
                to: './img'
            }
        ]),
        new ImageminPlugin({
            pngquant: {
                quality: '50-50'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pug/views/index.pug'
        }),
        /*new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './src/pug/views/main.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/pug/views/about.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'privileges.html',
            template: './src/pug/views/privileges.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'menu.html',
            template: './src/pug/views/menu.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'vacancies.html',
            template: './src/pug/views/vacancies.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'gallery.html',
            template: './src/pug/views/gallery.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'album.html',
            template: './src/pug/views/album.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'afisha.html',
            template: './src/pug/views/page_afisha.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'news.html',
            template: './src/pug/views/news.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'news-detail.html',
            template: './src/pug/views/news_detail.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'contacts.html',
            template: './src/pug/views/contacts.pug'
        }),*/
    ]
};