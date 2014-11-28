
module.exports = function (states) {

  var state = {}

  state.create = function () {
    cloak.run('http://localhost:9001')
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
    
    },
    begin: function () {
    
    },
    resume: function () {
    
    },
    disconnect: function () {
    
    },
    end: function () {

    },
    error: function () {

    },
    joinedRoom: function () {

    },
    leftRoom: function () {

    },
    roomMemberJoined: function () {

    },
    roomMemberLeft: function () {

    },
    lobbyMemberJoined: function () {

    },
    lobbyMemberLeft: function () {

    },
    roomCreated: function (){

    },
    roomDeleted: function () {

    }
  },
  timerEvents: {
  },
  initialData: function () {
  
  }
})


