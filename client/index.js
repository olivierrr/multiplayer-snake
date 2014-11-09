
;(function(){

	var StateManager = require('./StateManager')

	var states = new StateManager()
	states.add('mainmenu', require('./states/mainmenu')(states))
	states.add('singleplayer', require('./states/singleplayer')(states))
	states.add('multiplayer', require('./states/multiplayer')(states))

	states.go('mainmenu')

})()
