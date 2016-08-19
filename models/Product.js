var async = require('async');
var keystone = require('keystone');
var Types = keystone.Field.Types;
var KeyService = keystone.list("KeyService");


var Product = new keystone.List('Product', {
	track: true
});

Product.add({
	name: { type: String, required: true, default:''},
	vendor: { type: String, required: false},
	price: {type: Types.Number, required: true, default: 0},
});



Product.register();