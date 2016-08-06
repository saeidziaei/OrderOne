/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var moneymex = require("../utils/moneymex.js")
var btcmarkets = require("../utils/btcmarkets.js")
var numeral = require('numeral');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },

	];
	res.locals.user = req.user;
	

	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};

const BUY_COMMISSION = 0.06; // 6%
const SELL_COMMISSION = 0.04; // 4% 
exports.rates = function(req, res, next){
	var irr = moneymex.getMarketData();
	var btc = btcmarkets.getMarketData();
	btc.buy = btc.bestAsk * (1 + BUY_COMMISSION);
	btc.sell = btc.bestBid * (1 - SELL_COMMISSION);
	res.locals.rates = {
		buyAUD: numeral(btc.buy).format('$0,0.00'),
		sellAUD: numeral(btc.sell).format('$0,0.00'),
		buyIRR: numeral(btc.buy * irr.buy).format('0,0'),
		sellIRR: numeral(btc.sell * irr.sell).format('0,0')
	};
	next();
}


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};