
module.exports = {
  userCount: userCount,
  roomCount: roomCount
}

var $info = document.querySelector('#info')
var $usersOnlineCount = $info.querySelector('.users-online-count')
var $openRoomsCount = $info.querySelector('.open-rooms-count')

function userCount (count) {
  $usersOnlineCount.innerHTML = count
}

function roomCount (count) {
  $openRoomsCount.innerHTML = count
}