
module.exports = function (states) {

  window.addEventListener('hashchange', resolveLocation)
  function resolveLocation () {
    var roomId = document.location.hash.split('/')[1]
    if(roomId) cloak.message('joinRoom', {roomId: roomId})
  }

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
    var msg = $inputMsg.value.trim()

    if(msg === '' || msg.length > 255) return
    else if(msg[0] === '/') commands(msg)
    else cloak.message('chat', msg)

    $inputMsg.value = ''
  }

  function commands (msg) {
    msg = msg.split(/\s+/)
    if(msg[0] === '/create' && msg[1]) createRoom(msg[1])
    else if(msg[0] === '/nick' && msg[1]) changeUsername(msg[1])
  }

  function renderMessage (name, msg, flag) {
    $chatWindow.innerHTML += '<p class="msg"><span class="user">' + name + ': </span>' + msg + '</p>'
  }

  function createRoom (roomName) {
    cloak.message('createRoom', {roomName: roomName})
  }

  function changeUsername (newUsername) {
    cloak.message('changeUsername', {newUsername: newUsername})
  }

  cloak.configure({
    messages: {
      chat: function (data) {
        renderMessage(data.name, data.msg, 'user')
      },
      listRooms_response: function (rooms) {
        $roomList.innerHTML = ''
        rooms.forEach(function (room) {
          $roomList.innerHTML += '<li><a href="#multiplayer/' + room.id + '">' + room.name + ' - ' + room.users.length + '/' + room.size +'</a></li>'
        })
        $openRoomsCount.innerHTML = rooms.length
      },
      createRoom_response: function (data) {
        document.location.hash = '#multiplayer/' + data.roomId
      },
      createRoom_failed: function (data) {
        renderMessage('server', 'room creation failed', 'server')
      },
      joinRoom_failed: function (data) {
        document.location.hash = '#multiplayer'
        renderMessage('server', 'failed to join room', 'server')
      },
      userCount_response: function (count) {
        $usersOnlineCount.innerHTML = count
      },
      changeUsername_response: function (data) {
        renderMessage('server', 'you are now: ' + data.newUsername, 'server')
      },
      changeUsername_failed: function () {
        renderMessage('server', 'username change failed.', 'server')
      },
      pulse: function (data) {
        //console.log(data)
      }
    },
    serverEvents: {
      connecting: function () {
        renderMessage('server', 'connected', 'server')
      },
      begin: function () {
        cloak.message('listRooms')
        cloak.message('userCount')
        renderMessage('server', 'connected.', 'server')
      },
      resume: function () {
        renderMessage('server', 'reconnected.', 'server')
      },
      disconnect: function () {
        renderMessage('server', 'disconnected.', 'server')
      },
      end: function () {
        console.log('connection ended.')
      },
      error: function () {
        console.log('connection error.')
      },
      joinedRoom: function (roomName) {
        renderMessage('server', 'You have joined ' + roomName.name, 'server')
      },
      leftRoom: function (roomName) {
        renderMessage('server', 'You have left ' + roomName.name, 'server')
      },
      roomMemberJoined: function (user) {
        renderMessage('server', user.name + ' has joined.', 'server')
      },
      roomMemberLeft: function (user) {
        renderMessage('server', user.name + ' has left.', 'server')
      },
      lobbyMemberJoined: function (user) {
        renderMessage('server', user.name + ' has joined.', 'server')
      },
      lobbyMemberLeft: function (user) {
        renderMessage('server', user.name + ' has left.', 'server')
      },
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


  // var $canvasContainer = $elem.querySelector('.game')

  // $canvasContainer.addEventListener('keydown', function (e) {
  //   cloak.message('keyPress', {key: e.keyCode})
  // })

  //   var renderer = new Renderer($canvasContainer)
  //   cloak._on('message-pulse', renderer.draw)

  //     function spawn () {
  //   cloak.message('spawn')
  // }
