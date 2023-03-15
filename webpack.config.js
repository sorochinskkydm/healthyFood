let path = require('path');

module.exports = {
    mode: 'development', //режим работы webpack
    entry: './js/script.js',
    output: { //файл на выходе
        filename: 'bundle.js', //название файла
        path: __dirname + '/js' //куда попадет файл после создания
    },
    watch: true, //автоматически собирает измененные файлы
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            debug: true,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                    }
                }
            }
        ]
    }
};