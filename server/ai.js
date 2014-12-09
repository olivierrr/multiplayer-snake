var Easystar = require('easystarjs')
  , easystar = new Easystar.js()

module.exports = calc

easystar.setAcceptableTiles([0])

function calc (gridModel, startingPos, direction, goalPos, callback) {

  var grid = gridModel.slice(0)

  var behindSnake = getPosBehind(startingPos[0], startingPos[1], direction)
  if(behindSnake && grid[behindSnake[0]]) {
    grid[behindSnake[0]][behindSnake[1]] = 1
  }

  easystar.setGrid(grid)

  easystar.findPath(startingPos[0], startingPos[1], goalPos[0], goalPos[1], function (path) {
    callback(path[1])
  })

  easystar.calculate()
}

function getPosBehind(x, y, direction) {
  if(direction == 1) return [x, y-1]
  if(direction == 2) return [x-1, y]
  if(direction == 3) return [x, y+1]
  if(direction == 4) return [x+1, y]
  return false
}

// // test
// calc([[0,0,1,0,0],
//       [0,0,1,0,0],
//       [0,0,1,0,0],
//       [0,0,1,0,0],
//       [0,0,0,0,0]], [0, 1], 1, [3,3], function (a) {console.log(a)} )
