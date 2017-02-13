const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                    test: /\.scss$/,
                    include,
                    exclude,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ],
                },
            ],
        },
    };
};

exports.extractCss = function({ include, exclude, use }) {
    return {
        module:{
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,
                    use: ExtractTextPlugin.extract({
                        use: use,
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [
            //Output extracted CSS to file
            new ExtractTextPlugin('[name].css'),
        ],
    };
};