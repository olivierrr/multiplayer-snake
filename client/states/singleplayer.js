
var Game = require('../../shared/Game')
var Renderer = require('../Renderer')
var UserInput = require('../UserInput')

module.exports = function (states) {
  var state = {}

  var $elem = document.querySelector('#singleplayer')
  var $canvasContainer = $elem.querySelector('.game')

  var isLooping = false

  state.create = function () {
    $elem.className = ''
    isLooping = true

    var game = new Game(30)
    var renderer = new Renderer($canvasContainer)
    var userInput = new UserInput()

    game.addSnake()

    document.addEventListener('keydown', function (e){
      userInput.feedKeyStream(e.keyCode)
    })

    game.events.on('pre-update', function (wdawd, awdawd){
      var key = userInput.get()
      if(key) game.snakes[0].direction = key
    })

    function loop() {
      if(isLooping) window.setTimeout(window.requestAnimationFrame.bind(null, loop), 100)
      game.update()
      renderer.draw(game.model)
    }

    window.s = game.snakes[0]
    s.spawn({x: 2, y: 2, direction: 'right'})
    loop()
  }

  state.destroy = function (){
    isLooping = false
    $elem.className = 'hidden'
  }

  return state
}