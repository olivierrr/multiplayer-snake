
var cloak = require('cloak')

var Game = require('../shared/Game')
  , Snake = require('../shared/Snake')
  , ai = require('./ai')

module.exports = {
  init: function () {
    var room = this
      , game = this.data.game || (this.data.game = new Game(30))

    // //// ai test ////
    // function randomFoodLocation () {
    //   var foodBlock = game.foods[~~(Math.random()*game.maxFoodsCount)]

    //   if(foodBlock) {
    //     foodBlock = foodBlock.split('-').reverse()
    //     console.log(foodBlock)
    //     return foodBlock
    //   }
    //   else return [10,10]
    // }
    // function getSnakeTarget (snake) {
    //   snake.target = snake.target || randomFoodLocation()
    //   if(snake.target[0]===10 && snake.target[1]===10) snake.target = randomFoodLocation()

    //   console.log(snake.target)
    //   return snake.target
    // }
    // room.data.ai = [new Snake()].map(function (snake) { 
    //   snake.isAi = true 
    //   snake.color = '#FF0000'
    //   snake.user = {
    //     message: function(){},
    //     name: '@AI-'+ ~~(Math.random()*100),
    //     data: {
    //       points: 0,
    //       kills: 0,
    //       deaths: 0
    //     }
    //   }
    //   snake.target = randomFoodLocation()
    //   return snake
    // })
    // game.on('preupdate', function () {
    //   if(room.data.ai) {
    //     room.data.ai.forEach(function (snake) {
    //       if(snake.isAlive === false) {
    //         var coords = room.data.game.getSafeCoords()
    //         snake.spawn(coords.x, coords.y)
    //       }
    //     })
    //   }
    // })
    // game.on('postupdate', function () {
    //   if(room.data.ai) {
    //     room.data.ai.forEach(function (snake) {
    //       ai(game.model, [snake.x, snake.y], snake.direction, getSnakeTarget(snake), function (newDir) {
    //         snake.put(newDir)
    //       })
    //     })
    //   }
    // })
    // game.on('eat', function (snake) {
    //   if(snake.user.name[0]==='@' && snake.user.name[1]==='A' && snake.user.name[2]==='I') {
    //     snake.target = randomFoodLocation()
    //   }
    // })
    // //// ai test ////

    // we start the room paused in case there are 0 players
    game.isPaused = true

    game.on('die', function (snake) {
      snake.user.data.deaths += 1
      snake.user.data.points = 0
      snake.user.message('snake_die', {x: snake.x, y: snake.y})
    })

    game.on('eat', function (snake) {
      snake.user.message('snake_eat', {x: snake.x, y: snake.y})
      snake.user.data.points += 1
    })

    game.on('snake-collision', function (snake1, snake2) {
      snake1.user.message('snake_die', {x: snake1.x, y: snake1.y})
      room.messageMembers('snake_collision', {killed: snake1.user.name, by: snake2.user.name, x: snake1.x, y: snake1.y})
      snake1.user.data.points = 0
      snake1.user.data.deaths += 1
      snake2.user.data.kills += 1
    })

    game.on('self-collision', function (snake) {
      snake.user.message('snake_die', {x: snake.x, y: snake.y})
    })
  },
  pulse: function () {
    var room = this
      , game = this.data.game
      , snakes = getSnakesInRoom(room)

    game.update(snakes)

    room.messageMembers('snakes', snakes.map(snakeToJson))
    room.messageMembers('pulse', game.model)
    room.messageMembers('userList_response', room.getMembers().map(userToJson))
  },
  newMember: function (user) {
    var room = this
      , game = this.data.game

    // resume game in case it was paused as this may be the first user
    game.isPaused = false

    user.message('pulse', game.model)
    cloak.messageAll('listRooms_response', cloak.getRooms(true))
    cloak.messageAll('userCount_response', cloak.userCount())

    user.data.snake = new Snake()
    user.data.snake.color = (user.data.color || (user.data.color = randomColor()))
    user.data.snake.user = user
    user.data.points = 0
    user.data.kills = user.data.kills || 0
    user.data.deaths = user.data.deaths || 0
  },
  memberLeaves: function (user) {
    user.data.snake = null
    cloak.messageAll('listRooms_response', cloak.getRooms(true))
    cloak.messageAll('userCount_response', cloak.userCount())

    // pause game when there are no players in room
    if(this.getMembers().length < 1) {
      this.data.game.isPaused = true
    }
  },
  close: function () {
    var room = this
    room.data.game = null
    room.getMembers().forEach(function (user) {
      user.data.snake = null
      user.data.points = 0
      user.joinRoom(cloak.getLobby())
    })
  }
}

function getSnakeFromUser (user) {
  return user.data.snake 
}

function userToJson (user) {
  return {
    name: user.name,
    color: user.data.color,
    points: user.data.points || 0,
    kills: user.data.kills || 0,
    deaths: user.data.deaths || 0,
  }
}

function snakeToJson(snake){
  return {
    sections: snake.sections,
    name: snake.user.name
  }
}

function getSnakesInRoom (room) {
  return room.getMembers().map(getSnakeFromUser).concat(room.data.ai || [])
}