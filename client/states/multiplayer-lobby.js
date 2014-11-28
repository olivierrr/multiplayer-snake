
module.exports = function (states) {

  var state = {}

  state.create = function () {
    cloak.run('http://localhost:9001')

    cloak._on('cloak-begin', function () {
      cloak.message('listRooms')
      cloak._on('message-listRooms_response', function (data) {
        console.log(data)
      })
    })

    window.joinRoom = function (roomId) {
      cloak.message('joinRoom')
      cloak._on('message-joinRoom_response', function (data) {
        if (data.success) {
          // go to room
          states.go('multiplayer')
        } else {
          // error
        }
      })
    }

    window.createRoom = function(roomName) {
      cloak.message('createRoom', {roomName: roomName})
      cloak._on('message-createRoom_response', function (data) {
        if (data.success) {
          // data.roomId
          console.log(data)
          states.go('multiplayer')
        } else {
          // error
        }
      })
    }

  }

  state.destroy = function () {

  }

  return state

}
