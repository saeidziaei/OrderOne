var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var constants = require('../constants');

var OrderActions = {
    showCart: function () {
        AppDispatcher.dispatch({
            actionType: constants.SHOW_CART
        });
    },
    showOrderItemForm: function (orderItem) {
        AppDispatcher.dispatch({
            actionType: constants.SHOW_ORDER_ITEM_FORM,
            orderItem: orderItem
        });
    },
    showNewProductForm: function () {
        AppDispatcher.dispatch({
            actionType: constants.SHOW_NEW_PRODUCT_FORM
        });
    },
    searchProduct: function(query) {
        AppDispatcher.dispatch({
            actionType: constants.SEARCH_PRODUCT,
            query: query
        });
    },
    saveNewProduct: function(product) {
        AppDispatcher.dispatch({
            actionType: constants.SAVE_NEW_PRODUCT,
            product: product
        });
    },
    addOrderItem: function(orderItem) {
        AppDispatcher.dispatch({
            actionType: constants.ADD_ORDER_ITEM,
            orderItem: orderItem
        });
    },
    removeOrderItem: function(orderItem) {
        AppDispatcher.dispatch({
            actionType: constants.REMOVE_ORDER_ITEM,
            orderItem: orderItem
        });
    }
};

module.exports.OrderActions = OrderActions;
module.exports.AppDispatcher = AppDispatcher;