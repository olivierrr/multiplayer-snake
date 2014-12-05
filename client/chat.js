
module.exports = {
  push: push,
  clear: clear,
  newColor: newColor,
  userList: userList
}

var $elem = document.querySelector('.chat-area')
var $chatWindow = $elem.querySelector('.chat-window')
var $sendMsg = $elem.querySelector('.send-msg')
var $inputMsg = $elem.querySelector('.input-msg')
var $changeNameBtn = $elem.querySelector('.change-name-btn')
var $changeColorBtn = $elem.querySelector('.change-color-btn')
var $userList = $elem.querySelector('.user-list')

function colorize(str, color) {
  console.log('<span style="color:' + color + '">' + str + '</span>')
  return '<span style="color:' + color + '">' + str + '</span>'
}

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

function userList (users) {
  if(!users) return

  $userList.innerHTML = users.map(function (user) {
    console.log('awdawd')
    var str = '<div class="user">' + colorize(user.name, user.color) + ' '
    str += ' ' + user.points
    str += ' ' + user.kills
    str += ' ' + user.deaths
    return str += '</div>'
  }).join(' ')
}

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
  $chatWindow.innerHTML += '<p class="msg"><span class="user" style="color:' + flag + '"> ' + name + ': </span>' + msg + '</p>'
  $chatWindow.scrollTop = $chatWindow.scrollHeight
}

function clear () {
  $chatWindow.innerHTML = ''
}