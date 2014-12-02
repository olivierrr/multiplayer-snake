
module.exports = {
  render: render,
  hide: hide,
  show: show
}

var $lobby = document.querySelector('#lobby-area') 
var $roomList = $lobby.querySelector('.room-list')
var $createRoom = $lobby.querySelector('#create-room-btn')

$createRoom.addEventListener('click', function () {
  smoke.prompt('new room name', function(input){
    if (input) cloak.message('createRoom', {roomName: input})
  }, {
    ok: "create",
    cancel: "cancel",
    reverseButtons: true
  });
})

function render (rooms) {
  $roomList.innerHTML = ''
  rooms.forEach(function (room) {
    $roomList.innerHTML += '<li><a href="#multiplayer/' + room.id + '">' + room.name + ' - ' + room.users.length + '/' + room.size +'</a></li>'
  })
}

function hide () {
  $lobby.className = 'hidden'
}

function show () {
  $lobby.className = ''
}
