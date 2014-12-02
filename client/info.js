
var $info = document.querySelector('#info')
var $usersOnlineCount = $info.querySelector('.users-online-count')
var $openRoomsCount = $info.querySelector('.open-rooms-count')
var $ping = $info.querySelector('.ping')

function userCount (count) {
  $usersOnlineCount.innerHTML = count
}

function roomCount (count) {
  $openRoomsCount.innerHTML = count
}

var ping = (function () {

  var startTime = Date.now()

  window.setInterval(function () {
    startTime = Date.now()
    if(cloak.connected()) cloak.message('ping')
  }, 2000)

  return function () {
    $ping.innerHTML = Date.now() - startTime + 'ms'
  }
})()

module.exports = {
  userCount: userCount,
  roomCount: roomCount,
  ping: ping
}