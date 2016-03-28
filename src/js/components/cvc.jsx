window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx'
import utils from '../utils/utils';

let MaskPlugin = require('jquery-mask-plugin');

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
                    <input type="password"
                           className="field-row__input _cvc"
                           id="card-code"
                           name="CVC2"
                           inputMode="numeric"
                           pattern="\d*"
                           autoComplete="off"
                           maxLength="3"
                           placeholder="000"
                           data-state={this.state.state}
                           ref={(ref) => {this._cvcInput = ref}}/>
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

        $cvcInput.mask('999', {
            onKeyPress: function(cep, e, field, options){
                var trueValueLength = null,
                    mask = null;

                !_.isEmpty(cep) && (trueValueLength = utils.getOnlyNumbers(cep).length);

                if (_.isEmpty(cep)) {
                    this.setState({
                        state: 'empty'
                    });
                } else if (trueValueLength < 3) {
                    this.setState({
                        state: 'minCvc'
                    });

                } else {
                    this.setState({
                        state: 'correct',
                        value: cep
                    });
                }
            }.bind(this)
        });
    },

    /**
     * Обработка события change
     * @private
     */
    _onChangeHandler() {},

    /**
     * Метод валидации
     * @private
     */
    _validate() {}
});

export default CVC;
