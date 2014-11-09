
var Snake = require('./Snake')
var KeyboardController = require('./Snake.KeyboardController')

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
 * 
 * updates all snakes
 */
Game.prototype.update = function (){

	if(this.isPaused === false) {

		var self = this

		this.resetGrid()

		
		while(this.foods.length < this.maxFoodsCount) {
			this.addFood()
		}

		for(var i=0; i<this.foods.length; i++) {
			var food = this.foods[i]
			self.model[food[0]][food[1]] = 2
		}


		for(var i=0; i<this.snakes.length; i++) {
			var snake = this.snakes[i]

			// snake collides with walls
			if(snake.x <= 0 || snake.x >= this.size-1 || snake.y <= 0 || snake.y >= this.size-1){
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

			snake.move()

			snake.sections.forEach(function (section) {
				if(section)	self.model[section[0]][section[1]] = 1
			})
		}
	}

	return this.state
}

/**
 * @method
 * @return {array}
 *
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
 */
Game.prototype.addFood = function (){

	this.foods.push([ ~~(Math.random()*this.size) ,  ~~(Math.random()*this.size) ]) 

}

Game.prototype.removeFood = function (){



}

module.exports = Game