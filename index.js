var os = require('os');
var http = require('http');
var path = require('path');
var express = require('express');
var less = require('less-middleware');
var browserify = require('browserify-middleware');

browserify.settings.transform = ['coffeeify', 'debowerify'];

var tmpPath = os.tmpDir();
var rootPath = path.resolve('.');
var publicPath = path.join(rootPath, 'public');
var cssPath = path.join(rootPath, 'client', 'css');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.compress());
app.use(express.logger('dev'));
app.use(express.json());
app.use(app.router);
app.use(less({
  src: cssPath,
  dest: tmpPath,
  compress: app.get('env') == 'production',
  debug: false,
  dumpLineNumbers: 'mediaquery'}));
app.use('/css', express.static(tmpPath));
app.use('/js/main.js', browserify('./client/js/main.js'));
app.use(express.static(publicPath));

http.createServer(app).listen(app.get('port'), function() {
  console.log("listening on http://localhost:" + app.get('port') + "/");
});
