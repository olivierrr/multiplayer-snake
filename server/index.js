
var cloak = require('cloak')

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
      user.getRoom().messageMembers('chat', msg)
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
    keyPress: function (data, user) {
      var room = user.getRoom()
      console.log(data)
    },
    spawn: function (data, user) {
      var room = user.getRoom()
      console.log(user.data)
    }
  },
  room: {
    init: function () {
      this.game = 123
    },
    pulse: function () {
      this.game += 1
      this.messageMembers('pulse', {someData: this.game})
    },
    newMember: function () {
      
    },
    memberLeaves: function () {
    
    },
    close: function () {
      
    }
  },
  lobby: {
    init: function () {
      console.log('lobby init')
    },
    newMember: function () {
      console.log('new member lobby')
    },
    memberLeaves: function () {
      console.log('member leaves lobby') 
    }
  }
}) 

cloak.run()
