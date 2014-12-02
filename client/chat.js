
module.exports = {
  push: push,
  clear: clear,
  newColor: newColor
}

var $elem = document.querySelector('.chat-area')
var $chatWindow = $elem.querySelector('.chat-window')
var $sendMsg = $elem.querySelector('.send-msg')
var $inputMsg = $elem.querySelector('.input-msg')
var $changeNameBtn = $elem.querySelector('.change-name-btn')
var $changeColorBtn = $elem.querySelector('.change-color-btn')

$inputMsg.addEventListener('keydown', function (e) { 
  if(e.keyCode === 13) sendChatMsg()
})

$sendMsg.addEventListener('click', function () {
  sendChatMsg()
})

$changeNameBtn.addEventListener('click', function () {
  smoke.prompt('enter new name', function(input){
    if (input) cloak.message('changeUsername', input)
  }, {
    ok: "submit",
    cancel: "cancel",
    reverseButtons: true
  })
})

$changeColorBtn.addEventListener('click', function () {
  cloak.message('changeColor')
})

function newColor (color) {
  $changeColorBtn.style.background = color
}

function sendChatMsg () {
  var msg = $inputMsg.value.trim()
  if(msg === '' || msg.length > 255) return
  else cloak.message('chat', msg)
  $inputMsg.value = ''
}

function push (name, msg, flag) {
  $chatWindow.innerHTML += '<p class="msg"><span class="user">' + name + ': </span>' + msg + '</p>'
  $chatWindow.scrollTop = $chatWindow.scrollHeight
}

function clear () {
  $chatWindow.innerHTML = ''
}