
module.exports = function (states) {

	var state = {}

	// temp buttons until danecando does things
	state.create = function () {

		var btn1 = document.createElement('button')
		var btn2 = document.createElement('button')

		btn1.innerHTML = 'singleplayer'
		btn2.innerHTML = 'multiplayer'

		document.body.appendChild(btn1)
		document.body.appendChild(btn2)

		btn1.addEventListener('click', states.go.bind(states, 'singleplayer'))
		btn2.addEventListener('click', states.go.bind(states, 'multiplayer'))

	}

	state.destroy = function () {

		document.body.innerHTML = ''

	}

	return state

}
