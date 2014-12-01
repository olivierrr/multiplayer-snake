
var Game = require('../../shared/Game')
var Renderer = require('../Renderer')
var UserInput = require('../UserInput')
var Snake = require('../../shared/Snake')

module.exports = function (states) {

  var interval

  var $elem = document.querySelector('#singleplayer')
  var $canvasContainer = $elem.querySelector('.game')

  var game = new Game(30)
  var userInput = new UserInput()
  var snake = new Snake()
  var renderer

  function updateSnakeDirection(){
    var key = userInput.get()
    if(key) snake.direction = key
  }

  function onkeydown (e) {
    userInput.feedKeyStream(e.keyCode)
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