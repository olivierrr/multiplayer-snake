
var states = require('state-manager').create()

states.add('mainmenu', require('./states/mainmenu')(states))
states.add('singleplayer', require('./states/singleplayer')(states))
states.add('multiplayer', require('./states/multiplayer')(states))

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