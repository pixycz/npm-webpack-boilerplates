const path = require('path');

// Using https://github.com/MarxJiao/mock-webpack-plugin

// Mock up API endpoints here
// use 'data' to enter response object inline
// or 'path' to return a file

// For inline data, this syntax can be used: http://mockjs.com/examples.html


const config = {

/*
    '/api/json/data': {
        data: {
            result: 'mocked'
        }
    },

    '/api/json/path': {
        path: path.join(__dirname, './json/result.json')
    },
*/

    '/api/testdata': {
        data: {
            'repeated|1-10': '*'        // returns randomly 1 to 10 asterisks
        }
    },

    '/api/testfile': {
        path: path.join(__dirname, './testfile.json')
    }
};

module.exports = config;