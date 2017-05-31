<?php
/**
 * for gulp-connect-php
 * Used for development server, no mysql solution yet.
 *
 * If this script returns false, then the requested resource is returned as-is.
 * Otherwise the script's output is returned to the browser.
 */

 //set error reporting level
 error_reporting(E_ALL);

/**
 * Optional, set your path here for the site you want to serve today,
 *  specifically for when your using this server in a directory other than where
 *  your sites project root is located.  e.g. in cases where you are using this
 *  server for multiple sites, (one at a time), etc..
 * Examples:
 * $publicDir = __DIR__ . '../projects/site.com';
 * $publicDir = "/home/<user>/projects/site.com";
 * or comment out, for default
 */
$publicDir = "/home/wolfdogg/sites/wolfdogg-legacy";

 /**
  * if these types are files are specified, then just load them directly, no
  *  need to proxy them
  */
 if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"]))
 {
     return false;    // serve the requested resource as-is
 }
 else
 {
     if(!isset($publicDir))
     {
       //adjust to your most likely default, e.g. /public, /../www, /.., etc
        $publicDir = __DIR__ . '/..';
        $altloc = FALSE;
     }
     else
     {
       $altloc = TRUE;
     }

     return call_user_func('response', $publicDir, $altloc);
 }

/**
 * Loads a response file based on a path, and a uri.  Suggests a default path if
 *  you dont pass it one.
 * @TODO can be elaborated on later once the response is working
 *
 * @param  string $publicDir the path to the public file dir
 * @param  [type] $altloc    [description]
 * @return false      skips returning so the uri file can be loaded instead
 * @return file       loads required file
 */
 function response ($publicDir, $altloc) {

     echo "<p>Thanks for using php-ngserver :)</p>";

     /**
      * Use default path if not specified.
      */
     $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
     $uri = urldecode($uri);
     $requested = $publicDir . $uri;

    /**
     * Mimics mod_rewrite, only if we havent specified an altloc.  if we have
     * specified, then we need to load that file anyway
     */
     if ($uri !== '/' && file_exists($requested))
     {
       if ($altloc !== FALSE)
       {
         //load the specified file directly, using the full path
         require_once $requested;
       }
       else
       {
          //load the specified file directly, from default path.  Don't require it
          return false;
       }
     }

     require_once $publicDir . '/index.php';
 }
