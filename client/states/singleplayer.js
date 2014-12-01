
var Game = require('../../shared/Game')
var Renderer = require('../Renderer')
var Controller = require('../../shared/Controller')
var Snake = require('../../shared/Snake')

module.exports = function (states) {

  var interval

  var $elem = document.querySelector('#singleplayer')
  var $canvasContainer = $elem.querySelector('.game')

  var game = new Game(30)
  var controller = new Controller()
  var snake = new Snake()
  var renderer

  function updateSnakeDirection(){
    if(!snake.isAlive) return
    var key = controller.get()
    if(key) snake.direction = key
  }

  function onkeydown (e) {
    var direction = findDirection(e.keyCode)
    if(direction > 0) controller.put(direction)
  }

  function findDirection (keycode) {
    var keymap = [[38, 87], [39, 68], [40, 83], [37, 65]]
    for(var i=0; i<keymap.length; i++) {
      if(keymap[i].indexOf(keycode) !== -1) return i + 1
    }
    return null
  }

  function loop() {
    updateSnakeDirection()
    game.update([snake])
    renderer.draw(game.model)
  }

  return {
    create: function () {
      $elem.className = ''
      renderer = renderer || new Renderer($canvasContainer)
      snake.spawn(2, 2)
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