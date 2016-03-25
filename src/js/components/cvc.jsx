window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx'
import utils from '../utils/utils';

let inputMask = require('../../../bower_components/jquery.inputmask/dist/jquery.inputmask.bundle');

let CVC = React.createClass({
    getInitialState() {
        return {
            state: 'empty',
            value: ''
        }
    },

    render() {
        return (
            <div className="ap-ui__cvc" id="card-code-col">
                <label htmlFor="card-code" className="field-row__label">CVC</label>
                <div className="flex-input-container _cvc-container">
                    <input type="tel"
                       className="field-row__input _cvc"
                       id="card-code"
                       name="CVC2"
                       inputMode="numeric"
                       pattern="\d*"
                       autoComplete="off"
                       maxLength="3"
                       placeholder="000" />
                    <div className="input-help _cvc-help"
                        ref={(ref) => {this._infoToggler = ref}}>
                        ?
                    </div>
                </div>
            </div>
        );
    },

    componentDidMount() {
        var $cvcInput = $(ReactDOM.findDOMNode(this._cvcInput));

        $cvcInput.inputmask('999', {
            oncomplete: function (event) {
                var resultValue = utils.getOnlyNumbers(event.currentTarget.value).trim();

                this.setState({
                    value: resultValue
                });
            }.bind(this)
        });
    },

    /**
     * Обработка события change
     * @private
     */
    _onChangeHandler() {},
    _validation() {}
});

export default CVC;
