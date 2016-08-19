var keystone = require("keystone");
var Product = keystone.list("Product");

exports.searchProduct = function (req, res) {

    Product.model.find(function(err, items) {
    		if (err) return res.apiError('database error', err);
    		res.apiResponse({
    			products: items
    		});
    	});
    	
    	

}