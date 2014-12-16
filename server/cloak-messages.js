
var cloak = require('cloak')
  , randomColor = require('./random-color')
  , rateLimit = require('./rate-limit')(1000)

module.exports = {
  chat: function (msg, user) {
    user.data.limit += 1
    if(user.data.limit > 3) {
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
    var color = randomColor()
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
}

function deSlugize (str) {
  return str.split('-').join(' ')
}

function findRoomByName (roomName) {
  var rooms = cloak.getRooms()
  for(var i=0; i<rooms.length; i++) {
    if(rooms[i].name === roomName) {
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
