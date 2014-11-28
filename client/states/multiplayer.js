
module.exports = function (states) {

  var state = {}

  state.create = function () {
    cloak.run('http://localhost:9001')
    //cloak.message('listRooms')
  }

  state.destroy = function () {
    cloak.stop()
  }

  return state

}

cloak.configure({
  messages: {
    chat: function (msg, user) {
      console.log(msg, user)
    },
    listRooms: function (data) {
      console.log(data)
    }
  },
  severEvents: {
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
    lobbyMemberLeft: function (id) {
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


