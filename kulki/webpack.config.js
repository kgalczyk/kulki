const path = require('path');
module.exports = {
    entry: {
        board: './ts/Board.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'balls.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    watch: true
};