
var Renderer = require('../Renderer')

module.exports = function (states) {

  var state = {}

  state.create = function () {

    var renderer = new Renderer(document.body)

    document.body.addEventListener('click', function (e) {
      cloak.message('keyPress', {key: e.keyCode})
    })

    cloak._on('message-pulse', render.draw)

    function spawn () {
      cloak.message('spawn')
    }

    cloak._on('message-chat', function (data) {
      // data.user
      // data.msg
    })

  }

  state.destroy = function () {

  }

  return state

}
