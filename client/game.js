
var Renderer = require('./Renderer')

module.exports = {
  show: show,
  hide: hide,
  draw: draw
}

var $game = document.querySelector('#game-area')
var renderer

document.addEventListener('keydown', onkeydown)

function onkeydown (e) {
  cloak.message('keypress', e.keyCode)
}

function hide () {
  $game.className = 'hidden'
}

function show () {
  $game.className = ''
  renderer = renderer || new Renderer($game)
}

function draw (model) {
  if(renderer) renderer.draw(model)
}