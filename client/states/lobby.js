
module.exports = function (states) {

  var state = {}

  var $elem = document.querySelector('#lobby')
  var $roomList = $elem.querySelector('.room-list')
  var $usersOnlineCount = $elem.querySelector('.users-online-count')
  var $openRoomsCount = $elem.querySelector('.open-rooms-count')
  var $chatWindow = $elem.querySelector('.chat-window')
  var $sendMsg = $elem.querySelector('.send-msg')
  var $inputMsg = $elem.querySelector('.input-msg')

  $inputMsg.addEventListener('keydown', function (e) { 
    if(e.keyCode === 13) sendChatMsg()
  })
  $sendMsg.addEventListener('click', function (e) {
    sendChatMsg()
  })
  function sendChatMsg () {
    cloak.message('chat', $inputMsg.value)
    $inputMsg.value = ''
  }

  state.create = function () {
    $elem.className = ''

    cloak.run('http://localhost:9001')

    cloak._on('cloak-begin', function () {
      cloak._on('message-userCount_response', renderUsersOnline)
      cloak._on('message-listRooms_response', renderRoomList)
      cloak._on('message-chat', assembleMessage.bind(null,null))
      cloak._on('cloak-roomCreated', cloak.message.bind(cloak, 'listRooms'))
      cloak._on('cloak-roomDeleted', cloak.message.bind(cloak, 'listRooms'))
      cloak._on('cloak-lobbyMemberJoined', assembleMessage.bind(null, 'joined'))
      cloak._on('cloak-lobbyMemberLeft', assembleMessage.bind(null, 'left'))
      cloak.message('listRooms')
      cloak.message('userCount')
    })

    function assembleMessage (flag, data) {
      var msg = ''

      if(!flag) msg = data.msg
      else if (flag === 'joined') msg = 'has joined.'
      else if (flag === 'left') msg = 'has left.'

      appendChatMsg({
        name: data.name,
        msg: msg
      })
    }

    function appendChatMsg (data) {
      $chatWindow.innerHTML += '<p class="msg"><span class="user">' + data.name + ': </span>' + data.msg + '</p>'
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
