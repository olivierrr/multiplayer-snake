
var cloak = require('cloak')
var Game = require('../shared/Game')
var Snake = require('../shared/Snake')

cloak.configure({
  port: 9001,
  gameLoopSpeed: 100,
  defaultRoomSize: 10,
  autoJoinLobby: true,
  autoCreateRooms: false,
  minRoomMembers: 1,
  pruneEmptyRooms: null,
  reconnectWaitRoomless: null,
  roomLife: null,
  notifyRoomChanges: true,
  messages: {
    chat: function (msg, user) {
      user.getRoom().messageMembers('chat', {name: user.name, msg: msg})
    },
    changeUsername: function (data, user) {
      if(!data || !data.newUsername) return
      var success = (cloak.getUsers().indexOf(data.newUsername) < 0)
      if(success) user.name = data.newUsername
      user.message('changeUsername_response', {success: success})
    },
    listRooms: function (data, user) {
      user.message('listRooms_response', cloak.getRooms(true))
    },
    createRoom: function (data, user) {
      if(!data || !data.roomName) return
      var room = cloak.createRoom(data.roomName, data.roomSize)
      var success = room.addMember(user)
      user.message('createRoom_response', {
        success: success,
        roomId: room.id
      })
    },
    joinRoom: function (data, user) {
      if(!data || !data.roomId) return
      var room = cloak.getRoom(data.roomId)
      if(room) room.addMember(user)
      user.message('joinRoom_response', {success: !!room})
    },
    leaveRoom: function (data, user) {
      user.leaveRoom()
    },
    userCount: function (data, user) {
      user.message('userCount_response', cloak.userCount())
    },
    keyPress: function (data, user) {
      var room = user.getRoom()
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
      this.messageMembers('pulse', {model: this.data.game.model})
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
      if(user.name === 'Nameless User') user.name = 'snake#' + user.id.slice(0,6)
    }
  }
}) 

cloak.run()
