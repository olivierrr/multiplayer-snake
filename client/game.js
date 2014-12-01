
var Renderer = require('./Renderer')

module.exports = {
  show: show,
  hide: hide,
  draw: draw
}

var $game = document.querySelector('#game-area')
var renderer

function onkeydown (e) {
  var direction = findDirection(e.keyCode)
  if(direction !== null) cloak.message('keyPress', direction)
}

function findDirection (keycode) {

  var keymap = [[38, 87], [39, 68], [40, 83], [37, 65]]

  for(var i=0; i<keymap.length; i++) {
    if(keymap[i].indexOf(keycode) !== -1) return i + 1
  }

  return null
}

function hide () {
  document.removeEventListener('keydown', onkeydown)
  $game.className = 'hidden'
}

function show () {
  $game.className = ''
  document.addEventListener('keydown', onkeydown)
  renderer = renderer || new Renderer($game)
  cloak.message('spawn')
}

function draw (model) {
  if(renderer) renderer.draw(model)
}