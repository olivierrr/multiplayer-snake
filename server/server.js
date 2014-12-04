
var express = require('express')
  app = express()
  app.use(express.static(__dirname + '/../client'))

var server = require('http').createServer(app)
  , port = +process.env.PORT || 3000

server.listen(port)

// cloak expects this for some reason...
server.address = function () { return {port: port} }

module.exports = server
