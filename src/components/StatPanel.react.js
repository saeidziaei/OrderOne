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
            <div className="card-panel flow-text">
                
                {this.getCount()}&nbsp;{this.getCount() > 1 ? 'Items' :'Item' }
                -
                Total&nbsp;
                <strong>{numeral(this.getSum()).format('$0,0.00')}</strong>
            </div>
        );
    },
    getSum: function(){
        return _.sumBy(this.state.orderItems, function(o) { console.log("count", o); return o.qty * o.product.price; });
    },
    getCount: function(){
        return this.state.orderItems ? this.state.orderItems.length : 0;
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