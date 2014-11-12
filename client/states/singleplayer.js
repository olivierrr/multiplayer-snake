
var Game = require('../Game')
var Renderer = require('../Renderer')
var UserInput = require('../UserInput')

module.exports = function (states) {
	var state = {}

	var isLooping = false

	state.create = function () {

		isLooping = true

		var game = new Game(50)
		var renderer = new Renderer(document.body)
		var userInput = new UserInput()

		game.addSnake()

		game.events.on('pre-update', function (wdawd, awdawd){
			var key = userInput.get()
			if(key) {
				game.snakes[0].direction = key
			}
		})

		game.events.on('collission', function (tile1, tile2){
			//todo
		})

		function loop() {

			game.update()
			renderer.draw(game.model)

			if(isLooping) {
				timeout(loop)
			}
		}

		function timeout (cb) {
			window.setTimeout(function (){
				window.requestAnimationFrame(cb)			
			}, 100)
		}

		loop()
	}

	state.destroy = function () {
		isLooping = false
	}

	return state

}