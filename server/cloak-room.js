
var cloak = require('cloak')

var Game = require('../shared/Game')
  , Snake = require('../shared/Snake')
  , ai = require('./ai')

module.exports = {
  init: function () {
    var room = this
    var game = room.data.game = new Game(30)

    // we start the room paused in case there are 0 players
    game.isPaused = true

    game.on('die', function (snake) {
      snake.user.data.deaths += 1
      snake.user.message('snake_die', {x: snake.x, y: snake.y})
    })

    game.on('eat', function (snake) {
      snake.user.message('snake_eat', {x: snake.x, y: snake.y})
      snake.user.data.points += 1
    })

    game.on('snake-collision', function (snake1, snake2) {
      snake1.user.message('snake_die', {x: snake1.x, y: snake1.y})
      room.messageMembers('snake_collision', {killed: snake1.user.name, by: snake2.user.name})
      snake1.user.data.kills += 1
    })

    game.on('self-collision', function (snake) {
      snake.user.message('snake_die', {x: snake.x, y: snake.y})
    })
  },
  pulse: function () {
    var room = this
    var snakes = room.getMembers().map(getSnakeFromUser)
    room.data.game.update(snakes)
    room.messageMembers('pulse', room.data.game.model)
    room.messageMembers('userList_response', room.getMembers().map(userToJson))
  },
  newMember: function (user) {
    var room = this

    // resume game in case it was paused
    room.data.game.isPaused = false

    user.message('pulse', this.data.game.model)
    cloak.messageAll('listRooms_response', cloak.getRooms(true))
    cloak.messageAll('userCount_response', cloak.userCount())

    user.data.snake = new Snake()

    var color = user.data.color || (user.data.color = randomColor())
    user.data.snake.color = color
    user.data.snake.user = user
    user.data.points = user.data.points || 0
    user.data.kills = user.data.kills || 0
    user.data.deaths = user.data.deaths ||0
  },
  memberLeaves: function (user) {
    user.snake = null
    cloak.messageAll('listRooms_response', cloak.getRooms(true))
    cloak.messageAll('userCount_response', cloak.userCount())

    // pause game when there are no players in room
    if(this.getMembers().length < 1) {
      this.data.game.isPaused = true
    }

  },
  close: function () {
    var room = this
    room.getMembers().forEach(function (member) {
      member.joinRoom(cloak.getLobby())
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


    // room.data.ai = [new Snake(), new Snake(), new Snake(), new Snake()].map(function (snake) { 
    //   snake.isAi = true 
    //   snake.color = '#FF0000'
    //   snake.user = {
    //     message: function(){},
    //     data: {
    //       points: 0,
    //       kills: 0,
    //       deaths: 0
    //     }
    //   }
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
    //       ai(game.model, [snake.x, snake.y], snake.direction, [10, 10], function (newDir) {
    //         snake.put(newDir)
    //       })
    //     })
    //   }
    // })