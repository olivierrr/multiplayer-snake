
var Game = require('../Game')
var Renderer = require('../Renderer')

module.exports = function (states) {
	var state = {}

	state.create = function () {

		var game = new Game(50)
		var renderer = new Renderer(document.body)

		game.addSnake()
		game.update()

		renderer.draw(game.model)

	}

	state.destroy = function () {

	}

	return state

}