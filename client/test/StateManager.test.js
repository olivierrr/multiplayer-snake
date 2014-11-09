var test = require('tape')
var StateManager = require('../StateManager')

test('StateManager', function (t) {

  t.plan(9)

  var stateManager = new StateManager()

  t.ok(stateManager)

  t.deepEquals(stateManager.states, {})

  stateManager.add('somekey', {
    preload: function (next) {
      t.pass('preload works')
      t.ok(next)
      next()
    },
    create: function () {
      t.pass('create works')
    },
    destroy: function () {
      t.pass('destroy works')
    }
  })

  t.ok(stateManager.states['somekey'])

  t.notDeepEqual(stateManager.states, {})

  t.notOk(stateManager.currentState)

  stateManager.go('somekey')

  t.ok(stateManager.currentState)

})
