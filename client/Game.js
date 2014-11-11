
var Snake = require('./Snake')
var KeyboardController = require('./Snake.KeyboardController')

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
	 * @property {Array}
	 */
	this.model = []

	/**
	 * @property {Array}
	 */
	this.snakes = []

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
 * @todo combine with `boot` method
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
Game.prototype.update = function (){

	if(this.isPaused === false) {

		var self = this

		this.resetGrid()

		// add food to model
		for(var i=0; i<this.foods.length; i++) {
			var food = this.foods[i]
			self.model[food[0]][food[1]] = 2
		}

		for(var i=0; i<this.snakes.length; i++) {
			var snake = this.snakes[i]
			snake.move()

			// snake collides with walls
			if(snake.x < 0 || snake.x >= this.size || snake.y < 0 || snake.y >= this.size){
				snake.setPos(this.randSnakePos())
			}

			// snake collides with food
			var foodColl = this.foods.filter(function (food) {
				return (food[0] === snake.x && food[1] === snake.y)
			})[0]
			if(foodColl) {
				snake.extend()
				this.foods.splice(this.foods.indexOf(foodColl), 1)
			}

			// //snake collides with itself
			// snake.sections.forEach(function (section, i) {
			// 	if(i>0 && section[0] === snake.x && section[1] === snake.y) {
			// 		snake.setPos(self.randSnakePos())
			// 	}
			// })

			// add snake to grid model
			snake.sections.forEach(function (section) {
				if(section)	self.model[section[0]][section[1]] = 1
			})
		}

		while(this.foods.length < this.maxFoodsCount) {
			this.addFood()
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
 */
Game.prototype.addSnake = function (){

	this.snakes.push(new Snake(this.randSnakePos(), KeyboardController))

}

/**
 * @method
 * pushes a food block to a random location within the grid model
 */
Game.prototype.addFood = function (){

	this.foods.push([ ~~(Math.random()*this.size) ,  ~~(Math.random()*this.size) ]) 

}

Game.prototype.removeFood = function (){



}

module.exports = Game