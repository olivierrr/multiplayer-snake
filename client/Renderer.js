
/**
 * @constructor
 * @param {Object#node}
 */
function Renderer (container){

	/**
	 * @property {Object#node}
	 */
	this.container = container || document.body

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
 * attach canvas to `container`
 */
Renderer.prototype.init = function() {

	this.canvas = document.createElement('canvas')
	this.ctx = this.canvas.getContext('2d')
	this.container.appendChild(this.canvas)

	var self = this
	function onresize() {
		self.width = self.canvas.width = self.container.offsetWidth
		self.height = self.canvas.height = self.container.offsetHeight
	}

	onresize()
	window.addEventListener('resize', onresize)

}

/**
 * @method
 * draws a square per 'slot'
 * color depends on model[x][y] value
 * grid size depends on model.length
 * @todo refactor...
 */
Renderer.prototype.draw = function(model) {

	if(!model) return

	var ctx = this.ctx
	var gridSize = model.length
	var smllst = (this.width > this.height ? this.height : this.width)
	var slotsize = ~~(smllst/gridSize)
	var size = slotsize * gridSize

	var verticalPadding = ~~(this.height/2 - size/2)
	var horizontalPadding = ~~(this.width/2 - size/2)

	ctx.fillStyle = '#9DAEB5'
	ctx.fillRect(0, 0, this.width, this.height)

	var BLOCKS = {
		0: 'white', // 'empty'
		1: '#0070B2', // 'user'
		2: '#2EE046'  // 'food'
	}

	for(var i=0; i<model.length; i++) {
		for(var j=0; j<model[i].length; j++) {
			var color = BLOCKS[model[i][j]]
			fillSlot(i, j, color)
		}
	}

	function fillSlot (x, y, color) {
		ctx.fillStyle = color || '#FF0000'
		ctx.fillRect(x*slotsize+1 + horizontalPadding, y*slotsize+1 + verticalPadding, slotsize-1, slotsize-1)
	}

}

module.exports = Renderer