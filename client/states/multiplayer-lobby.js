
module.exports = function (states) {

  var state = {}

  state.create = function () {
    cloak.run('http://localhost:9001')

    cloak._on('cloak-begin', function () {
      cloak.message('listRooms')
      cloak._on('message-listRooms', function (data) {
        console.log(data)
      })
    })
  }

  state.destroy = function () {

  }

  return state

}