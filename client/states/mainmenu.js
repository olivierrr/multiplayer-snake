
module.exports = function (states) {

	var $elem = document.querySelector('#mainmenu')

	return {
		create: function () {
			$elem.className = ''
		},
		destroy: function () {
			$elem.className = 'hidden'
		}
	}

}
