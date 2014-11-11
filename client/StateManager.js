
/**
 * @constructor
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
 * @param {String}
 * @param {Object#state}
 */
StateManager.prototype.add = function(name, obj) {

	this.states[name] = obj

}

/**
 * @method
 * @param {String}
 */
StateManager.prototype.go = function(name) {

	if(!this.states[name]) {
		console.log(name + ' state doesn\'t exist, yo')
		return
	}

	var self = this

	if(this.currentState && this.currentState.destroy) this.currentState.destroy()

	this.currentState = this.states[name]

	if(this.currentState.preload){
		this.currentState.preload(function () {
			self.currentState.create()
		})
	} else {
		this.currentState.create()
	}

}

module.exports = StateManager