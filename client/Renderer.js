
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
 *
 * attach canvas to `container`
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
 * 
 * draws a square per 'slot'
 * color depends on model[x][y] value
 * grid size depends on model.length
 *
 * @todo refactor...
 */
Renderer.prototype.draw = function(model) {

	if(!model) return

	var ctx = this.ctx
	var gridSize = model.length
	var smllst = (this.width > this.height ? this.height : this.width)
	var slotsize = ~~(smllst/gridSize)
	smllst = slotsize*gridSize

	ctx.clearRect(0, 0, this.width, this.height)

	var BLOCKS = {
		0: '#2D2D2D', // 'empty'
		1: '#0070B2'  // 'user'
	}

	for(var i=0; i<model.length; i++) {
		for(var j=0; j<model[i].length; j++) {
			var color = BLOCKS[model[i][j]]
			fillSlot(i, j, color)
		}
	}

	function fillSlot (x, y, color) {
		ctx.fillStyle = color || '#FF0000'
		ctx.fillRect(x*slotsize+1, y*slotsize+1, slotsize-1, slotsize-1)
	}

}

module.exports = Renderer