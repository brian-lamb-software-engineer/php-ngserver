<?php
/**
 * for gulp-connect-php
 * Used for development server, for wp site, no mysql solution yet.
 *
 * If this script returns false, then the requested resource is returned as-is.
 * Otherwise the script's output is returned to the browser.
 */

 error_reporting(E_ALL);

/**
 * optional, set your path here.  specifically for when your using this server
 * in a directory other than where your sites project root is located.  e.g.
 * in cases where you are using this server for multiple sites, etc..
 */
 // $publicDir = __DIR__ . '../wolfdogg-legacy';
 $publicDir = "/home/wolfdogg/sites/wolfdogg-legacy";

 // router.php
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

     return call_user_func('response', $publicDir, $altloc);
 }

/**
 * Loads a response file based on a path, and a uri.  Suggests a default path if
 *  you dont pass it one.
 * @TODO can be elaborated on later once the response is working
 *
 * @param  string $publicDir the path to the public file dir
 * @return [type]            [description]
 */
 function response ($publicDir, $altloc) {

   var_dump($publicDir);

     //$response = echo "<p>Thanks for using gulp-connect-php :)</p>";

     /**
      * Use default path if not specified.
      */
     $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
     $uri = urldecode($uri);
     $requested = $publicDir . $uri;

    //mimics mod_rewrite, only if we havent specified an altloc.  if we have
    //specified, then we need to load that file anyway
     if ($uri !== '/' && file_exists($requested))
     {
       if ($altloc !== FALSE)
       {
         //load the specified file directly, using the full path
         require_once $requested;
       }
       else
       {
          //let specified load directly from default path, dont require it
          return false;
       }
     }

     require_once $publicDir . '/index.php';

    //  return $publicDir;
 }
