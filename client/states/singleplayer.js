
var Game = require('../../shared/Game')
var Snake = require('../../shared/Snake')
var Renderer = require('../Renderer')

module.exports = function (states) {

  var $elem = document.querySelector('#singleplayer')
  var $canvasContainer = $elem.querySelector('.game')

  var game = new Game(30)
  var snake = new Snake()
  var renderer
  var interval

  function onkeydown (e) {
    var keymap = [[38, 87], [39, 68], [40, 83], [37, 65]]
    for(var i=0; i<keymap.length; i++) if(keymap[i].indexOf(e.keyCode) !== -1) snake.put(i+1)
  }

  function loop() {
    game.update([snake])
    renderer.draw(game.model)
  }

  game.on('die', spawn)
  game.on('self-collision', spawn)

  function spawn () {
    var coords = game.getSafeCoords()
    snake.spawn(coords.x, coords.y)
  }

  return {
    create: function () {
      $elem.className = ''
      renderer = renderer || new Renderer($canvasContainer)
      spawn()
      interval = window.setInterval(window.requestAnimationFrame.bind(null, loop), 100)
      document.addEventListener('keydown', onkeydown)
      loop()
    },
    destroy: function () {
      document.removeEventListener('keydown', onkeydown)
      window.clearInterval(interval)
      $elem.className = 'hidden'
    }
  }
}