
module.exports = function (states) {

	var state = {}

	var elem = document.getElementById('home-menu')
	var btn1 = document.getElementById('singleplayer-btn')
	var btn2 = document.getElementById('multiplayer-btn')

	btn1.addEventListener('click', states.go.bind(states, 'singleplayer'))
	btn2.addEventListener('click', states.go.bind(states, 'multiplayer'))

	state.create = function () {
		elem.className = ''
	}

	state.destroy = function () {
		elem.className = 'hidden'
	}

	return state

}
