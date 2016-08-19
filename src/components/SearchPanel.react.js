var React = require('react');
var ReactDOM = require('react-dom');

var SearchPanel = React.createClass({
    getInitialState: function() {
        return {
            query: this.props.query,
        }
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("componentWillReceiveProps was called!")
      this.setState({
            query: nextProps.query
      });
    },
    render: function() {
        return (
            <div className="row">
                <div className="col s10">
                    <input ref='query' placeholder='Search' name='query' type='text'  onChange={this.onQueryChange} />
                </div>    
                <div className="col s2">
                    <a className='btn-floating grey darken-3 small' title='Clear search' onClick={this.onClearSearch} ><i className="material-icons">clear</i></a>
                </div>    
            </div>
        )
    },
    onQueryChange: function() {
        var query = ReactDOM.findDOMNode(this.refs.query).value;
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.setState({
            query: query
        });
        this.promise = setTimeout(function () {
            this.props.search(query);
        }.bind(this), 400);
    },
    onClearSearch: function() {
        this.setState({
            query: ''
        });
        this.props.search('');
    }
});

module.exports = SearchPanel;