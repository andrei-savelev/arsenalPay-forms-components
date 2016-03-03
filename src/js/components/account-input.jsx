import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx'
import utils from '../utils/utils';

window.$ = window.jQuery = require('jquery');

let AccountInput = React.createClass({
    render() {
        return (
            <div className="field-row">
                <label htmlFor="account-id" className="field-row__label">Номер договора</label>
                <input type="text"
                       id="account-id"
                       name="ACCOUNT-ID"
                       autoComplete="off"
                       tabIndex="2"
                       placeholder="Например, ATK3787"
                       className="field-row__input _account js-account-id-input"
                       ref={ (ref) => { this._accountInput = ref } } onChange={this._upperCase}/>
                {<InfoTooltip />}
            </div>
        );
    },

    componentDidMount() {
        /*var $accountInput = $( ReactDOM.findDOMNode(this._accountInput) );*/
    },

    _upperCase(event) {
        var target = $(event.target);
        utils.upperCase(target);
    }
});

export default AccountInput;
