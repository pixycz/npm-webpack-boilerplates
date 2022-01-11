// const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    // Entry points – we may use multiple sources to build from
    entry: {
        main: "./src/index.js",
        vendor: "./src/js-vendor/index.js",
    },


    // Loaders - handle source files first

    module: {
        rules: [
            // HTML loader
            {
                test: /\.html$/,
                use: ["html-loader"]
            },

        // JS loader/Babel to be here…

        ],

    },

};