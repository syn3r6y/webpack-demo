const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join (__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const common = merge([
    {
        //entry accepts a path of an object of entries
        entry:{
            app: PATHS.app,
        },
        output:{
            path: PATHS.build,
            filename: '[name].js',
        },
        plugins:[
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
        ],
    },
    parts.loadCss(),
]);

function production(){
    return merge([
        common, 
        parts.lintJs({ include: PATHS.app }),
    ]);
}

function development(){
    return merge([
        common,
        {
            plugins: [
                new webpack.NamedModulesPlugin(),
            ],
        },
        parts.devServer({
            host: process.env.HOST,
            port: process.env.PORT,
        }),
        parts.lintJs({
            include: PATHS.app,
            options: {
                emitWarning: true, //emit warnings over errors to avoid crashing HMR on error
            },
        }),
    ]);  
};

module.exports = function(env){
    if(env === 'production'){
        return production();
    }

    return development();
};