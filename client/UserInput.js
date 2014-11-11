
/**
 * @constructor
 * expects a public window object to attach key handlers to
 */
function KeyboardController (){

	/**
	 * @property {Array#keyCodes}
	 */
	this.lastKey = []

	this.boot()

}

/**
 * @method
 * attaches dom event handlers
 */
KeyboardController.prototype.boot = function (pos){

	if(window) {
		var self = this
		window.addEventListener('keydown', function (e) {
			if(typeof self.lastKey != 'object') self.lastKey = []
			self.lastKey.unshift(e.keyCode)
		})
	}

}

/**
 * @method
 * called every update lewp
 */
KeyboardController.prototype.get = function (){

	if(this.lastKey.length > 1) {

		var dir = findDirection(this.lastKey[1])
		if(dir) {
			this.lastKey = [this.lastKey[0]]
			return dir
		}

	} else if (this.lastKey.length === 1) {

		var dir = findDirection(this.lastKey.pop())
		if(dir) {
			return dir
		}

		this.lastKey = null
	}

	else {
		return null
	}

	function findDirection (keycode) {

		var keymap = {
			'up': [38, 87],
			'down': [40, 83],
			'right': [39, 68],
			'left': [37, 65]
		}

		return k = Object.keys(keymap).filter(function (direction) {
			return keymap[direction].indexOf(keycode) !== -1
		})[0] || null
	}

}

module.exports = KeyboardController