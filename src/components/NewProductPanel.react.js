var React = require('react');
var OrderActions = require('../actions/OrderActions').OrderActions;

var NewProductPanel = React.createClass({

    render: function() {
        return <div>
            <div className='card-panel yellow darken-1'>New Product Panel</div>    
            
            <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea id="description" ref="description" className="materialize-textarea"></textarea>
                      <label forHtml="textarea1">Product Description (name, type, vendor etc.)</label>
                    </div>
                  </div>
                </form>
            </div>
                    
            
            <div className='divider'/>
            <div className='section'>
                <a className="btn-floating btn-large waves-effect waves-light grey darken-1 clickable" onClick={OrderActions.showOrderItemForm}><i className="material-icons">arrow_back</i></a>
            </div>
            </div>
    },

})

module.exports = NewProductPanel;