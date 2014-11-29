
module.exports = function (states) {

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

  // awfull!
  function sendChatMsg () {
    var msg = $inputMsg.value.trim()
    if(msg === '') return

    else if(msg[0] === '/') {

      msg = msg.split(/\s+/)
      if(msg[0] === '/create' && msg[1]) createRoom(msg[1])
      else if(msg[0] === '/join' && msg[1]) joinRoom(msg[1])
      else if(msg[0] === '/nick' && msg[1]) changeUsername(msg[1])

    } else {
      cloak.message('chat', msg)
    }


    $inputMsg.value = ''
  }

  function assembleMessage (flag, data) {
    var msg = '', name = ''

    if(!flag) return
    else if (flag === 'user') msg = data.msg, name = data.name
    else if (flag === 'joined') msg = 'has joined.', name = data.name
    else if (flag === 'left') msg = 'has left.', name = data.name
    else if (flag === 'connecting') msg = 'connecting...', name = 'server'
    else if (flag === 'connected') msg = 'connected.', name = 'server'

    $chatWindow.innerHTML += '<p class="msg"><span class="user">' + name + ': </span>' + msg + '</p>'
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
    cloak.message('joinRoom', {roomId: roomId})
  }

  function createRoom (roomName) {
    cloak.message('createRoom', {roomName: roomName})
  }

  function changeUsername (newUsername) {
    cloak.message('changeUsername', {newUsername: newUsername})
  }

  cloak.configure({
    messages: {
      chat: assembleMessage.bind(null, 'user'),
      listRooms_response: renderRoomList,
      createRoom_response: function (data) {
        if (data.success) console.log('createRoom success')
        else console.log('createRoom failed')
      },
      joinRoom_response: function (data) {
        if (data.success) console.log('joinRoom success')
        else console.log('joinRoom failed')
      },
      userCount_response: renderUsersOnline,
      pulse: function (data) {
        console.log(data)
      }
    },
    serverEvents: {
      connecting: assembleMessage.bind(null, 'connecting'),
      begin: function () {
        cloak.message('listRooms')
        cloak.message('userCount')
        assembleMessage('connected')
      },
      resume: function () {
        console.log('reconnected.')
      },
      disconnect: function () {
        console.log('disconnected.')
      },
      end: function () {
        console.log('connection ended.')
      },
      error: function () {
        console.log('connection error.')
      },
      joinedRoom: function (roomName) {
        console.log('joined room', roomName)
      },
      leftRoom: function (roomName) {
        console.log('left room', roomName)
      },
      roomMemberJoined: function (user) {
        console.log('user joined room', user)
      },
      roomMemberLeft: function (user) {
        console.log('user left room', user)
      },
      lobbyMemberJoined: assembleMessage.bind(null, 'joined'),
      lobbyMemberLeft: assembleMessage.bind(null, 'left'),
      roomCreated: cloak.message.bind(cloak, 'listRooms'),
      roomDeleted: cloak.message.bind(cloak, 'listRooms')
    }
  })

  return {
    create: function () {
      $elem.className = ''
      cloak.run('http://localhost:9001')
    },
    destroy: function () {
      $elem.className = 'hidden'
      cloak.stop()
    }
  }

}
