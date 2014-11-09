
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
	 * @property {Integer#keyCode}
	 */
	this.lastKey

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
			self.lastKey = e.keyCode
		})
	}

}

/**
 * @method
 *
 * called every update lewp
 */
KeyboardController.prototype.tick = function (){

	var keymap = {
		'up': [38, 87],
		'down': [40, 83],
		'right': [39, 68],
		'left': [37, 65]
	}

	if(this.lastKey) {

		var self = this

		var k = Object.keys(keymap).filter(function (direction) {
			return keymap[direction].indexOf(self.lastKey) !== -1
		})[0]

		if(k) this.snake.direction = k

	}

	this.lastKey = null

}

module.exports = KeyboardController