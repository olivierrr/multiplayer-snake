var id = 0

module.exports = createGame

function Game() {
  this.id = id++
  this.created = new Date
  this.players = {}
}

function createGame() {
  return new Game()
}
