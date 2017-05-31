// var gulp = require('gulp'),
//     connect = require('gulp-connect-php');
//
//
var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync');

/**
  connect.server({
    hostname: '0.0.0.0',
    bin: '/Applications/MAMP/bin/php/php5.5.3/bin/php',
    ini: '/Applications/MAMP/bin/php/php5.5.3/conf/php.ini',
    port: 8000,
    base: 'dev'

  browserSync({
    notify: false,
    port: 9000,
    server: {
    baseDir: ['.tmp', 'app'],
    routes: {
      '/bower_components': 'bower_components'
    }
 *
 */
gulp.task('connect-sync', function() {
  connect.server({
    router: 'serve/router.php',
    port: 3000
  }, function (){
    browserSync({
      proxy: '127.0.0.1:9000'
    });
  });

  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });

  // // watch for changes
  // gulp.watch([
  //   'app/*.html',
  //   '.tmp/styles/**/*.css',
  //   'app/scripts/**/*.js',
  //   'app/images/**/*'
  // ]).on('change', reload);
  //
  // gulp.watch('app/styles/**/*.scss', ['styles', reload]);
  // gulp.watch('bower.json', ['wiredep', 'fonts', reload]);

});

gulp.task('connect', function() {
    connect.server();
});

gulp.task('default', ['connect-sync']);
