
/**
 * @constructor
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
	this.color = '#28FB69'

	/**
	 * @property {Array}
	 */
	this.queue = []

}

/**
 * @method
 */
Snake.prototype.put = function (direction){

  if([1,2,3,4].indexOf(direction) !== -1) this.queue.unshift(direction)

}

/**
 * @method
 */
Snake.prototype.updateDirection = function (){

	var newDirection = null

  if(this.queue.length > 1) {
    newDirection = this.queue[1]
    this.queue = [this.queue[0]]
  } else if (this.queue.length === 1) {
    newDirection = this.queue.pop()
  } else return

	if(this.direction === 1 && newDirection === 3) return
	else if(this.direction === 2 && newDirection === 4) return
	else if(this.direction === 3 && newDirection === 1) return
	else if(this.direction === 4 && newDirection === 2) return
	else this.direction = newDirection

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
 * update snakes `direction` using queue
 * move snake in the `direction` its facing
 */
Snake.prototype.update = function (){

	this.updateDirection()

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
 * reset all values to default and set head position
 */
Snake.prototype.spawn = function(x, y) {

	this.toAdd = 0
	this.x = x
	this.y = y
	this.direction = ~~(Math.random()*4)+1
	this.sections = [[x, y]]
	this.isAlive = true

}

/**
 * @method
 */
Snake.prototype.kill = function() {

	this.isAlive = false

}

module.exports = Snake