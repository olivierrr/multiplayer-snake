var storage = require('./storage')
  , agame = require('./game')
  , EventEmitter = require('events').EventEmitter

module.exports = function(){

  var game = window.game = new EventEmitter()
  var data = newDataFrame()

  game.on('output', function(direction){
    if(typeof direction !== 'String'){
      console.warn('output expects a string!')
      return
    }

    var DIRECTION = {'UP':1,'RIGHT':2,'DOWN':3,'LEFT':4}
    cloak.message('keyPress', DIRECTION[direction.toUpperCase()])
  })

  game.on('spawn', function(){
    agame.hideSpawnBtn()
  })

  cloak._on('message-pulse', function(grid){
    data.grid = grid
    data.foods = getFoods(grid)
    game.emit('input', data)
    data = newDataFrame()
  })

  cloak._on('message-snakes', function(snakes){
    data.snakes = snakes
  })

  cloak._on('message-snake-collision', function(data){
    if(data.by === storage.getName()){
      data.events.push({type: 'snake-kill', coordinates: {x: data.x, y: data.y}})
    }
  })

  cloak._on('message-snake-eat', function(coordinates){
    data.events.push({type: 'snake-eat', coordinates: coordinates})
  })

  cloak._on('message-snake-die', function(coordinates){
    data.events.push({type: 'snake-die', coordinates: coordinates})
  })

  function newDataFrame(){
    return {
      grid: null,
      snakes: null,
      foods: null,
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

