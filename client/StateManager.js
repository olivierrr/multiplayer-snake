
/**
 * StateManager
 *
 * @constructor
 *
 * each 'state' is expected to have a 'create' method.
 * 'preload' and 'destroy' are optional
 */
function StateManager (){

	/**
	 * @property {Hash#state}
	 */
	this.states = {}

	/**
	 * @property {Object#state}
	 */
	this.currentState

}

/**
 * @method
 *
 * @param {String}
 * @param {Object#state}
 */
StateManager.prototype.add = function(name, obj) {

	this.states[name] = obj

}

/**
 * @method
 *
 * @param {String}
 */
StateManager.prototype.go = function(name) {

	if(!this.states[name]) {
		console.alert(name + ' state doesn\'t exist, yo')
		return
	}

	if(this.currentState && this.currentState.shutdown) this.currentState.shutdown()

	this.currentState = this.states[name]

	if(this.currentState.preload){
		this.currentState.preload(function () {
			this.currentState.create()
		})
	} else {
		this.currentState.create()
	}

}

module.exports = StateManager