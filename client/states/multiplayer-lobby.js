
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

    function joinRoom (roomId) {
      cloak.message('joinRoom')
      cloak._on('message-joinRoom_response', function (data) {
        if (data.success) {
          // go to room
        } else {
          // error
        }
      })
    }

    function createRoom (roomName) {
      cloak.message('createRoom')
      cloak._on('createRoom_response', function (data) {
        if (data.success) {
          // data.roomId
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