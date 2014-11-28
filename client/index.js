
;(function(){

  require('./cloak-config')()

	var StateManager = require('state-manager')

	var states = StateManager.create()
	states.add('mainmenu', require('./states/mainmenu')(states))
	states.add('singleplayer', require('./states/singleplayer')(states))
	states.add('multiplayer', require('./states/multiplayer')(states))
  states.add('multiplayer-lobby', require('./states/multiplayer-lobby')(states))

	states.go('singleplayer')

})()
