
var Renderer = require('../Renderer')

module.exports = function (states) {

  var state = {}

  var $elem = document.querySelector('#multiplayer')
  var $canvasContainer = $elem.querySelector('.game')

  state.create = function () {
    $elem.className = ''

    var renderer = new Renderer($canvasContainer)

    $canvasContainer.addEventListener('keydown', function (e) {
      cloak.message('keyPress', {key: e.keyCode})
    })

    cloak._on('message-pulse', renderer.draw)

    function spawn () {
      cloak.message('spawn')
    }

    cloak._on('message-chat', function (data) {
      // data.user
      // data.msg
    })

  }

  state.destroy = function () {
    $elem.className = 'hidden'
  }

  return state

}
