const webpack = require('webpack');

exports.devServer = function({ host, port }){
    return{
        devServer:{
            //HTML5 history-based routing works
            historyApiFallback: true,

            //Don't refresh if HMR fails
            hotOnly: true,

            //Display only erros
            stats: 'errors-only',
            host,
            port,
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
        ],
    };
};

exports.lintJs = function({ include, exclude, options }){
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include,
                    exclude,
                    enforce: 'pre', //process first
                    loader: 'eslint-loader',
                    options,
                },
            ],
        },
    };
};

exports.loadCss = function({ include, exclude } = {}){
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ],
                },
            ],
        },
    };
};