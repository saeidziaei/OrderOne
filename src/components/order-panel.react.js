var React = require('react');
var OrderStore = require('../stores').OrderStore;
var OrderActions = require('../actions').OrderActions;
var OrderConstants = require('../constants');
var OrderItem = require("./order-item.react");


 
var OrderPanel = React.createClass({
    getInitialState: function() {
        return OrderStore.getState();
    },
    render: function() {
        return(this.state.viewMode == OrderConstants.ORDER_VIEW ? this.renderOrder() :
            this.state.viewMode == OrderConstants.ORDER_ITEM_VIEW   ? this.renderOrderItem() :
            this.state.viewMode == OrderConstants.ADD_PRODUCT_VIEW  ? this.renderNewProduct() :
            null
            );
    },
    renderOrder: function(){
      return <div>
        <h5 className=''>Order</h5>
            {
                this.state.orderItems.map(function(oi){
                    return <OrderItem key={oi.product._id} orderItem={oi} />
                })
            }
        <div className="row">
            <div className="col s6">
                <a className='btn waves-effect waves-light blue'>Send <i className='material-icons right'>send</i></a>
            </div>
            <div className="col s6 right-align">
                <a className="btn-floating btn-large waves-effect waves-light red clickable" onClick={this.onAddOrderItemClicked}><i className="material-icons">add</i></a>
            </div>
        </div>
        
        
      </div>
    },
    onAddOrderItemClicked: function(e){
        e.preventDefault();
        OrderActions.changeViewMode(OrderConstants.ORDER_ITEM_VIEW, null);
    },
    onCancelOrderItemView: function(e){
        e.preventDefault();
        OrderActions.changeViewMode(OrderConstants.ORDER_VIEW);
    },
    renderOrderItem: function(){
      return <div>
            <div className='card-panel green'>Order Item</div>
            <a className="btn-floating btn-large waves-effect waves-light grey darken-1 clickable" onClick={this.onCancelOrderItemView}><i className="material-icons">arrow_back</i></a>
        </div>
    },
    renderNewProduct: function(){
      return <div className='card-panel yellow darken-1'>New Product</div>
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