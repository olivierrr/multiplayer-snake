
var Game = require('../Game')
var Renderer = require('../Renderer')
var Snake = require('../Snake')

module.exports = function (states) {
	var state = {}

	state.create = function () {

		var game = new Game(10, 10)
		var renderer = new Renderer(document.body)

		renderer.draw(game.model)
	}

	state.destroy = function () {

	}

	return state

}