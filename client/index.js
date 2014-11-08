
;(function(){

	var Snake = require('./Snake')
	var StateManager = require('./StateManager')
	var Game = require('./Game')
	var Renderer = require('./Renderer')

	var renderer = new Renderer(document.body)

	renderer.draw()

})()
