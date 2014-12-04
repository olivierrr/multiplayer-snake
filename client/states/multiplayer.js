
var game = require('../game')
var chat = require('../chat')
var lobby = require('../lobby')
var info = require('../info')
var storage = require('../storage')

module.exports = function (states) {

  var myUsername = ''

  // fix, very nope.
  window.addEventListener('hashchange', resolveLocation)
  function resolveLocation () {
    var location = document.location.hash.split('/')
    if(location[0] === '#multiplayer') {
      if(location[1]) cloak.message('joinRoom', {roomId: location[1]})
      else cloak.message('joinLobby')
    }
  }

  var $elem = document.querySelector('#multiplayer')

  function quoteize (str) {
    return '"' + str + '"'
  }

  cloak.configure({
    messages: {
      roomMemberColorChange: function (data) {
        cloak.message('userList')
      },
      userList_response: function (users) {
        chat.userList(users)
      },
      chat: function (data) {
        chat.push(data.name, data.msg, data.color)
      },
      chat_spam: function () {
        chat.push('server', 'You\'re sending messages too fast!', 'server')
      },
      roomMemberNameChange: function (data) {
        chat.push('server', quoteize(data.before) + ' is now ' + quoteize(data.now) , data.color, 'server')
      },
      listRooms_response: function (rooms) {
        lobby.render(rooms)
        info.roomCount(rooms.length)
      },
      createRoom_response: function (data) {
        document.location.hash = '#multiplayer/' + data.roomId
      },
      createRoom_failed: function (data) {
        chat.push('server', 'room creation failed', 'server')
      },
      joinRoom_failed: function (data) {
        smoke.alert('Failed to join room.')
        chat.push('server', 'Failed to join room', 'server')
      },
      userCount_response: function (count) {
        info.userCount(count)
      },
      changeUsername_response: function (newUsername) {
        chat.push('server', 'you are now: ' + quoteize(newUsername), 'server')
        myUsername = newUsername
        storage.setName(newUsername)
      },
      changeUsername_failed: function () {
        chat.push('server', 'username change failed.', 'server')
      },
      changeColor_response: function (color) {
        chat.newColor(color)
      },
      pulse: function (model) {
        game.draw(model)
      },
      snake_die: function (data) {
        chat.push('game', 'You died!', 'game')
        game.showSpawnBtn()
      },
      snake_collision: function (data) {
        chat.push('game', data.killed + ' crashed into ' + data.by, 'game')
      },
      snake_eat: function (data) {
        
      },
      pong: function () {
        info.ping()
      }
    },
    serverEvents: {
      connecting: chat.push.bind(null, 'server', 'connecting...', 'server'),
      begin: function () {
        chat.push('server', 'connected.', 'server')
        storage.getName() ? cloak.message('changeUsername', storage.getName()) : cloak.message('getRandomName')
        cloak.message('listRooms')
        cloak.message('userCount')
        cloak.message('joinLobby')
        cloak.message('ping')
        cloak.message('changeColor')
        resolveLocation()
      },
      resume: chat.push.bind(null, 'server', 'reconnected.', 'server'),
      disconnect: chat.push.bind(null, 'server', 'disconnected.', 'server'),
      end: function () {
        document.location = '/'
      },
      error: function () {
        document.location = '/'
      },
      joinedRoom: function (room) {
        chat.clear()
        chat.push('server', 'You have joined ' + quoteize(room.name), 'server')

        if(room.name === 'Lobby') {
          lobby.show()
          game.hide()
        } else {
          game.show()
          lobby.hide()
        }
      },
      leftRoom: function (room) {},
      roomMemberJoined: function (user) {
        if(myUsername !== user.name) chat.push('server', quoteize(user.name) + ' has joined.', 'server')

        cloak.message('userList')
      },
      roomMemberLeft: function (user) {
        chat.push('server', quoteize(user.name) + ' has left.', 'server')

        cloak.message('userList')
      },
      lobbyMemberJoined: function (user) {
        if(myUsername !== user.name) chat.push('server', quoteize(user.name) + ' has joined.', 'server')

        cloak.message('userList')
      },
      lobbyMemberLeft: function (user) {
        chat.push('server', quoteize(user.name) + ' has left.', 'server')

        cloak.message('userList')
      },
      roomCreated: cloak.message.bind(cloak, 'listRooms'),
      roomDeleted: cloak.message.bind(cloak, 'listRooms')
    }
  })

  return {
    create: function () {
      $elem.className = ''
      cloak.run('http://localhost')
      // cloak.run('http://snake-40956.onmodulus.net')
    },
    destroy: function () {
      $elem.className = 'hidden'
      cloak.stop()
    }
  }

}