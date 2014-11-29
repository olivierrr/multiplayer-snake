
var Game = require('../../shared/Game')
var Renderer = require('../Renderer')
var UserInput = require('../UserInput')

module.exports = function (states) {

  var isLooping = false

  var $elem = document.querySelector('#singleplayer')
  var $canvasContainer = $elem.querySelector('.game')

  console.log($canvasContainer.getBoundingClientRect())

  var game = new Game(30)
  var userInput = new UserInput()
  var renderer

  game.events.on('pre-update', function (wdawd, awdawd){
    var key = userInput.get()
    if(key) game.snakes[0].direction = key
  })

  document.addEventListener('keydown', function (e){
    if(isLooping) userInput.feedKeyStream(e.keyCode)
  })

  function loop() {
    if(isLooping) window.setTimeout(window.requestAnimationFrame.bind(null, loop), 100)
    game.update()
    renderer.draw(game.model)
  }

  game.addSnake()

  return {
    create: function () {
      $elem.className = ''

      renderer = new Renderer($canvasContainer)
      isLooping = true
      window.s = game.snakes[0]
      s.spawn({x: 2, y: 2, direction: 'right'})
      loop()
    },
    destroy: function () {
      isLooping = false
      $elem.className = 'hidden'
      $canvasContainer.innerHTML = ''
    }
  }
}