const gulp = require("gulp")
  , del = require('del')
  , php2html = require("gulp-php2html")
  , html2pug = require("gulp-html2pug")
  , htmlhint = require("gulp-htmlhint")
  , glob = require('glob')
  , fs = require('fs');

gulp.task('del:html', function(){
  return del('html/**/*.html');
});

gulp.task('del:pug', function(){
  return del('pug/**/*.pug');
});

gulp.task('del:empty', function(cb) {
  glob('html/**/*.html', function(err, files) {
    const emptyFiles = [];
    files.forEach(function(file) {
      const fileSize = fs.statSync(file).size;
      if(fileSize === 0) {
        emptyFiles.push(file);
        console.log(`delete: ${file}`);
      }
      // else {
      //   console.log(`size[${fileSize}]: ${file}`);
      // }
    });
    del(emptyFiles);
    cb();
  });
});

gulp.task("php2pug", function (){
  gulp.src("./src/**/*.php")
    .pipe(php2html({ processLinks: true, haltOnError: false, verbose: true }))
    .pipe(html2pug())
    .pipe(gulp.dest("./pug"));
});

gulp.task("php2html", function (){
  gulp.src("./src/**/*.php")
    .pipe(php2html({ processLinks: true, haltOnError: false, verbose: true }))
    .pipe(gulp.dest("./html"));
});

gulp.task('check-html', function() {
  return gulp.src('html/**/*.html')
    .pipe(htmlhint())
	  .pipe(htmlhint.failAfterError())
    // .pipe(htmllint({
    //   "id-class-style": false /* default value: underscore */,
    //   "indent-width": false /* default value: 4 */,
    //   "tag-bans": [] /* default values: style, b, i */
    // }, htmllintReporter));
});

// function htmllintReporter(filepath, issues) {
// 	if (issues.length > 0) {
// 		issues.forEach(function (issue) {
// 			gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
// 		});
// 		process.exitCode = 1;
// 	}
// }

gulp.task("html2pug", function (){
  gulp.src("./html/**/*.html")
    .pipe(html2pug())
    .pipe(gulp.dest("./pug"));
});
