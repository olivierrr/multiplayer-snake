var Hapi = require('hapi')
var Socket = require('socket.io')

var Game = require('./lib/game')
var lobbies = require('./lobbies.json')

var games = []

module.exports = start

function start(port) {
  var server = Hapi.createServer('localhost', port || 52473)
  var io = new Socket(server.listener)
  var main = io.of('/')
  var lobby = io.of('/lobby')
  var game = io.of('/game')

  server.route({
      method: 'GET'
    , path: '/{param*}'
    , handler: {directory: {path: '../client', listing: true}}
  })

  main.on('connection', function(socket) {
    socket.on('list-lobbies', function() {
      socket.emit('lobby-list', {lobbies: lobbies})
    })
  })

  lobby.on('connection', function(socket) {
    socket.on('message', function(lobby, username, message) {
      socket.emit('message', lobby, username, message)
    })

    socket.on('start-game', function(lobby) {
      var lobbyGame

      if(lobbies[lobby].gameStarted) {
        return socket.emit('error', 'Game has already started')
      }

      lobbies[lobby].gameStarted = true
      lobbyGame = new Game()

      socket.emit('game-started', lobbyGame.id)

      games.push(game)
    })
  })

  game.on('connection', function(socket) {
    socket.on('finished', function(gameId) {
      games = games.filter(function(x) {
        return x.id !== gameId
      })
    })

    // uhhhhh do game stuff.
  })

  return server
}
