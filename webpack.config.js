const config = require('./config')
const path = require('path')

const productionMode = process.env.WEBPACK_MODE == "production"

function assetsPath(_path) {
    var assetsSubDirectory = productionMode
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    entry: "./src/index.tsx",
    mode: process.env.WEBPACK_MODE,
    context: __dirname,
    devtool: config.build.productionSourceMap ? 'source-map' : false,
    output: {
        filename: "bundle.js",
        path: config.build.assetsRoot,
        publicPath: "/",
        filename: assetsPath('js/[name].[hash].js'),
        chunkFilename: assetsPath('js/[name].[chunkhash].js')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    devServer: {
        historyApiFallback: true,
        // contentBase: config.build.assetsRoot,
        open: true,
        hot: true
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};