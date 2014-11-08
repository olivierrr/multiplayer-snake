
;(function(){

	var Snake = require('./Snake')
	var StateManager = require('./StateManager')
	var Game = require('./Game')
	var Renderer = require('./Renderer')

	var states = new StateManager()
	states.add('mainmenu', require('./states/mainmenu')())
	states.add('singleplayer', require('./states/singleplayer')())
	states.add('multiplayer', require('./states/multiplayer')())

	states.go('mainmenu')

})()
