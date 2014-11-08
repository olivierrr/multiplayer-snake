
/**
 * Renderer
 *
 * @constructor
 *
 * @param {Object#node}
 */
function Renderer (container){

	/**
	 * @property {Object#node}
	 */
	this.container = container

	/**
	 * @property {Number}
	 */
	this.width = 500

	/**
	 * @property {Number}
	 */
	this.height = 500

	/**
	 * @property {Object#node#canvas}
	 */
	this.canvas

	/**
	 * @property {Object#2dContext}
	 */
	this.ctx

	// boot
	this.init()

}

/**
 * @method
 */
Renderer.prototype.init = function() {

	this.canvas = document.createElement('canvas')
	this.ctx = this.canvas.getContext('2d')

	this.container.appendChild(this.canvas)

	// should be in css. duh
	document.body.style.height = window.innerHeight + 'px'
	document.body.style.overflowX = 'hidden'
	document.body.style.overflowY = 'hidden'
	document.body.style.margin = 0

	this.width = this.canvas.width = this.container.offsetWidth
	this.height = this.canvas.height = this.container.offsetHeight

}

/**
 * @method
 */
Renderer.prototype.draw = function(model) {

	var ctx = this.ctx

	var WIDTH = this.width
	var HEIGHT = this.height

	ctx.clearRect(0, 0, WIDTH, HEIGHT)

	var largest = (WIDTH > HEIGHT ? HEIGHT : WIDTH)
	var slotsize = ~~(largest/40)

	largest = slotsize*40 + 1

	for (var x = 0.5; x < largest; x += slotsize) {
		ctx.moveTo(x, 0)
		ctx.lineTo(x, largest)
	}
	for (var y = 0.5; y < largest; y += slotsize) {
		ctx.moveTo(0, y)
		ctx.lineTo(largest, y)
	}

	ctx.strokeStyle = '#9C9C9C'
	ctx.stroke()

	if(model) {

		//todo

	}

}

module.exports = Renderer