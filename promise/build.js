'use strict'

var gulp = require('gulp')
var del = require('del')
var createTask = require('./create-webpack-task')
var wpConfig = require('./webpack.config.js')

var config = require('./config')
var dist = config.dist

wpConfig.output.path = dist
var task = createTask(wpConfig)

// function cleanBuiltFiles(cb) {
// 	del([
// 		dist
// 	], {
// 		force: true,
// 	}, cb)
// }
//
// gulp.task('clean', cleanBuiltFiles)

gulp.task('build', task())
gulp.task('watch', task('watch'))

// gulp.task('clean-build', gulp.series('clean', 'build'))
