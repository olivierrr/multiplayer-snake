
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
  function sendChatMsg () {
    cloak.message('chat', $inputMsg.value)
    $inputMsg.value = ''
  }

  function assembleMessage (flag, data) {
    var msg = ''

    if(!flag) msg = data.msg
    else if (flag === 'joined') msg = 'has joined.'
    else if (flag === 'left') msg = 'has left.'

    $chatWindow.innerHTML += '<p class="msg"><span class="user">' + data.name + ': </span>' + msg + '</p>'
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

  cloak.configure({
    messages: {
      chat: assembleMessage.bind(null,null),
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
      connecting: function () {
        console.log('connecting...')
      },
      begin: function () {
        cloak.message('listRooms')
        cloak.message('userCount')
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

  var state = {}
  state.create = function () {
    $elem.className = ''
    cloak.run('http://localhost:9001')
  }
  state.destroy = function () {
    $elem.className = 'hidden'
  }
  return state

}
