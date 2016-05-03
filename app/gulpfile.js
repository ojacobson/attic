'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack-stream');
var webpackCore = require('webpack');
var named = require('vinyl-named');
var path = require('path');

var inputs = path.resolve("src/main");
// Write directly into Gradle's (and Idea's) build output, to avoid issues with generated files in src/.
var assets = path.resolve("build/resources/main/assets")

gulp.task('style', function () {
    var lessSource = path.join(inputs, "less");
    var lessRoots = path.join(lessSource, "*.less");
    var lessOutput = path.join(assets, "css");

    // Cribbed shamelessly from Bootstrap's own browser list:
    //    https://github.com/twbs/bootstrap/blob/614559b41ab71cba318b97c8e7e8277917d4fdde/grunt/configBridge.json
    var bootstrapBrowsers = [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6",
    ];

    gulp
        .src(lessRoots)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([ autoprefixer({ browsers: bootstrapBrowsers }) ]))
        // Separate map files only get loaded when a user opens the inspector, keeping latency and throughput down for
        // the common case of "I'm just using the site."
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lessOutput));
});

gulp.task('js', function() {
    var jsSource = path.join(inputs, "js");
    var jsRoots = path.join(jsSource, "*.js");
    var jsOutput = path.join(assets, "js");

    var webpackConfig = {
        output: {
            filename: "[name].bundle.js",
            // Including chunk hashes helps prevent loader shear if a deployment catches you in the middle of a session.
            // A 404 is a better outcome than silently receiving the wrong source code.
            chunkFilename: "[name].[chunkhash].chunk.js",
            publicPath: "/assets/js/",
        },

        resolve: {
            // Automatically resolve JSX modules, like JS modules.
            extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel",
                    query: {
                        presets: ['es2015'],
                    },
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    loader: "babel",
                    query: {
                        presets: ['react', 'es2015'],
                    },
                },
            ],
        },

        plugins: [
            new webpackCore.optimize.OccurrenceOrderPlugin(/* preferEntry=*/true),
            new webpackCore.optimize.MinChunkSizePlugin({
                minChunkSize: 100 * 1024, // Best guess: combine chunks under 100kb. Needs tweaking.
            }),
        ],

        // Webpack has its own source map generator, and doesn't seem to integrate nicely with gulp-sourcemaps on its
        // own. Using the same pipe setup as the less chain (above) results in none source maps.
        devtool: '#source-map',
    };

    gulp
        .src(jsRoots)
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(jsOutput));
});

gulp.task('assets', ['style', 'js']);
