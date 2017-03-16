var gulp =require("gulp");//创建 gulp模块
var uglify=require("gulp-uglify");//创建js混淆压缩 模块
var minify_css =require("gulp-minify-css");　//创建 css混淆压缩模块
var gulp_concat = require('gulp-concat');  //创建 文件合并模块
var cssver = require('gulp-make-css-url-version'); 
var rename = require("gulp-rename");


gulp.task('min-css', function(){
	gulp.src('./src/css/*.css') 
	.pipe(cssver())
	.pipe(minify_css())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('min-js', function(){
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/js/'))
});

gulp.task('default',['min-css','min-js'],function() {
  // 将你的默认的任务代码放在这
});
