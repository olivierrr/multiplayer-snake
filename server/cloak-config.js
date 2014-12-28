
var cloak = require('cloak')

cloak.configure({
  express: require('./server'),
  gameLoopSpeed: 100,
  defaultRoomSize: 10,
  autoJoinLobby: false,
  autoCreateRooms: false,
  minRoomMembers: null,
  pruneEmptyRooms: null,
  reconnectWait: 100,
  reconnectWaitRoomless: null,
  roomLife: null,
  notifyRoomChanges: true,
  messages: require('./cloak-messages'),
  room: require('./cloak-room')
})

cloak.run()
cloak.createRoom('MAIN ROOM')
cloak.createRoom('SECOND ROOM')