
module.exports = function (states) {

	var state = {}

	var $elem = document.querySelector('#mainmenu')
	var $btn1 = $elem.querySelector('#singleplayer-btn')
	var $btn2 = $elem.querySelector('#multiplayer-btn')

	$btn1.addEventListener('click', states.go.bind(states, 'singleplayer'))
	$btn2.addEventListener('click', states.go.bind(states, 'multiplayer-lobby'))

	state.create = function () {
		$elem.className = ''
	}

	state.destroy = function () {
		$elem.className = 'hidden'
	}

	return state

}
