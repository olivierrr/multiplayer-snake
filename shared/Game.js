
/**
 * @constructor
 * @param {Number} grid slot count (grid is a suqare)
 */
function Game (size){

	/**
	 * @property {Object#Hash}
	 */
	this.events = {}

	/**
	 * @property {Number}
	 */
	this.size = size

	/**
	 * @property {Array#2d}
	 */
	this.model = []

	/**
	 * @property {Integer}
	 */
	this.maxFoodsCount = 5

	/**
	 * @property {Array}
	 */
	this.foods = []

	/**
	 * @property {Boolean}
	 */
	this.isPaused = false

	this.boot()
}

/**
 * @method
 * generates the grid `model`
 */
Game.prototype.boot = function (){

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
 * set all tiles on grid `model` to 0
 */
Game.prototype.resetGrid = function (){

	for(var i=0; i<this.size; i++) {
		for(var j=0; j<this.size; j++) {
			this.model[i][j] = 0
		}
	}

}

/**
 * @method
 * update model
 * @param {Array}
 * @todo rewrite
 */
Game.prototype.update = function (snakes){

	if(!snakes) return

	if(this.isPaused === false) {
		this.emit('preupdate', snakes)

		var self = this

		this.resetGrid()

		while(this.foods.length < this.maxFoodsCount) {
			this.addFood()
		}
		for(var i=0; i<this.foods.length; i++) {
			var food = this.foods[i].split('-')
			self.model[food[0]][food[1]] = 1
		}

		this.snakeCollision(snakes)

		for(var i=0; i<snakes.length; i++) {
			var snake = snakes[i]

			if(snake.isAlive) {
				snake.update()

				// snake collides with walls
				if(snake.x < 0 || snake.x >= this.size || snake.y < 0 || snake.y >= this.size){
					snake.kill()
					this.emit('die', snake)
					continue;
				}

				// snake collides with food
				if(this.model[snake.x][snake.y] === 1) {
					snake.extend()
					this.emit('eat', snake)
					this.foods.splice(this.foods.indexOf(snake.x+'-'+snake.y), 1)
				}

				// add snake to grid model
				snake.sections.forEach(function (section) {
					if(section)	{
						self.model[section[0]][section[1]] = snake.color
					}
				})
			}

			this.emit('postupdate', snakes)
		}

		while(this.foods.length < this.maxFoodsCount) {
			this.addFood()
		}
		for(var i=0; i<this.foods.length; i++) {
			var food = this.foods[i].split('-')
			self.model[food[0]][food[1]] = 1
		}

	}
}

/**
 * @method
 */
Game.prototype.snakeCollision = function(snakes) {

	for(var i=0; i<snakes.length; i++) {
		var snake = snakes[i]
		if(!snake.isAlive) continue

		for(var j=0; j<snakes.length; j++) {
			var other = snakes[j]
			if(!other.isAlive) continue

			if(snake === other) {
				this.selfCollision(snake)
				continue
			}

			for(var k=0; k<other.sections.length; k++) {
				var section = other.sections[k]

				if(section[0] === snake.x && section[1] === snake.y) {
					snake.kill()
					this.emit('snake-collision', snake, other)
					this.emit('die', snake)
					break
				}
			}
		}
	}

}

/**
 * @method
 */
Game.prototype.selfCollision = function(snake) {

	for(var i=0; i<snake.sections.length-1; i++) {
		var section = snake.sections[i]
		if(section[0] === snake.x && section[1] === snake.y) {
			snake.kill()
			this.emit('self-collision', snake)
			this.emit('die', snake)
			return
		}
	}

}

/**
 * @method
 * pushes a food block to a random location within the grid model
 */
Game.prototype.addFood = function (){

	var randomPos = this.getRandCoordsWithin()
	this.foods.push(randomPos.x + '-' + randomPos.y)

}

/**
 * @method
 */
Game.prototype.getRandCoordsWithin = function (){

	var x, y

	do {
		x = ~~(Math.random() * this.size)
		y = ~~(Math.random() * this.size)
	} while (this.model[x][y] !== 0)

	return {
		x: x, 
		y: y
	}

}

/**
 * @method
 */
Game.prototype.getSafeCoords = function (){

	var x, y

	do {
		x = ~~(Math.random()*(this.size/2) + this.size*.25)
		y = ~~(Math.random()*(this.size/2) + this.size*.25)
	} while (this.model[x][y] !== 0)

	return {
		x: x,
		y: y
	}
}

/**
 * @method
 */
Game.prototype.on = function (eventName, handler) {
	if(!eventName || !handler) return
	(this.events[eventName] || (this.events[eventName] = [])).push(handler)
}

/**
 * @method
 */
Game.prototype.emit = function (eventName) {
	if(!eventName || !this.events[eventName]) return
	var args = [].slice.call(arguments, 1)
	this.events[eventName].forEach(function(handler){handler.apply(null, args)})
}

module.exports = Game
