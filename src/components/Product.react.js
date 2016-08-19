var React = require('react');
var numeral = require("numeral");
var MessageActions = require('../actions/MessageActions').MessageActions;

var Product = React.createClass({
    render: function() {
        var product = this.props.product;
        return (
            <div className='card product-card hoverable clickable' onClick={this.handleClick} >
                <div className='card-content flow-text'>
                    <small><em>{product.vendor}</em><br/></small>
                    <strong className=''>{product.name}</strong>
                        
                        <div className='row'>
                            <div className='col s3'>{numeral(product.price).format('$0,0.00')}</div>
                    </div>
                </div>    
            </div>    
        );
    },
    handleClick: function(){
        if (this.props.onClick) {
            MessageActions.add_message_ok('product was selected ' + this.props.product.name);
            this.props.onClick(this.props.product);
        }
    }
});

module.exports = Product;