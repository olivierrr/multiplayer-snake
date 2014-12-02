
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
	this.sections = []

	/**
	 * @property {Number}
	 */
	this.toAdd = 0

	/**
	 * @property {Boolean}
	 */
	this.isAlive = false

	/**
	 * @property {String}
	 */
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);

}

/**
 * @method
 * @param {Number}
 * @param {Number}
 */
Snake.prototype.setPos = function (x, y){

	this.x = x
	this.y = y
	this.direction = ~~(Math.random()*4)+1
	this.sections = [[x, y]]

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

	if(this.direction === 4) this.x -= 1
	else if(this.direction === 2) this.x += 1
	else if(this.direction === 1) this.y -= 1
	else if(this.direction === 3) this.y += 1

	if(this.toAdd > 0) this.toAdd-=1
	else this.sections.shift()
	this.sections.push([this.x, this.y])

}

/**
 * @method
 */
Snake.prototype.spawn = function(x, y) {

	this.isAlive = true
	this.setPos(x, y)

}

/**
 * @method
 */
Snake.prototype.kill = function() {

	this.isAlive = false

}

module.exports = Snake