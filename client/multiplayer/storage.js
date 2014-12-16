
module.exports = {
  getName: getName,
  setName: setName
}

function getName () {
  if(!isSupported) return false
  return localStorage.getItem('snake-name') || false
}

function setName (name) {
  if(!isSupported || !name) return false
  localStorage.setItem('snake-name', name)
}

function isSupported () {
  return !!window.Storage
}