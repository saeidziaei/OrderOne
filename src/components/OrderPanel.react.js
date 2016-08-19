var React = require('react');
var OrderStore = require('../stores/OrderStore').OrderStore;
var OrderActions = require('../actions/OrderActions').OrderActions;
var OrderConstants = require('../constants');
var CartPanel = require("./CartPanel.react");
var OrderItemPanel = require("./OrderItemPanel.react");
var NewProductPanel = require("./NewProductPanel.react");
var MessagePanel = require("./MessagePanel.react")
var StatPanel = require("./StatPanel.react")

 
var OrderPanel = React.createClass({
    getInitialState: function() {
        return OrderStore.getState();
    },
    render: function() {
        return(
            <div className='order-panel '>
                {this.state.viewMode == 'CART' ? <CartPanel orderItems={this.state.orderItems} /> :
                this.state.viewMode == 'ORDER_ITEM'   ? <OrderItemPanel products={this.state.products} orderItem={this.state.orderItem} /> :
                this.state.viewMode == 'NEW_PRODUCT'  ? <NewProductPanel /> :
                null}
                <MessagePanel />
                <StatPanel />
            </div>
            );
    },

    _onChange: function() {
        this.setState( OrderStore.getState() );
    },
    componentWillUnmount: function() {
        OrderStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function() {
        OrderStore.addChangeListener(this._onChange);
    }
});

module.exports = OrderPanel;