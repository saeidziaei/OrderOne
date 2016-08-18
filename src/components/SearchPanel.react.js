var React = require('react');

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
                <div className="col s1">
                    Filter: &nbsp;
                    <input ref='query' name='query' type='text' value={this.state.query} onChange={this.onQueryChange} />
                    <div className='waves-effect waves-teal btn-flat white red-text' onClick={this.onClearSearch} >x</div>
                    
                </div>
            </div>
        )
    },
    onQueryChange: function() {
        var query = React.findDOMNode(this.refs.query).value;
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