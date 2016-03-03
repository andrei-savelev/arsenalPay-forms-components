import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx'
import utils from '../utils/utils'

window.$ = window.jQuery = require('jquery');
let MaskPlugin = require('jquery-mask-plugin');

let PhoneInput = React.createClass({
    render() {
        return (
            <div className="field-row">
                <label htmlFor="phone-input" className="field-row__label">Номер телефона</label>
                <div className="flex-input-container js-phone-input-container">
                    <input type="tel"
                           id="phone-input"
                           name="PHONE"
                           autoComplete="off"
                           tabIndex="1"
                           placeholder="+7 (___) ___ __ __"
                           className="field-row__input _phone js-phone-input"
                           onChange={this._validateInputValue}
                           ref={(ref) => {this._phoneInput = ref}}/>
                    <div className="input-help js-input-help"
                         ref={(ref) => {this._infoToggler = ref}}>
                        ?
                    </div>
                </div>
                {<InfoTooltip ref={(ref) => {this._infoTooltip = ref}} />}
            </div>
        );
    },

    _validateInputValue(event) {
        //console.log(event.target.value);
    },

    componentDidMount() {
        var $phoneInput = $( ReactDOM.findDOMNode(this._phoneInput) );
        var $infoTooltip = $( ReactDOM.findDOMNode( this._infoTooltip ) );

        $phoneInput.mask('+7 (000) 000 00 00', utils.phoneMaskOptions);

        $(this._infoToggler).on('click', function (event) {
            utils.showInfoTooltip($infoTooltip, 'info', utils.messageTexts.availableOperators);
        })
    }
});

export default PhoneInput;
