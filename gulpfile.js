const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const path = require('path');

//const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');

//默认development模式
gulp.task('default',function () {
	nodemon({
	  script: path.join('src','/app.js'), 
	  ext: 'js json',
    ignore: [
      '.git',
      'node_modules/'
    ],
	  watch: [
	    path.join('src','/')
	  ],
    "execMap": {
      "js": "node --harmony"
    },
	  env: { 'NODE_ENV': 'development','DEBUG': 'res-share-app:*' }
	})
});

gulp.task('translate', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        //.pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);

