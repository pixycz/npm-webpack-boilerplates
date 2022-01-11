const path = require("path");
const { merge } = require("webpack-merge");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {

    mode: "production",     // the most important switch

    // Entry points specified in common


    // Output format specification

    output: {
        filename: "[name].[contenthash].bundle.js",     // hash built JS files
        path: path.resolve(__dirname, "dist")
    },


    // Loaders - handle source files first (may override common)

    module: {
        rules: [
            // Process SCSS (Sass)
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,  // 3. Extract css into files
                    /*
                    "style-loader",               // 3. Inject style tag into DOM (variant)
                    */
                    "css-loader",                 // 2. CSS => commonjs (transpile)
                    "sass-loader"                 // 1. Sass => CSS (compile)
                ]
            },

            // File loader – NOT USED to keep the default behavior (hashed assets in a flat structure)
            // (otherwise, it's complicated to handle assets linked directly in the HTML template)
            // 
            // {
            //     test: /\.(svg|png|jpg|gif)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             name: "[name].[ext]",     // hash assets
            //             outputPath: "img/",
            //         }
            //     }
            // },

        ],
    },


    // Plugins - process output files created by loaders

    plugins: [

        // extract CSS to a file
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"     // hash built CSS files
        }),
        // clean output folder on build (like rimraf)
        new CleanWebpackPlugin()
    ],


    // Final output processing

    optimization: {
        minimizer: [

            // minify CSS
            new CssMinimizerPlugin(),

            // minify/uglify JS
            new TerserPlugin(),

            // create output HTML (placed here to specify minimizers)
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: path.resolve(__dirname, "dist", "index.html"),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },

});