const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        activity: path.join(__dirname, "src", "demo.js"),
    },
    output: {
        filename: "main.js",
        path: path.join(__dirname, "demo"),
    },
    resolve: {
        extensions: [".jsx", ".js", ".tsx", ".ts"],
    },
    devServer: {
        contentBase: path.join(__dirname, "demo")
    },
    module: {
        rules: [
            { test: /.tsx?$/, loader: "awesome-typescript-loader" },
        ],
    },
}