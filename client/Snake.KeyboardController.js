
/**
 * KeyboardController
 *
 * @constructor
 *
 * expects a public window object to attach key handlers to
 */
function KeyboardController (snake){

	/**
	 * @property {Object#Snake}
	 */
	this.snake = snake

	/**
	 * @property {Array#keyCodes}
	 */
	this.lastKey = []

	this.boot()

}

/**
 * @method
 *
 * attaches dom event handlers
 */
KeyboardController.prototype.boot = function (pos){

	if(window) {
		var self = this
		window.addEventListener('keydown', function (e) {
			self.lastKey.unshift(e.keyCode)
		})
	}

}

/**
 * @method
 *
 * called every update lewp
 */
KeyboardController.prototype.tick = function (){

	if(this.lastKey.length > 1) {

		var dir = findDirection(this.lastKey[1])
		if(dir) this.snake.direction = dir
		this.lastKey = [this.lastKey[0]]

	} else if (this.lastKey.length === 1) {

		var dir = findDirection(this.lastKey[0])
		if(dir) this.snake.direction = dir

		this.lastKey = []
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