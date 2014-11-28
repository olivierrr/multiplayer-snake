
;(function(){

	var StateManager = require('state-manager')

	var states = StateManager.create()
	states.add('mainmenu', require('./states/mainmenu')(states))
	states.add('singleplayer', require('./states/singleplayer')(states))
	states.add('multiplayer', require('./states/multiplayer')(states))

	states.go('multiplayer')

})()
