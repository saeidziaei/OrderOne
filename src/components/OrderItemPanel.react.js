var React = require('react');
var OrderActions = require('../actions/OrderActions').OrderActions;
var SearchPanel = require("./SearchPanel.react");
var Product = require("./Product.react");

var OrderItemPanel = React.createClass({
    getInitialState: function(){
        var orderItem = this.props.orderItem;
        if (!orderItem) {
            orderItem = {
                product: null,
                qty: 0
            }
        }
        return {
            orderItem: orderItem
        }
    },
    render: function() {
        var product = this.state.orderItem.product;
        var self = this;
        var main = product ? 
            <div className='order-item-edit'>
                <Product product={product}/>
                <a className='btn purple'>Change</a>
                <input placeholder='Qty' ref='qty' name='qty' value={this.state.qty} />
                <a className='btn green'>Add<i className='material-icons'>add</i></a>
            </div>
            : 
            <div className='search-section'>
                <SearchPanel search={this.searchProduct} />
                {this.props.products ? this.props.products.map(function(p){
                        return <Product product={p} onClick={self.selectProduct(p)} />
                    }
                ) : null}
            </div>;
        return <div>
            <div className='card-panel green'>Order Item Panel</div>
            {main}
            <div className='divider'/>
            <a className="btn-floating btn-large waves-effect waves-light grey darken-1 clickable" onClick={this.cancelClicked}><i className="material-icons">arrow_back</i></a>
        </div>
    },
    cancelClicked: function(e){
        e.preventDefault();
        OrderActions.showCart();
    },
    searchProduct: function(query){
        OrderActions.searchProduct(query);
    }

})

module.exports = OrderItemPanel;