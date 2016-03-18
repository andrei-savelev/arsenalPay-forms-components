import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx';
import utils from '../utils/utils';
import _ from 'lodash';

window.$ = window.jQuery = require('jquery');
let inputMask = require('../../../bower_components/jquery.inputmask/dist/jquery.inputmask.bundle');

let PhoneInput = React.createClass({
    getInitialState() {
        return {
            state: 'empty',
            value: ''
        }
    },

    componentWillMount() {
        this.props.attachToForm(this);
    },

    componentWillUnmount() {
        this.props.detachFromForm(this);
    },

    render() {
        return (
            <div className="field-row">
                <label htmlFor="phone-input" className="field-row__label">Номер телефона</label>
                <div className="flex-input-container js-phone-input-container"
                     ref={(ref) => {this._inputFieldWrapper = ref}}>
                    <input type="tel"
                           id="phone-input"
                           name={ this.props.name }
                           autoComplete="off"
                           tabIndex="1"
                           placeholder="+7 (___) ___ __ __"
                           className="field-row__input _phone js-phone-input"
                           onBlur={this._onBlurHandler}
                           onFocus={this._onFocusHandler}
                           data-state={ this.state.state }
                           ref={(ref) => {this._phoneInput = ref}}/>

                    <div className="input-help js-input-help"
                         ref={(ref) => {this._infoToggler = ref}}>
                        ?
                    </div>
                </div>

                {<InfoTooltip ref={(ref) => {this._infoTooltipPhone = ref}} />}
            </div>
        );
    },

    componentDidMount() {
        var $phoneInput = $(ReactDOM.findDOMNode(this._phoneInput));
        var $infoTooltip = $(ReactDOM.findDOMNode(this._infoTooltipPhone));

        $phoneInput.inputmask('+7 (999) 999 99 99', {
            oncomplete: function (event) {
                var resultValue = utils.getOnlyNumbers(event.currentTarget.value).trim();

                this.setState({
                    value: resultValue
                });
            }.bind(this)
        });

        $(this._infoToggler).on('click', function () {
            utils.showInfoTooltip( $infoTooltip, 'info', utils.messageTexts.availableOperators );

            if ( !$infoTooltip.hasClass( '_help' ) ) {
                $phoneInput.trigger( 'focus' );
            }
        })
    },

    /**
     * Проверка на корректность заполенности поля по событию onBlur
     * @param event
     * @private
     */
    _onBlurHandler(event) {
        var value = event.currentTarget.value;

        utils.phoneIsComplete(value, this);

        if (!_.isEmpty(value)) {
            setTimeout(this._validate, 0);
        }
    },

    /**
     * Обработка события onFocus
     * @private
     */
    _onFocusHandler() {
        var $infoTooltip = $(ReactDOM.findDOMNode(this._infoTooltipPhone));
        var $targetElement = $(ReactDOM.findDOMNode(this._phoneInput));
        var $infoToggler = $(ReactDOM.findDOMNode(this._infoToggler));

        $targetElement.removeClass('invalid-value');
        $infoToggler.removeClass('invalid-value');
        utils.hideInfoTooltip($infoTooltip);
    },

    /**
     * Метод валидации поля.
     * @private
     */
    _validate() {
        var $infoTooltip = $(ReactDOM.findDOMNode(this._infoTooltipPhone));
        var $targetElement = $(ReactDOM.findDOMNode(this._phoneInput));
        var $infoToggler = $(ReactDOM.findDOMNode(this._infoToggler));

        switch (this.state.state) {
            case 'empty':
                $targetElement.addClass('invalid-value');
                $infoToggler.addClass('invalid-value');
                utils.showInfoTooltip($infoTooltip, 'error', utils.messageTexts.emptyPhone);
                break;

            case 'minPhoneLength':
                $targetElement.addClass('invalid-value');
                $infoToggler.addClass('invalid-value');
                utils.showInfoTooltip($infoTooltip, 'error', utils.messageTexts.minPhoneLength);
                break;

            case 'invalidFirstSymbol':
                $targetElement.addClass('invalid-value');
                $infoToggler.addClass('invalid-value');
                utils.showInfoTooltip($infoTooltip, 'error', utils.messageTexts.invalidFirstSymbol);
                break;

            case 'correct':
                $targetElement.removeClass('invalid-value');
                $infoToggler.removeClass('invalid-value');
                utils.hideInfoTooltip($infoTooltip);

                this.setState({
                    value: utils.getOnlyNumbers(this._phoneInput.value)
                });
                break;
        }
    }
});

export default PhoneInput;
