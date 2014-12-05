
var cloak = require('cloak')
  , randomColor = require('randomcolor')

var Game = require('../shared/Game')
  , Snake = require('../shared/Snake')
  , rateLimit = require('./rate-limit')(300)

cloak.configure({
  express: require('./server'),
  gameLoopSpeed: 130,
  defaultRoomSize: 10,
  autoJoinLobby: false,
  autoCreateRooms: false,
  minRoomMembers: null,
  pruneEmptyRooms: null,
  reconnectWait: 100,
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
      var oldColor = user.data.color
      user.data.color = color
      if(user.data.snake) user.data.snake.color = color

      user.message('changeColor_response', color)

      if(user.getRoom()) {
        user.getRoom().messageMembers('roomMemberColorChange', {
          username: user.name, 
          before: oldColor, 
          after: user.data.color
        })
      }
    },
    listRooms: function (data, user) {
      user.message('listRooms_response', cloak.getRooms(true))
    },
    createRoom: function (data, user) {
      if(!data || !data.roomName) return

      var room
      data.roomName = data.roomName.split(/\s+/).join(' ').trim().toUpperCase()

      console.log(isValidRoomname(data.roomName))
      if(isValidRoomname(data.roomName) && (room = cloak.createRoom(data.roomName, data.roomSize))) {
        user.message('createRoom_response', {roomName: room.name})
      } else {
        user.message('createRoom_failed')
      }

    },
    joinRoom: function (data, user) {
      if(!data || !data.roomName) return

      var room = findRoomByName(deSlugize(data.roomName).toUpperCase())
      if( !room || !room.addMember(user)) {
        user.message('joinRoom_failed')
      }

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
        snake.user.data.deaths += 1
        snake.user.message('snake_die', {x: snake.x, y: snake.y})
      })

      game.on('eat', function (snake) {
        snake.user.message('snake_eat', {x: snake.x, y: snake.y})
        snake.user.data.points += 1
      })

      game.on('snake-collision', function (snake1, snake2) {
        snake1.user.message('snake_die', {x: snake1.x, y: snake1.y})
        room.messageMembers('snake_collision', {killed: snake1.user.name, by: snake2.user.name})
        snake1.user.data.kills += 1
        snake2.user.data.deaths += 1
      })

      game.on('self-collision', function (snake) {
        snake.user.message('snake_die', {x: snake.x, y: snake.y})
        snake.user.data.deaths +=1
      })

    },
    pulse: function () {
      var room = this
      var snakes = room.getMembers().map(function (user) { return user.data.snake })
      room.data.game.update(snakes)
      room.messageMembers('pulse', room.data.game.model)
      room.messageMembers('userList_response', room.getMembers().map(userToJson))
    },
    newMember: function (user) {
      var room = this

      user.message('pulse', this.data.game.model)
      cloak.messageAll('listRooms_response', cloak.getRooms(true))
      cloak.messageAll('userCount_response', cloak.userCount())

      user.data.snake = new Snake()

      var color = user.data.color || (user.data.color = randomColor({luminosity: 'light'}))
      user.data.snake.color = color
      user.data.snake.user = user
      user.data.points = user.data.points || 0
      user.data.kills = user.data.kills || 0
      user.data.deaths = user.data.deaths ||0
    },
    memberLeaves: function (user) {
      user.snake = null
      cloak.messageAll('listRooms_response', cloak.getRooms(true))
      cloak.messageAll('userCount_response', cloak.userCount())
    },
    close: function () {
      var room = this
      room.getMembers().forEach(function (member) {
        member.joinRoom(cloak.getLobby())
      })
    }
  }
})

function deSlugize (str) {
  return str.split('-').join(' ')
}

function findRoomByName (roomName) {
  var rooms = cloak.getRooms()
  for(var i=0; i<rooms.length; i++) {
    if(rooms[i].name === roomName) {
      
      console.log(rooms[i].name)
      return rooms[i]
    }
  }
  return false
}

function userToJson (user) {

  return {
    name: user.name,
    color: user.data.color,
    points: user.data.points || 0,
    kills: user.data.kills || 0,
    deaths: user.data.deaths || 0,
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
 * 6 char min
 * 15 chat max
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

/**
 * valid roonames are:
 * alphanumeric
 * uppercase
 * 4 char min
 * 30 char max
 * unique
 */
function isValidRoomname (name) {
  return (
    name.length > 3
    && /^[A-Z0-9]+$/.test(name.replace(/\s/g, ''))
    && name.length < 31
    && cloak.getRooms().some(function (room) { return room.name !== name })
  )
}

cloak.run()
cloak.createRoom('MAIN ROOM')
cloak.createRoom('SECOND ROOM')