var React = require('react');
var OrderActions = require('../actions/OrderActions').OrderActions;
var OrderConstants = require('../constants');
var numeral = require("numeral");

var OrderItem = React.createClass({
    render: function() {
        var item = this.props.orderItem;
        return (
            <div className='card' >
                <div className='card-content'>
                    <div className='card-title'>{item.product.name}</div>
                        {item.product.vendor}
                    <div className='card-action'>
                        <div className='row'>
                            <div className='col s3'>{numeral(item.product.price).format('$0,0.00')}</div>
                            <div className='col s3'>x {item.count}</div>
                            <div className='col s3'>{numeral(item.product.price * item.count).format('$0,0.00')}</div>
                        </div>
                    </div>
                </div>    
                    <div className="fixed-action-btn horizontal click-to-toggle order-item-toggler" >
                    <a className="btn-floating accent-1 red">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul>
                      <li><a onClick={this.onDeleteClick} className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
                      <li><a onClick={this.onEditClick} className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
                      <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
                      <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
                    </ul>
                </div>
            </div>    
        );
    },
    onDeleteClick: function(e) {
        e.preventDefault();
        OrderActions.removeOrderItem(this.props.orderItem);
    },
    onEditClick: function(e) {
        e.preventDefault();
        OrderActions.showOrderItemForm(this.props.orderItem);
    }
});

module.exports = OrderItem;