var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var constants = require('../constants');

var MessageActions = {
    add_message_ok: function(msg) {
        AppDispatcher.dispatch({
            actionType: constants.MESSAGE_ADD,
            message: {
                color: 'green',
                text: msg
            }
        });
    },
    add_message_error: function(msg) {
        AppDispatcher.dispatch({
            actionType: constants.MESSAGE_ADD,
            message: {
                color: 'red',
                text: msg
            }
        });
    }
};

module.exports.MessageActions = MessageActions;