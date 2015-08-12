var gulp = require('gulp');
var ts = require('gulp-typescript');
var replace = require('gulp-replace'); 
var merge = require('merge2');
var mocha = require('gulp-spawn-mocha');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var filter = require('gulp-filter');

var tsProject = ts.createProject('tsconfig.json', {sortOutput: true });

var REF_REGEXP = /^\/\/\/\s*<reference\s+path=['"].*['"]\s*\/>\s*$/gm;
var IMPORT_REGEXP = /^import\s+.*\;$/gm;

gulp.task('build', function() {
    
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
                
    return merge([
        tsResult.js
        .pipe(replace(REF_REGEXP, ''))
        .pipe(gulp.dest('dist')),           
        tsResult.dts
        .pipe(replace(REF_REGEXP, ''))
        .pipe(replace(IMPORT_REGEXP, ''))
        .pipe(filter(['*', '!index.d.ts']))
        .pipe(concat('index.d.ts'))
        .pipe(insert.prepend("import Promise = require('bluebird');\n"))
        .pipe(gulp.dest('dist'))
    ]);        
});

gulp.task('default', ['build'], function() {
  gulp.watch("src/**.ts", ['build']);
});


gulp.task('test',  function () {
    return gulp.src('test/**.js')
        .pipe(mocha());
});