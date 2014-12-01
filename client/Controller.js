
/**
 * @constructor
 */
function Controller (){

  /**
   * @property {Array#keyCodes}
   */
  this.dirs = []

}

/**
 * @method
 */
Controller.prototype.put = function (direction){

  if([1,2,3,4].indexOf(direction) === -1) return
  this.dirs.unshift(direction)

}

/**
 * @method
 */
Controller.prototype.get = function (){

  if(this.dirs.length > 1) {
    var dir = this.dirs[1]
    this.dirs = [this.dirs[0]]
    return dir
  } else if (this.dirs.length === 1) {
    return this.dirs.pop()
  }
  else {
    return null
  }

}

module.exports = Controller