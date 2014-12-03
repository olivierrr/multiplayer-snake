
var cloak = require('cloak')

module.exports = setIntervalTime

var interval

function tick () {
  cloak.getUsers().forEach(function (user) {
    if(user.data.limit > 0) user.data.limit -= 1
    else user.data.limit = 0
  })
}

function setIntervalTime (intervalTime) {
  clearInterval(interval)
  setInterval(tick, intervalTime)
}
