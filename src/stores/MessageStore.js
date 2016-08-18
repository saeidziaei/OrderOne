var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var constants = require('../constants');


var _state = {
    message: {}
};

var MessageStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return _state;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});


MessageStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case constants.MESSAGE_ADD:
            _state.message = action.message;
            MessageStore.emitChange();
        break;
    }
    return true;
});