Express Template
================

Experiments in sane defaults for a Node.js Express application using CoffeeScript. Will ideally recompile assets quickly in development and compile assets to disk to be served by Nginx, etc. in production. In progress!

* `npm start` - start the server

You can require Bower installed components from your Browserify bundle (uses [debowerify](https://github.com/eugeneware/debowerify)); for example, `bower install angular` lets you `require('angular')` from your bundle.
