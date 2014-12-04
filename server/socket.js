
var cloak = require('cloak')
  , randomColor = require('randomcolor')

var Game = require('../shared/Game')
  , Snake = require('../shared/Snake')
  , rateLimit = require('./rate-limit')(500)

cloak.configure({
  express: require('./server'),
  gameLoopSpeed: 130,
  defaultRoomSize: 10,
  autoJoinLobby: false,
  autoCreateRooms: false,
  minRoomMembers: null,
  pruneEmptyRooms: null,
  reconnectWaitRoomless: null,
  roomLife: null,
  notifyRoomChanges: true,
  messages: {
    chat: function (msg, user) {
      user.data.limit += 1
      if(user.data.limit > 4) {
        user.message('chat_spam')
      } else {
        user.getRoom().messageMembers('chat', {color: user.data.color, name: user.name, msg: msg})
      }
    },
    getRandomName: function (data, user) {
      user.name = getUniqueUsername()
      user.message('changeUsername_response', user.name)
    },
    changeUsername: function (newUsername, user) {
      if(!newUsername) return

      newUsername = newUsername.replace(/\s/g, '').toUpperCase()

      if(isValidUsername(newUsername)) {
        var room = user.getRoom()
        if(room) room.messageMembers('roomMemberNameChange', {before: user.name, now: newUsername})
        user.name = newUsername
        user.message('changeUsername_response', user.name)
      } else {
        user.message('changeUsername_failed')
      }
    },
    changeColor: function (data, user) {
      var color = randomColor({luminosity: 'light'})
      user.data.color = color
      if(user.data.snake) user.data.snake.color = color
      user.message('changeColor_response', color)
    },
    listRooms: function (data, user) {
      user.message('listRooms_response', cloak.getRooms(true))
    },
    createRoom: function (data, user) {
      if(!data || !data.roomName) return
      var room = cloak.createRoom(data.roomName, data.roomSize)
      if(room && room.id) user.message('createRoom_response', {roomId: room.id})
      else user.message('createRoom_failed')
    },
    joinRoom: function (data, user) {
      if(!data || !data.roomId) return
      var room = cloak.getRoom(data.roomId)
      if(room) room.addMember(user)
      else user.message('joinRoom_failed')
    },
    leaveRoom: function (data, user) {
      user.leaveRoom()
    },
    joinLobby: function (data, user) {
      cloak.getLobby().addMember(user)
    },
    userCount: function (data, user) {
      user.message('userCount_response', cloak.userCount())
    },
    keyPress: function (direction, user) {
      user.data.snake.put(direction)
    },
    spawn: function (data, user) {
      var room = user.getRoom()
      if(room && room.data.game && user.data.snake && user.data.snake.isAlive === false) {
        var coords = room.data.game.getSafeCoords()
        user.data.snake.spawn(coords.x, coords.y)
      }
    },
    ping: function (data, user) {
      user.message('pong')
    },
    userList: function (data, user) {
      var room = user.getRoom()
      if(room) user.message('userList_response', room.getMembers().map(userToJson))
    }
  },
  room: {
    init: function () {
      var game = this.data.game = new Game(30)
      var room = this

      game.on('die', function (snake) {
        snake.user.message('snake_die', {x: snake.x, y: snake.y})
      })

      game.on('eat', function (snake) {
        snake.user.message('snake_eat', {x: snake.x, y: snake.y})
      })

      game.on('snake-collision', function (snake1, snake2) {
        snake1.user.message('snake_die', {x: snake1.x, y: snake1.y})
        room.messageMembers('snake_collision', {killed: snake1.user.name, by: snake2.user.name})
      })

      game.on('self-collision', function (snake) {
        snake.user.message('snake_die', {x: snake.x, y: snake.y})
      })

    },
    pulse: function () {
      var snakes = this.getMembers().map(function (user) {
        user.data.snake = user.data.snake || new Snake()
        return user.data.snake
      })
      this.data.game.update(snakes)
      this.messageMembers('pulse', this.data.game.model)
    },
    newMember: function (user) {
      var room = this

      user.message('pulse', this.data.game.model)
      cloak.messageAll('listRooms_response', cloak.getRooms(true))
      cloak.messageAll('userCount_response', cloak.userCount())

      var color = user.data.color || (user.data.color = randomColor({luminosity: 'light'}))

      user.data.snake = new Snake()
      user.data.snake.color = color
      user.data.snake.user = user
    },
    memberLeaves: function (user) {
      var room = this

      cloak.messageAll('listRooms_response', cloak.getRooms(true))
      cloak.messageAll('userCount_response', cloak.userCount())
    },
    close: function () {

    }
  }
})

function userToJson (user) {
  return {
    name: user.name,
    color: user.data.color
  }
}

function getUniqueUsername () {
  var username

  do {
    username = 'SNAKE' + ~~(Math.random()*1000000) 
  } while (!isValidUsername(username))

  return username
}

/**
 * valid usernames are:
 * alphanumeric 
 * uppercase
 * 6 char minimum
 * 15 chat maximum
 * unique
 */
function isValidUsername (username) {
  return (
    username.length > 5
    && /^[A-Z0-9]+$/.test(username)
    && username.length < 16
    && cloak.getUsers().indexOf(username) < 0
  )
}

cloak.run()
cloak.createRoom('main room')
cloak.createRoom('no gurls allowed!11')
cloak.createRoom('another room')
cloak.createRoom('bad dudes only')