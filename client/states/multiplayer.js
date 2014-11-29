
var Renderer = require('../Renderer')

module.exports = function (states) {
  var state = {}

  var $elem = document.querySelector('#multiplayer')
  var $canvasContainer = $elem.querySelector('.game')

  $canvasContainer.addEventListener('keydown', function (e) {
    cloak.message('keyPress', {key: e.keyCode})
  })

  function spawn () {
    cloak.message('spawn')
  }

  state.create = function () {
    $elem.className = ''

    var renderer = new Renderer($canvasContainer)
    cloak._on('message-pulse', renderer.draw)
  }

  state.destroy = function () {
    $elem.className = 'hidden'
  }


  return state
}
