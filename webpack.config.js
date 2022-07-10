const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv(),
        new NodePolyfillPlugin()
    ]
}