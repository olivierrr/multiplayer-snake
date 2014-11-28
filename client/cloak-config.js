
module.exports = function () {
  cloak.configure({
    messages: {
      chat: function (msg, user) {
        console.log(msg, user)
      },
      listRooms_response: function (data) {
        console.log(data)
      },
      createRoom_response: function (data) {
        console.log(data)
      },
      joinRoom_response: function (data) {
        console.log(data)
      },
      pulse: function (data) {
        console.log(data)
      }
    },
    serverEvents: {
      connecting: function () {
        console.log('connecting...')
      },
      begin: function () {
        console.log('connected.')
      },
      resume: function () {
        console.log('reconnected.')
      },
      disconnect: function () {
        console.log('disconnected.')
      },
      end: function () {
        console.log('connection ended.')
      },
      error: function () {
        console.log('connection error.')
      },
      joinedRoom: function (roomName) {
        console.log('joined room', roomName)
      },
      leftRoom: function (roomName) {
        console.log('left room', roomName)
      },
      roomMemberJoined: function (user) {
        console.log('user joined room', user)
      },
      roomMemberLeft: function (user) {
        console.log('user left room', user)
      },
      lobbyMemberJoined: function (user) {
        console.log('user joined lobby', user)
      },
      lobbyMemberLeft: function (user) {
        console.log('user left lobby', user)
      },
      roomCreated: function (roomCount){
        console.log('room created', roomCount)
      },
      roomDeleted: function (roomCount) {
        console.log('room room deleted', roomCount)
      }
    },
    timerEvents: {
    },
    initialData: function () {
    
    }
  })
}