var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var MessageActions = require('../actions/MessageActions').MessageActions;
var constants = require('../constants');

var _state = {
    viewMode: 'CART', // possible values -> CART, ORDER_ITEM, NEW_PRODUCT
    orderItems: [],
    orderItem: {}, // the order item that is currently being added or edited
    products: [], // search result for product search when adding a new order item
}

var _props = {
    url: '/api/product/'
}

var _searchProduct = function(query) {
    $.ajax({
        url: _props.url+'search/?query='+query,
        dataType: 'json',
        cache: false,
        success: function(data) {
            _state.products = data.products;
            OrderStore.emitChange();
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            MessageActions.add_message_error(err.toString());
            OrderStore.emitChange();
        }
    });
};

var _reloadProducts = function() {
    _searchProduct('');
};

var _removeOrderItem = function(orderItem){
    
    var index = _state.orderItems.indexOf(orderItem);
    console.log("_removeOrderItem", index, _state.orderItems, orderItem);
    if (index > -1) {
        _state.orderItems.splice(index, 1);
        OrderStore.emitChange();
    }
}

var _addOrderItem = function(orderItem){
    _state.orderItems.push(orderItem);
    OrderStore.emitChange();
}

var _saveNewProduct = function(product) {
    $.ajax({
        url: _props.url,
        dataType: 'json',
        method: 'POST',
        data:product,
        cache: false,
        success: function(data) {
            MessageActions.add_message_ok("Successfully added product!");
            // _clearAddingProduct();
            _reloadProducts();
        },
        error: function(xhr, status, err) {
            _state.message = err.toString()
            OrderStore.emitChange();
        }
    });
};
var _showCart = function(){
  _state.viewMode = 'CART';
  OrderStore.emitChange();
};
var _showOrderItemForm = function(orderItem){
  _state.viewMode = 'ORDER_ITEM';
  _state.orderItem = orderItem;
  OrderStore.emitChange();
};
var _showNewProductForm = function(){
  _state.viewMode = 'NEW_PRODUCT';
  OrderStore.emitChange();
};


var OrderStore = $.extend({}, EventEmitter.prototype, {
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

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case constants.SHOW_CART:
            _showCart();
            break;

        case constants.SHOW_ORDER_ITEM_FORM:
            _showOrderItemForm(action.orderItem);
            break;
            
        case constants.SHOW_NEW_PRODUCT_FORM:
            _showNewProductForm();
            break;

        case constants.SEARCH_PRODUCT:
            _searchProduct(action.query);
            break;
        
        case constants.SAVE_NEW_PRODUCT:
            _saveNewProduct(action.product);
            break;
        
        case constants.ADD_ORDER_ITEM:
            _addOrderItem(action.orderItem);
            break;
            
        case constants.REPLACE_ORDER_ITEM:
            _removeOrderItem(action.oldOrderItem);
            _addOrderItem(action.newOrderItem);
            break;

        case constants.REMOVE_ORDER_ITEM:
            _removeOrderItem(action.orderItem);
            break;
    }
    return true;
});

module.exports.OrderStore = OrderStore;
module.exports.reloadProducts = _reloadProducts;