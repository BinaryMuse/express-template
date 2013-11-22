os = require 'os'
http = require 'http'
path = require 'path'
express = require 'express'
less = require 'less-middleware'
browserify = require 'browserify-middleware'

browserify.settings.transform = ['coffeeify', 'debowerify']

tmpPath = os.tmpDir()
rootPath = path.resolve('.')
publicPath = path.join(rootPath, 'public')
cssPath = path.join(rootPath, 'client', 'css')

app = express()

app.set('port', process.env.PORT || 3000)

app.use express.favicon()
app.use express.compress()
app.use express.logger('dev')
app.use express.json()
app.use app.router
app.use less
  src: cssPath
  dest: tmpPath
  compress: app.get('env') == 'production'
  debug: false
  dumpLineNumbers: 'mediaquery'
app.use '/css', express.static(tmpPath)
app.use '/js/main.js', browserify('./client/js/main.coffee')
app.use express.static(publicPath)

http.createServer(app).listen app.get('port'), ->
  console.log("listening on http://localhost:#{app.get('port')}/")
