const path = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    css: {
        extract: false
    },
    outputDir: "dist/task-tracker",
    filenameHashing: true,
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' },
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src")
            }
        },
        plugins: [
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css|json|txt|html)(\?.*)?$/i,
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false
            }),
            new CleanWebpackPlugin()
        ],
        output: {
            filename: "js/[name].[hash:8].js"
        }
    },
    chainWebpack: config => {
        config.output.chunkFilename(`js/[name].[chunkhash:8].js`);
    }
}
