
var Game = require('../Game')
var Renderer = require('../Renderer')

module.exports = function (states) {

  var state = {}

  state.create = function () {
    console.log('on mp')
    var game = new Game(50)
    var renderer = new Renderer(document.body)

    document.body.addEventListener('click', function (e) {
      cloak.message('keyPress', {key: e.keyCode})
    })

    cloak._on('message-pulse', function (data) {
      console.log(data)
      game.update()
      renderer.draw(game.model)
    })

  }

  state.destroy = function () {

  }

  return state

}
