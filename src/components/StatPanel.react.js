var React = require('react');
var OrderStore = require('../stores/OrderStore').OrderStore;
var _ = require("lodash");
var numeral = require("numeral");

var StatPanel = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return(
            <div className="card-panel">
                <h3>
                {this.state.orderItems ? this.state.orderItems.length : 0}&nbsp;Items
                -
                Total:&nbsp;
                {numeral(_.sumBy(this.state.orderItems, function(o) { console.log("count", o); return o.qty * o.product.price; })).format('$0,0.00')}</h3>
            </div>
        );
    },
    _onCartChange: function() {
        
        this.setState({
            orderItems: OrderStore.getState().orderItems
        });
    },
    componentWillUnmount: function() {
        OrderStore.removeChangeListener(this._onCartChange);
    },
    componentDidMount: function() {
        OrderStore.addChangeListener(this._onCartChange);
    }
});

module.exports = StatPanel ;