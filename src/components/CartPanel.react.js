var React = require('react');
var OrderActions = require('../actions/OrderActions').OrderActions;
var OrderItem = require("./OrderItem.react");

var CartPanel = React.createClass({

    render: function() {
        return <div>
        <h5 className=''>Cart</h5>
            {
                this.props.orderItems.map(function(oi){
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
        OrderActions.showOrderItemForm(null);
    },

})

module.exports = CartPanel;