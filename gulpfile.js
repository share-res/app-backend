var gulp = require('gulp')
  , $ = require('gulp-load-plugins')()
  , mock = require('./db/mock')
  , tool = require('./db/util')


gulp.task('default', ['test'])

gulp.task('test', function () {
  return gulp.src('./test/**/*.js')
    .pipe($.mocha({ reporter: 'spec' }))
    .pipe($.exit())
})


gulp.task('dropDB', function (cb) {
  tool.connectDB(function (err) {
    if (err) return cb(err)
    tool.dropDB(function (err) {
      if (!err)
         tool.closeDB(cb)
      else
         cb(err)   
    })
  })
})

gulp.task('initDB', function (cb) {
  tool.connectDB(function (err) {
    if (err) return cb(err)
    mock.makeData(function() {
      tool.closeDB()
      cb(null)
    })
  })
})


gulp.task('jshint', function () {
  return gulp.src('./**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
})
