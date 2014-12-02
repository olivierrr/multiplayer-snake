
var Game = require('../../shared/Game')
var Snake = require('../../shared/Snake')
var Renderer = require('../Renderer')

module.exports = function (states) {

  var interval

  var $elem = document.querySelector('#singleplayer')
  var $canvasContainer = $elem.querySelector('.game')

  var game = new Game(30)
  var snake = new Snake()
  var renderer

  function onkeydown (e) {
    var direction = findDirection(e.keyCode)
    if(direction > 0) snake.put(direction)
  }

  function findDirection (keycode) {
    var keymap = [[38, 87], [39, 68], [40, 83], [37, 65]]
    for(var i=0; i<keymap.length; i++) {
      if(keymap[i].indexOf(keycode) !== -1) return i + 1
    }
    return null
  }

  function loop() {
    game.update([snake])
    renderer.draw(game.model)
  }

  game.on('die', function (snake) {
    var coords = game.getSafeCoords()
    snake.spawn(coords.x, coords.y)
  })

  game.on('self-collision', function (snake) {
    var coords = game.getSafeCoords()
    snake.spawn(coords.x, coords.y)
  })

  return {
    create: function () {
      $elem.className = ''
      renderer = renderer || new Renderer($canvasContainer)
      var coords = game.getSafeCoords()
      snake.spawn(coords.x, coords.y)
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