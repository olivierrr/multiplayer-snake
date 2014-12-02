
var Renderer = require('./Renderer')

module.exports = {
  show: show,
  hide: hide,
  draw: draw,
  showSpawnBtn: showSpawnBtn
}

var $game = document.querySelector('#game-area')
var $spawnBtn = $game.querySelector('#spawn-btn')
var renderer
var lastDirection = null

function onkeydown (e) {
  var direction = findDirection(e.keyCode)
  if(direction !== null && direction !== lastDirection) cloak.message('keyPress', direction)
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
  lastDirection = null
  document.addEventListener('keydown', onkeydown)
  renderer = renderer || new Renderer($game)
  showSpawnBtn()
}

function draw (model) {
  if(renderer) renderer.draw(model)
}

function showSpawnBtn () {
  $spawnBtn.className = ''
  $spawnBtn.addEventListener('click', function () {
    cloak.message('spawn')
    $spawnBtn.className = 'hidden'
  })
}