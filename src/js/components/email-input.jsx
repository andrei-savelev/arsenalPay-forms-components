import React from 'react';
import InfoTooltip from './info-tooltip.jsx';

let EmailInput = React.createClass({
    render() {
        return (
            <div className="field-row">
                <label htmlFor="EMAIL" className="field-row__label">E-mail</label>
                <input type="email"
                       id="amount"
                       name="AMOUNT"
                       autoComplete="off"
                       placeholder="your@email.com"
                       className="field-row__input _account" />
                <InfoTooltip ref={(ref) => {this._amountInputTooltip = ref}} />
            </div>
        );
    }
});

export default EmailInput;