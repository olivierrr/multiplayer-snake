
/**
 * @constructor
 * @param {Number} grid slot count (grid is a suqare)
 */
function Game (size){

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
	 * @property {isPaused}
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
 * updates all snakes
 * @todo rewrite
 */
Game.prototype.update = function (snakes){

	if(this.isPaused === false) {
		var self = this

		this.resetGrid()

		while(this.foods.length < this.maxFoodsCount) {
			this.addFood()
		}

		// add food blocks to model
		for(var i=0; i<this.foods.length; i++) {
			var food = this.foods[i].split('-')
			self.model[food[0]][food[1]] = 2
		}

		for(var i=0; i<snakes.length; i++) {
			var snake = snakes[i]

			if(snake.isAlive) {
				snake.move()

				// snake collides with walls
				if(snake.x < 0 || snake.x >= this.size || snake.y < 0 || snake.y >= this.size){
					snake.setPos(this.randSnakePos())
				}

				// snake collides with food
				if(this.model[snake.x][snake.y] === 2) {
					snake.extend()
					this.foods.splice(this.foods.indexOf(snake.x+'-'+snake.y), 1)
				}

				// add snake to grid model
				snake.sections.forEach(function (section) {
					if(section)	self.model[section[0]][section[1]] = 1
				})
			}
		}

	}
}

/**
 * @method
 * @return {Hash}
 * @todo direction should be an integer.
 */
Game.prototype.randSnakePos = function (){

	function randInt (min, max){
		return Math.round(Math.random() * (max - min) + min)
	}

	return {
		x: randInt(this.size*.25, this.size*.75),
		y: randInt(this.size*.25, this.size*.75),
		direction: ['left', 'right', 'up', 'down'][randInt(0,3)]
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

	return {
		x: ~~(Math.random()*this.size), 
		y: ~~(Math.random()*this.size)
	}

}

module.exports = Game