------------
php-ngserver
------------

This is a php server middleware using browser sync combined with
 gulp-connect-php, and is intended to use your php proxy, such as php-fpm,
  which you will need in working order and running to use.  By default it uses
  the proxy port 9000, and the site is accessible on port 3000.   

Setup instructions
------------------
-place outside of your project root,
-install package dependencies npm install,
-point path to your application root where your index.php file is located
-run gulp to start server

Alternatively to placing this package outside of your project root, you can
-place it inside your project root, then either comment out the publicDir path,
-then use an index.php inside your project root
-- or adjust the publicDir path accordingly.

Be careful if you already have an index.php in your project root, if your going
with this latter option, since this package contains an index.php file that you
probably dont want to overwrite yours with.  


Current issues
--------------
The browserSync main page accessible on port 3001 one is linking the site to be
on port 3002, but its on port 3000, something will need to be edited next to
fix this.



Copyright (c) 2017 Brian Lamb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
