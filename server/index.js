
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
    listRooms: function (data, user) {
      user.message('listRooms', cloak.getRooms(true))
    },
    createRoom: function (data, user) {
      if(!data || !data.roomName) return
      var room = cloak.createRoom(data.roomName, data.roomSize)
      var success = room.addMember(user)
      user.message('createRoom', {
        success: success,
        roomId: room.id
      })
    },

    // error when getRoom gets invalid roomId
    joinRoom: function (data, user) {
      if(!data || !data.roomId) return
      cloak.getRoom(data.roomId).addMember(user)
    },
    leaveRoom: function (data, user) {
      user.leaveRoom()
    }
  },
  room: {
    init: function () {
      console.log('NEW ROOM CREATED')      
    },
    pulse: function () {
        
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
    pulse: function () {
    
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
