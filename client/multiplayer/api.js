var storage = require('./storage')
  , agame = require('./game')
  , EventEmitter = require('events').EventEmitter
  , draw = require('../renderer').draw

module.exports = function(){

  var game = window.game = new EventEmitter()
  var data = newDataFrame()

  game.getName = storage.getName

  game.on('output', function(direction){
    if(typeof direction !== 'string'){
      console.warn('output expects a string!')
      return
    }

    var DIRECTION = {'UP':1,'RIGHT':2,'DOWN':3,'LEFT':4}
    cloak.message('keyPress', DIRECTION[direction.toUpperCase()])
  })

  game.on('spawn', function(){
    agame.hideSpawnBtn()
  })

  game.on('draw', draw)

  cloak._on('message-pulse', function(grid){
    data.grid = grid
    data.foods = getFoods(grid)
    game.emit('input', data)
    data = newDataFrame()
  })

  cloak._on('message-snakes', function(snakes){
    var index = null

    snakes.forEach(function(snake, i){
      snake.direction = [null, 'UP','RIGHT','DOWN','LEFT'][snake.direction]
      if(snake.name === storage.getName()){
        index = i
      }
    })

    if(typeof index === 'number' && index > -1 && snakes[0].name !== storage.getName()){
      var temp = snakes[0]
      snakes[0] = snakes[index]
      snakes[index] = temp
    }

    data.snakes = snakes
  })

  cloak._on('message-snake_collision', function(data){
    if(data.by === storage.getName()){
      data.events.push({type: 'snake-kill', coordinates: {x: data.x, y: data.y}})
    }
  })

  cloak._on('message-snake_eat', function(coordinates){
    data.events.push({type: 'snake-eat', coordinates: coordinates})
  })

  cloak._on('message-snake_die', function(coordinates){
    data.events.push({type: 'snake-die', coordinates: coordinates})
  })

  function newDataFrame(){
    return {
      grid: [[]],
      snakes: [],
      foods: [],
      events: []
    }
  }

  function getFoods(grid){
    var foods = []
    for(var i=0; i<grid.length; i++){
      for(var j=0; j<grid[i].length; j++){
        var block = grid[i][j]
        if(block === 1) foods.push({x:i,y:j})
      }
    }
    return foods
  }
}
