'use strict'

var gulp = require('gulp')

var config = require('./config')

// base
require('./build')

gulp.task('default', gulp.parallel('build'))
