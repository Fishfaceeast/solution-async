'use strict'

var webpack = require('webpack')
var failPlugin = require('webpack-fail-plugin')

function createTask(webpackConfig) {
	var gutil = require('gulp-util')
	return function (mode) {
		var onDev = process.env.NODE_ENV !== 'production'
		var config = Object.create(webpackConfig)
		config.watch = mode === 'watch'
		config.devtool = 'source-map'

		if (!onDev) {
			config.plugins = config.plugins.concat([
				new webpack.DefinePlugin({
					'process.env': {
						// Useful to reduce the size of client-side libraries, e.g. react
						NODE_ENV: JSON.stringify('production')
					}
				}),
				failPlugin,
			])
		}
		return function (cb) {
			webpack(config, function(err, stats) {

				if (err) throw new gutil.PluginError('webpack:build', err)

				var statsJson = stats.toJson()
				var needLog = mode === 'watch'
					|| statsJson.errors.length
					|| statsJson.warnings.length

				if (needLog) {
					gutil.log('[webpack:build]', stats.toString({
						cached: false,
						cachedAssets: false,
						colors: true,
						exclude: ['node_modules'],
					}))
				}
				cb()
			})
		}
	}
}

module.exports = createTask
