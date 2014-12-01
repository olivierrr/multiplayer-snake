
module.exports = {
  render: render,
  hide: hide,
  show: show
}

var $lobby = document.querySelector('#lobby-area') 
var $roomList = $lobby.querySelector('.room-list')
var $openRoomsCount = $lobby.querySelector('.open-rooms-count')

function render (rooms) {
  $roomList.innerHTML = ''
  rooms.forEach(function (room) {
    $roomList.innerHTML += '<li><a href="#multiplayer/' + room.id + '">' + room.name + ' - ' + room.users.length + '/' + room.size +'</a></li>'
  })
  $openRoomsCount.innerHTML = rooms.length
}

function hide () {
  $lobby.className = 'hidden'
}

function show () {
  $lobby.className = ''
}
