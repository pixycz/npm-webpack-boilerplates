const common = require("./webpack.common");
const path = require("path");
const { merge } = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MockWebpackPlugin = require("mock-webpack-plugin");
const mockConfig = require("./api-mockup/config.js");

module.exports = merge(common, {

    mode: "development",    // the most important switch
    
    devtool: 'eval-source-map',     

    // Entry points specified in common

    // Output format specification
    output: {
        filename: "[name].bundle.js",
        // path: path.resolve(__dirname, "dist")
    },

    // webpack-dev-server config
    devServer: {
        host: "0.0.0.0",    // this will be replaced by your localhost IP, you can access from other devices on your LAN
        port: 8080,         // use any port you like
        hot: true,          // hot module replacement
        proxy: {
            '/api': 'http://0.0.0.0:5000'    // => MockWebpackPlugin
        }
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

        ],
    },


    // Plugins - process output files created by loaders

    plugins: [

        // use template as base HTML document
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),

        // extract CSS to a file
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),

        // setup mockup server
        new MockWebpackPlugin({
            config: mockConfig,
            port: 5000
        })
    ],


    // Final output processing

    optimization: {
        // nothing needed yet
    }

});