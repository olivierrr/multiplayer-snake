
var states = require('state-manager').create()

states.add('mainmenu', require('./mainmenu/index')(states))
states.add('singleplayer', require('./singleplayer/index')(states))
states.add('multiplayer', require('./multiplayer/index')(states))

window.addEventListener('hashchange', resolveLocation)

function resolveLocation () {
  var location = document.location.hash.split('/')[0]
  if(location === '#singleplayer') states.go('singleplayer')
  else if(location === '#multiplayer') {
    if(states.states['multiplayer'] !== states.currentState) states.go('multiplayer')
  }
  else states.go('mainmenu')
}

resolveLocation()