
var Game = require('../Game')
var Renderer = require('../Renderer')

module.exports = function (states) {
	var state = {}

	var isLooping = false

	state.create = function () {

		isLooping = true

		var game = new Game(50)
		var renderer = new Renderer(document.body)

		game.addSnake()

		function timeout () {
			window.setTimeout(function (){
				window.requestAnimationFrame(loop)			
			}, 100)
		}

		function loop() {
			game.update()
			renderer.draw(game.model)
			if(isLooping)timeout()
		}

		loop()
	}

	state.destroy = function () {
		isLooping = false
	}

	return state

}