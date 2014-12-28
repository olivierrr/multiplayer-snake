
var renderer = require('../renderer')

module.exports = {
  show: show,
  hide: hide,
  draw: draw,
  showSpawnBtn: showSpawnBtn,
  hideSpawnBtn: hideSpawnBtn
}

var $game = document.querySelector('#game-area')
var $spawnBtn = $game.querySelector('#spawn-btn')

// keydown/focus hack
$game.tabIndex = 100

$game.addEventListener('keydown', onkeydown)
$game.addEventListener('keydown', hideSpawnBtn)
$spawnBtn.addEventListener('click', hideSpawnBtn)

var lastDirection = null

function onkeydown (e) {
  var direction = findDirection(e.keyCode)
  if(direction && direction !== lastDirection) cloak.message('keyPress', direction)
}

function findDirection (keycode) {
  var keymap = [[38, 87], [39, 68], [40, 83], [37, 65]]
  for(var i=0; i<keymap.length; i++) {
    if(keymap[i].indexOf(keycode) !== -1) return i + 1
  }
  return null
}

function hide () {
  $game.className = 'hidden'
}

function show () {
  $game.className = ''
  lastDirection = null
  renderer.appendTo($game)
  showSpawnBtn()
}

function draw (model) {
  renderer.draw(model)
}

function showSpawnBtn () {
  $spawnBtn.className = ''
}

function hideSpawnBtn (e) {
  if(e && e.keyCode && e.keyCode !== 32) return
  cloak.message('spawn')
  $spawnBtn.className = 'hidden'
  $game.focus()
}
