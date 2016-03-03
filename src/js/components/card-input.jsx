import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx';
import utils from '../utils/utils';
window.$ = window.jQuery = require('jquery');

let CardInput = React.createClass({
    render() {
        return (
            <div className="field-row">
                <label htmlFor="account-id" className="field-row__label">Номер карты</label>
                <input type="text"
                       id="account-id"
                       name="ACCOUNT-ID"
                       autoComplete="off"
                       tabIndex="2"
                       placeholder="0000 0000 0000 0000"
                       className="field-row__input _card js-card-input"
                       ref={ (ref) => {this._cardInput = ref} } />
                {<InfoTooltip ref={ (ref) => {this._infoTooltipCard = ref} } />}
            </div>
        )
    }
});

export default CardInput;
