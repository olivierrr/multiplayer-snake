
var cloak = require('cloak')
var Game = require('../shared/Game')
var Snake = require('../shared/Snake')

cloak.configure({
  port: 9001,
  gameLoopSpeed: 100,
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
      user.getRoom().messageMembers('chat', {name: user.name, msg: msg})
    },
    newUser: function (data, user) {
      var username

      do {
        username = 'snake' + ~~(Math.random()*1000000) 
      } while (!isUserNameUnique(username))

      user.name = username
      user.message('changeUsername_response', {newUsername: user.name})
    },
    changeUsername: function (data, user) {
      if(!data || !data.newUsername) return
      if(isUserNameUnique(data.newUsername)) {
        var room = user.getRoom()
        if(room) room.messageMembers('chat', {flag: 'usernameChange', msg: user.name + ' is now ' + data.newUsername})
        user.name = data.newUsername
        user.message('changeUsername_response', {newUsername: user.name})
      } else {
        user.message('changeUsername_failed')
      }
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
      var room = user.getRoom()
      console.log(direction)
    },
    spawn: function (data, user) {
      var room = user.getRoom()
      if(!user.data.snake) user.data.snake = new Snake()
    }
  },
  room: {
    init: function () {
      this.data.game = new Game(30)
    },
    pulse: function () {
      //this.game.update()
      this.messageMembers('pulse', this.data.game.model)
    },
    newMember: function (user) {
      user.message('pulse', {model: this.data.game.model})
    },
    memberLeaves: function (user) {

    },
    close: function () {

    }
  },
  lobby: {
    init: function () {
      console.log('lobby init')
    },
    pulse: function () {
      this.pulseCounter ? this.pulseCounter+=1 : this.pulseCounter=1
      if(this.pulseCounter%10===0) this.messageMembers('userCount_response', cloak.userCount())
    },
    newMember: function (user) {
    
    }
  }
})

cloak.run()

// temp
cloak.createRoom('main room')
cloak.createRoom('no gurls allowed!11')
cloak.createRoom('another room')
cloak.createRoom('bad dudes only')

function isUserNameUnique (username) {
  return (cloak.getUsers().indexOf(username) < 0)
}
