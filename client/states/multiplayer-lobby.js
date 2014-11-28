
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
          states.go('multiplayer')
        } else {
          console.log('joinRoom failed')
        }
      })
    }

    window.createRoom = function(roomName) {
      cloak.message('createRoom', {roomName: roomName})
      cloak._on('message-createRoom_response', function (data) {
        if (data.success) {
          states.go('multiplayer')
        } else {
          console.log('createRoom failed')
        }
      })
    }

  }

  state.destroy = function () {

  }

  return state

}
