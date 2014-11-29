
module.exports = function (states) {

	var $elem = document.querySelector('#mainmenu')
	var $btn1 = $elem.querySelector('#singleplayer-btn')
	var $btn2 = $elem.querySelector('#multiplayer-btn')

	$btn1.addEventListener('click', states.go.bind(states, 'singleplayer'))
	$btn2.addEventListener('click', states.go.bind(states, 'multiplayer-lobby'))

	return {
		create: function () {
			$elem.className = ''
		},
		destroy: function () {
			$elem.className = 'hidden'
		}
	}

}
