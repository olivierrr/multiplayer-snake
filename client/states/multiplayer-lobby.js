
module.exports = function (states) {

  var state = {}

  var $elem = document.querySelector('#lobby')
  var $roomList = $elem.querySelector('.room-list')
  var $usersOnlineCount = $elem.querySelector('.users-online-count')
  var $openRoomsCount = $elem.querySelector('.open-rooms-count')

  state.create = function () {
    $elem.className = ''

    cloak.run('http://localhost:9001')

    cloak._on('cloak-begin', function () {

      cloak._on('message-userCount_response', renderUsersOnline)
      cloak._on('message-listRooms_response', renderRoomList)
      cloak._on('cloak-roomCreated', cloak.message.bind(cloak, 'listRooms'))

      cloak.message('listRooms')
      cloak.message('userCount')
    })

    function fetchRoomList () {

    }

    function renderRoomList (rooms) {
      rooms.forEach(function (room) {
        $roomList.innerHTML = ''
        $roomList.innerHTML += '<li><a href="#">' + room.name + ' - ' + room.users.length + '/' + room.size +'</a></li>'
      })
      $openRoomsCount.innerHTML = rooms.length
    }

    function renderUsersOnline (count) {
      $usersOnlineCount.innerHTML = count
    }

    function joinRoom (roomId) {
      cloak.message('joinRoom')
      cloak._on('message-joinRoom_response', function (data) {
        if (data.success) {
          states.go('multiplayer')
        } else {
          console.log('joinRoom failed')
        }
      })
    }

    function createRoom (roomName) {
      cloak.message('createRoom', {roomName: roomName})
      cloak._on('message-createRoom_response', function (data) {
        if (data.success) {
          states.go('multiplayer')
        } else {
          console.log('createRoom failed')
        }
      })
    }

  }

  state.destroy = function () {
    $elem.className = 'hidden'
  }

  return state

}
