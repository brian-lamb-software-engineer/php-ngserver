------------
php-ngserver
------------

This is a php server that uses gulp-connect-php, and combines with browserSync.
 It has a much quicker setup time than Apache, Nginx, or lighttpd.  It's
 intended to be a quick and easy drop-in node.js based PHP server for testing
 your site during development. or Its not for production since it has a blocking
 IO, hence isn't multi threaded.   

Setup instructions
------------------
-place the entire module inside your project root
-add the php-ngserver directory to your .gitignore if applicable
-install package dependencies by switching directories into php-ngserver, then
`npm install`
-In router.php, point the `$publicDir` path to your application root where your
index.php file is located
-adjust ports if necessary
-run `gulp` to start server

BrowserSync should launch your browser automatically, depending on your
particular environment setup, e.g. if your browser is on the same box as your
running gulp on, or that you properly have X11 tunnel configured and a browser
installed to the box your shelled into if not.  
Otherwise, the external url has been testing and is working. e.g.
192.168.1.11:3000.

Check if you need to customize any browserSync and gulp-connect-php options if
 it doesnt load out of the box, but the defaults should be enough.

Alternatively to placing this package inside your project root, you can
-place it above and or outside your project root, then just adjust the
`$publicDir` path accordingly.


Current issues
--------------
-



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
