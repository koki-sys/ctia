var gulp = require("gulp");
var rename = require("gulp-rename");
var ejs = require("gulp-ejs");
var replace = require("gulp-replace");

gulp.task("ejs", (done) => {
  gulp
    .src(["public/ejs/**/**/*.ejs", "!" + "public/ejs/**/_*.ejs"])
    .pipe(ejs({}, {}, {ext:'.html'}))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./public/html/"));
  done();
});