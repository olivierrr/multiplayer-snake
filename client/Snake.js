
/**
 * Snake
 *
 * @constructor
 */
function Snake (x, y, direction, controller){

	/**
	 * @property {Number}
	 */
	this.x = x

	/**
	 * @property {Number}
	 */
	this.y = y

	/**
	 * @property {String}
	 */
	this.direction = direction

	/**
	 * @property {?}
	 */
	this.controller //= controller(this)

	/**
	 * @property {Array}
	 */
	this.snake = [[x, y]]

	/**
	 * @property {Array}
	 */
	this.toAdd = 0

	/**
	 * @property {Boolean}
	 */
	this.isAlive = true

}

/**
 * @method
 *
 * reset values, also
 */
Snake.prototype.reset = function (x, y, direction){

	this.x = x
	this.y = y
	this.direction = direction

}

/**
 * @method
 *
 * extend the length of the snake, for example when it eats.
 */
Snake.prototype.extend = function (){

	this.toAdd += 1

}

/**
 * @method
 *
 * move snake in the `direction` its facing
 */
Snake.prototype.move = function (){

	if(this.direction === 'left') this.x -= 1
	else if(this.direction === 'right') this.x += 1
	else if(this.direction === 'up') this.y -= 1
	else if(this.direction === 'down') this.y += 1

	if(this.toAdd < 1) this.toAdd-=1
	else this.snake.shift()
	this.snake.push([this.x, this.y])

}

module.exports = Snake