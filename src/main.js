var React = require('react');
var ReactDOM = require('react-dom');
var OrderPanel = require('./components/OrderPanel.react.js');

ReactDOM.render(<OrderPanel url='/api/products/' />, document.getElementById('order-panel'));

