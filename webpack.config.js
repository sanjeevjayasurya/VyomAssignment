const path = require('path')
const webpack = require('webpack')

// module.exports = {
//     entry: './main.js',
//     output: { path: __dirname + '/static', filename: '/bundle.js' },
//     module: {
//         rules: [
//             {
//                 test: /.jsx?$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/,
//                 presets: ['es2015', 'react']
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             }
//         ]
//     },
// };


module.exports = {
    mode: "development",
    entry: {
        main: './main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('./static')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' }
                ],
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
}