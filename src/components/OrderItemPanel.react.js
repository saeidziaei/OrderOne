var React = require('react');
var ReactDOM = require('react-dom');
var OrderActions = require('../actions/OrderActions').OrderActions;
var SearchPanel = require("./SearchPanel.react");
var Product = require("./Product.react");
var _ = require("lodash")

var OrderItemPanel = React.createClass({
    
    componentWillReceiveProps: function(nextProps) {
      this.setState({
            products: nextProps.products,
            isSearching: false

      });
    },
    getInitialState: function(){
        return {
            mode: this.props.orderItem.product ? 'EDIT' : 'NEW',
            orderItem: _.cloneDeep(this.props.orderItem),
            products: this.props.products,
            isSearching: false
        }
    },
    render: function() {
        var selectedProduct = this.state.orderItem.product;
        var self = this;
        var main = selectedProduct ? 
            <div className='order-item-edit'>
                <div className='row'>
                    <div className='col s6'>
                        <Product product={selectedProduct}/>
                        <a href='#' className='' onClick={this.selectProduct.bind(this, null)}>change product</a>
                    </div>
                    <div className='col s6'>
                        <input placeholder='Qty' ref='qty' name='qty' defaultValue={this.state.orderItem.qty} type='number' />
                        <a className='btn green' onClick={this.done}>{this.state.mode == 'EDIT'? "Update" : "Add"}<i className='material-icons right'>done</i></a>
                    </div>
                </div>
                
            </div>
            : 
            <div className='search-section'>
                {this.state.isSearching ? 
                <div className="progress">
                    <div className="indeterminate"></div>
                </div> 
                : null}
                <div className='row'>
                    <div className='col s12'>
                        <SearchPanel search={this.searchProduct} />
                    </div>
                    <div className='col s12'>
                        Can't find the product yor are looking for?&nbsp;
                        <a className='' href='#' onClick={OrderActions.showNewProductForm}>add it</a>
                    </div>
                </div>
                {this.state.products ?
                (<div className='row'>
                {this.state.products.map(function(p){
                        return <div key={p._id}  className='col s6 m4'><Product product={p} onClick={self.selectProduct}  /></div>;
                    })
                }
                </div>    
                )  : "no products"}
            </div>;
        return <div>
            <div className='card-panel green'>Order Item Panel</div>
            {main}
            <div className='divider'/>
            <div className='section'>
                <a className="btn-floating btn-large waves-effect waves-light grey darken-1 clickable" onClick={this.cancelClicked}><i className="material-icons">arrow_back</i></a>
            </div>
        </div>;
    },
    done: function(){
        var orderItem = {
            qty: ReactDOM.findDOMNode(this.refs.qty).value,
            product: this.state.orderItem.product
        };
        if (this.state.mode == 'EDIT'){
            OrderActions.replaceOrderItem(this.props.orderItem, orderItem);
        } else {
            OrderActions.addOrderItem(orderItem);
        }
        
        OrderActions.showCart();
    },
    cancelClicked: function(e){
        e.preventDefault();
        OrderActions.showCart();
    },
    searchProduct: function(query){
        this.setState({isSearching: true});
        OrderActions.searchProduct(query);
    },
    selectProduct: function(p){
        var orderItem = this.state.orderItem;
        orderItem.product = p;
        this.setState({
            orderItem: orderItem
        });
    }

})

module.exports = OrderItemPanel;