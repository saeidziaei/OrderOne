var React = require('react');
var numeral = require("numeral");

var Product = React.createClass({
    render: function() {
        var product = this.props.product;
        return (
            <div className='card' >
                <div className='card-content'>
                    <div className='card-title'>{product.name}</div>
                        {product.vendor}
                        <div className='row'>
                            <div className='col s3'>{numeral(product.price).format('$0,0.00')}</div>
                    </div>
                </div>    
            </div>    
        );
    }
});

module.exports = Product;