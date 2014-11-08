
/**
 * Game
 *
 * @constructor
 *
 * @param {Number} grid rows count
 * @param {Number} grid columns count
 */
function Game (sizeX, sizeY){

	/**
	 * @property {Number}
	 */
	this.sizeX = sizeX

	/**
	 * @property {Number}
	 */
	this.sizeY = sizeXY

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

	for(var i=0; i<this.sizeX; i++) {

		var row = []

		for(var j=0; j<this.sizeY; j++) {
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

	if(this.isPaused === false) {

		for(var i=0; i<this.snakes; i++) {
			this.snakes[i].move()
		}

	}

	return this.state
}

module.exports = Game