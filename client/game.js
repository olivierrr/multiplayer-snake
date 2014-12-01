
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
  if(direction) cloak.message('keyPress', direction)
}

function findDirection (keycode) {
  var keymap = {
    'up': [38, 87],
    'down': [40, 83],
    'right': [39, 68],
    'left': [37, 65]
  }

  return k = Object.keys(keymap).filter(function (direction) {
    return keymap[direction].indexOf(keycode) !== -1
  })[0] || null
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