
var Snake = require('./Snake')

/**
 * Game
 *
 * @constructor
 *
 * @param {Number} grid slot count (grid is a suqare)
 */
function Game (size){

	/**
	 * @property {Number}
	 */
	this.size = size

	/**
	 * @property {Array}
	 */
	this.model = []

	/**
	 * @property {Array}
	 */
	this.snakes = []

	/**
	 * @property {isPaused}
	 */
	this.isPaused = false

	// boot
	this.reset()
}

/**
 * @method
 */
Game.prototype.reset = function (){

	for(var i=0; i<this.size; i++) {

		var row = []

		for(var j=0; j<this.size; j++) {
			row.push(0)
		}

		this.model.push(row)
	}

}

/**
 * @method
 *
 * @todo collission logic
 * 
 * updates all snakes
 */
Game.prototype.update = function (){

	var self = this

	for(var i=0; i<this.model.length; i++) {
		for(var j=0; j<this.model[i].length; j++) {
			this.model[i][j] = 0
		}
	}

	if(this.isPaused === false) {

		for(var i=0; i<this.snakes.length; i++) {
			this.snakes[i].move()

			this.snakes[i].snake.forEach(function (section) {
				self.model[section[0]][section[1]] = 1
			})
		}

	}

	return this.state
}

/**
 * @method
 *
 * @todo direction should be an integer.
 */
Game.prototype.addSnake = function (){

	var direction = ['left', 'right', 'up', 'down'][randInt(0,3)]
	var x = randInt(0, this.size)
	var y = randInt(0, this.size)

	this.snakes.push(new Snake(x, y, direction))

	function randInt (min, max){
		return Math.round(Math.random() * (max - min) + min)
	}

}

module.exports = Game