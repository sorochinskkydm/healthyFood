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
    module: {}
};