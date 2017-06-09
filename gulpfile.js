// var gulp = require('gulp'),
//     connect = require('gulp-connect-php');
//
//
var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    bs = require('browser-sync').create();

/**
  * http://php.net/manual/en/features.commandline.webserver.php
  * https://npmdoc.github.io/node-npmdoc-gulp-connect-php/build/apidoc.html
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
  /**
   * This is the PHP server
   * Note, your site will be accessible at the gulp-connect port, which defaults
   *  to site.com:8000, but will also be accessible on a browserSync port which
   *  normally defaults to site.com:3000.
   *
   * Depending on your site configuration, if your site uses global variables
   *  to automatically configure any paths, since its proxy'd this info may not
   *  be available to the global vars, some of your images might not load, etc..
   *  Hence, your configuration might need tweaking to work with the browserSync
   *  port url, which is conveniently easier. You might want to make sure to
   *  test it on the gulp-connect port first to see if its working properly, and
   *  go from there.
   */
  connect.server({

    //your php router
    router: 'router.php',

    // //adjust your port to access the site on if other than defaul 8000
    // port: 3000,

    // adjust port, set to the ip of the machine, or 0.0.0.0 for outside access
    hostname: '192.168.1.10',

    //add livereload
    livereload: true,

    /**
     * Need hostname set to ip of machine, or localhost for this to work
     * correctly, otherwise it opens to the wrong url
     */
    open: false,

    base: '../',

    //configCallback example
    configCallback: function _configCallback(type, collection) {
      // If you wish to leave one of the argument types alone, simply return the passed in collection.
      if (type === connect.OPTIONS_SPAWN_OBJ) { // As the constant suggests, collection is an Object.
        // Lets add a custom env var. Good for injecting AWS_RDS config variables.
        collection.env = Object.assign({
          MY_CUSTOM_ENV_VAR: "env_var_value"
        }, process.env);

        return collection;
      } else if (type === connect.OPTIONS_PHP_CLI_ARR) { // As the constant suggests, collection is an Array.
        let newArgs = [
          '-e',                     // Generate extended information for debugger/profiler.
          // '-d', 'memory_limit=2G',   // Define INI entry, Up memory limit to 2G.
        ];

        /**
         * A way to override default configuration.  Using base: '../' instead
         * for this one, but leaving this as an example. This example overrides
         * -t (docroot), which cant be reset using newArgs, since its already
         * passed by default.
         */
        // collection.indexOf('-t')
        // let docRootIndex = collection.indexOf('-t') +1;
        // if (docRootIndex !== -1) {
        //     collection[docRootIndex] = '../';
        // }

        // Ensure our argument switches appear before the rest.
        return newArgs.concat(collection);
      }
    }
  },
  //callback (browserSync goes in here)
  function (){

    //load in browserSync
    bs.init({
      /**
       * -'proxy' must be used instead of 'server', if connecting to gulp-
       *  connect, otherwise you will need to build out your req/res in
       *  middleware.  This was setup to use proxy of gulp-connect-php.
       * -Site resource urls such as css are built using this target, (base
       *  href) so if operating over a network, you need to use the ip or
       *  hostname here, instead of localhost. You can use the IP of the
       *  server also.
       *
       * -The port needs to be specified, and needs to match the gulp-connect
       *   port
       * e.g.
       *  target: 'merlin:8000',
       *
       // proxy: 'http://merlin:8000', //using browserSync, browserSync works, site doesnt load (8000 loads site)
       // proxy: 'http://ld.pvt:8000', //using browserSync,  site works, browserSync doesnt (8000 loads site)
       */
      proxy: {
        target: '192.168.1.10:8000',
      },

      // adjust host, but cant see any affect using this yet.
      // host: "ld.pvt",

      /**
       * Change browsersync (local and external) host to this port (in pink),
       * from defaul 3000.  Set only if you want to access via different port,
       * i.e. if its already in use.  Doesnt affect anything else, just access
       * url
       * optional*
       */
      // port: 8000,

      /**
       *  adjust which port the UI is available on, optional*
       */
      // ui: {
      //   // port: 8000 //changes ui to this port (internal and external), from default 3001
      // },

      // individually adjust browserSync automatic operation, optional*
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      },

      // open browser automatically? or you can use tunnel here.  optional*
      open: false,

      /**
       * This is how we get the correct link open on the browserSync page.  When
       *  its set to false, you only see the proxy url.  This is mainly needed
       *  when your developing across a lan, or online.
       */
      online: true,

      //log level Default: info
      // Can be either "info", "debug", "warn", or "silent"
      logLevel: "info"
    });
  });

  // // watch for changes
  gulp.watch([
      '../**/*.php',
      '../**/*.html',
      '../**/*.css',
      '../**/*.js',
      '../images/**/*'
    ])
    .on('change', function(){
      bs.reload();
  });
  //
  // gulp.watch('app/styles/**/*.scss', ['styles', reload]);
  // gulp.watch('bower.json', ['wiredep', 'fonts', reload]);

});

gulp.task('connect', function() {
    connect.server();
});

gulp.task('default', ['connect-sync']);
