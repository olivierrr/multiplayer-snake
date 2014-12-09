var Easystar = require('easystarjs')
  , easystar = new Easystar.js()

module.exports = calc

easystar.setAcceptableTiles([0])

function calc (gridModel, startingPos, direction, goalPos, callback) {

  if(gridModel[startingPos[0]] == undefined || gridModel[startingPos[0]][startingPos[1]] == undefined) return randomDirection()

  // making a copy of gridmodel
  var grid = gridModel.slice(0).map(function (row) { return row.slice(0) })

  // adding an unwalkable block behind the snake because snakes can't move 'back'
  var behindSnake = getPosBehind(startingPos[0], startingPos[1], direction)
  if(behindSnake && grid[behindSnake[0]]) {
    grid[behindSnake[0]][behindSnake[1]] = 1
  }

  easystar.setGrid(grid)

  easystar.findPath(startingPos[0], startingPos[1], goalPos[0], goalPos[1], function (path) {
    if(path && path[1]) {
      callback(resolveDirection(startingPos, [path[1].x, path[1].y]))
    } else {
      callback(randomDirection())
    }
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

function resolveDirection (before, after) {
  if(before[0] > after[0]) return 1
  if(before[1] > after[1]) return 2
  if(before[0] < after[0]) return 3
  if(before[1] < after[1]) return 4
  return 1
}

function randomDirection () {
  return (~~(Math.random()*4))+1
}
