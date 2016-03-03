import React from 'react';
import ReactDOM from 'react-dom';
import infoTooltit from './info-tooltip.jsx'
import utils from '../utils/utils';

window.$ = window.jQuery = require('jquery');
let MaskPlugin = require('jquery-mask-plugin');

let AmountInput = React.createClass({
    render() {
        return (
            <div className="field-row">
                <label htmlFor="amount" className="field-row__label">Сумма оплаты</label>
                <input type="tel"
                       id="amount"
                       name="AMOUNT"
                       autoComplete="off"
                       tabIndex="3"
                       placeholder="100"
                       className="field-row__input _amount js-amount-input"
                       ref={ (ref) => {this._amountInput = ref} } />
                {<infoTooltit />}
            </div>
        );
    },

    componentDidMount() {
        var $amountInput = $( ReactDOM.findDOMNode(this._amountInput) );

        $amountInput.mask('000', utils.amountMaskOptions);
    }
});

export default AmountInput;
