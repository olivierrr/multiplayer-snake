
/**
 * @constructor
 * @param {Hash} - initial snake position and direction
 */
function Snake (){

	/**
	 * @property {Number}
	 */
	this.x

	/**
	 * @property {Number}
	 */
	this.y

	/**
	 * @property {String}
	 */
	this.direction

	/**
	 * @property {Array}
	 */
	this.sections

	/**
	 * @property {Number}
	 */
	this.toAdd = 0

	/**
	 * @property {Boolean}
	 */
	this.isAlive = false

}

/**
 * @method
 * @param {Hash} - x, y, position
 */
Snake.prototype.setPos = function (pos){

	this.x = pos.x
	this.y = pos.y
	this.direction = pos.direction
	this.sections = [[pos.x, pos.y]]

}

/**
 * @method
 * extend the length of the snake, for example when it eats.
 */
Snake.prototype.extend = function (){

	this.toAdd += 1

}

/**
 * @method
 * move snake in the `direction` its facing
 */
Snake.prototype.move = function (){

	if(this.direction === 'left') this.x -= 1
	else if(this.direction === 'right') this.x += 1
	else if(this.direction === 'up') this.y -= 1
	else if(this.direction === 'down') this.y += 1

	if(this.toAdd > 0) this.toAdd-=1
	else this.sections.shift()
	this.sections.push([this.x, this.y])

}

/**
 * @method
 */
Snake.prototype.spawn = function(pos) {

	this.isAlive = true
	this.setPos(pos)

}

/**
 * @method
 */
Snake.prototype.kill = function() {

	this.isAlive = false

}

module.exports = Snake