
var EventEmitter = require('events').EventEmitter

/**
 * @constructor
 * @param {Number} grid slot count (grid is a suqare)
 */
function Grid2d (size){

  /**
   * @property {Object#EE}
   */
  this.events = Object.create(EventEmitter.prototype)

  /**
   * @property {Number}
   */
  this.size = size

  /**
   * @property {Array#2d}
   */
  this.grid = []

  this.clearGrid()
}

/**
 * @method
 */
Grid2d.prototype.clearGrid = function (){
  for(var x = 0; x < this.size; x++) {
    var row = []
    for(var y = 0; y < this.size; y++) {
      row.push(0)
    }
    this.model.push(row)
  }
}

/**
 * @method
 */
Grid2d.prototype.update = function (){
  this.events.emit('pre-update')
  this.events.emit('update')
  this.events.emit('post-update')
}

module.exports = Grid2d