import gulp from "gulp";
import rename from "gulp-rename";
import ejs from "gulp-ejs";

gulp.task("ejs", (done) => {
  gulp
    .src(["public/ejs/**/**/*.ejs", "!" + "public/ejs/**/_*.ejs"])
    .pipe(ejs({}, {}, { ext: ".html" }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./public/html/"));
  done();
});
