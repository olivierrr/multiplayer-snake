
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
  return '<span style="color:' + color + '">' + str + '</span>'
}

function tdize(str) {
  return '<td>' + str + '</td>'
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

  str = '<table> <thead> <tr> <th>username</th> <th>points</th> <th>kills</th> <th>deaths</th> </tr> </thead>' 

  users.forEach(function (user) {
    str += '<tr>'
    str += tdize(colorize(user.name, user.color))
    str += tdize(user.points)
    str += tdize(user.kills)
    str += tdize(user.deaths)
    str += '</tr>'
  })

  $userList.innerHTML = (str + '</table>')
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