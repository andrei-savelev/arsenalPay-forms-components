import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx'
import utils from '../utils/utils';
import _ from 'lodash';

window.$ = window.jQuery = require('jquery');
let MaskPlugin = require('jquery-mask-plugin');

let AmountInput = React.createClass({
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
                <label htmlFor="amount" className="field-row__label">{this.props.label}</label>
                <input type="tel"
                       id="amount"
                       name="AMOUNT"
                       autoComplete="off"
                       tabIndex="3"
                       placeholder="100"
                       className="field-row__input _amount js-amount-input"
                       onBlur={this._onBlurHandler}
                       onFocus={this._onFocusHandler}
                       ref={ (ref) => {this._amountInput = ref} }
                       data-state={this.state.state}/>

                {<InfoTooltip ref={ (ref) => {this._amountInputTooltip = ref} }  />}
            </div>
        );
    },

    componentDidMount() {
        var $amountInput = $(ReactDOM.findDOMNode(this._amountInput)),
            $amountInputTooltip = $(ReactDOM.findDOMNode(this._amountInputTooltip));

        $amountInput.mask('000', {
            onKeyPress: function(cep, e, field, options){

                var masks = ['00000', '0 0000', '00 000'],
                    numericValue = utils.getOnlyNumbers(cep),
                    trueValueLength = null,
                    mask = null;

                !_.isEmpty(cep) && (trueValueLength = utils.getOnlyNumbers(cep).length);

                console.log(numericValue);
                if (numericValue < 60) {
                    this.setState( {
                        state: 'minAmountError'
                    } );

                } else if (numericValue > 75000) {
                    this.setState( {
                        state: 'maxAmountError'
                    } );

                } else if (numericValue > 60 && numericValue < 75000) {
                    this.setState({
                        state: 'correct',
                        value: cep
                    });

                    utils.hideInfoTooltip($amountInputTooltip);
                }

                if (trueValueLength <= 3) {
                    mask = masks[0];
                } else if (trueValueLength == 4) {
                    mask = masks[1];
                } else if (trueValueLength == 5) {
                    mask = masks[2];
                }

                $(field).mask(mask, options);
            }.bind(this)
        });
    },

    /**
     * Events
     */
    _onBlurHandler(event) {
        if (!_.isEmpty(event.currentTarget.value)) {
            this._validate();
        }
    }
    ,

    _onFocusHandler(event) {
        var $infoTooltip = $(ReactDOM.findDOMNode(this._amountInputTooltip));
        var $targetElement = $(event.currentTarget);

        $targetElement.removeClass('invalid-value');
        utils.hideInfoTooltip($infoTooltip);
    },

    _validate() {
        var $amountInputTooltip = $(ReactDOM.findDOMNode(this._amountInputTooltip));
        var $inputField = $(ReactDOM.findDOMNode(this._amountInput));

        switch (this.state.state) {
            case 'empty':
                $inputField.addClass('invalid-value');
                utils.showInfoTooltip( $amountInputTooltip, 'error', utils.messageTexts.emptyAmount);
                break;

            case 'minAmountError':
                $inputField.addClass('invalid-value');
                utils.showInfoTooltip( $amountInputTooltip, 'error', utils.messageTexts.minAmount );
                break;

            case 'maxAmountError':
                $inputField.addClass('invalid-value');
                utils.showInfoTooltip( $amountInputTooltip, 'error', utils.messageTexts.maxAmount );
                break;

            case 'correct':
                $inputField.removeClass('invalid-value');
                utils.hideInfoTooltip( $amountInputTooltip );

                this.setState({
                    value: this._amountInput.value
                });
                break;
        }
    }
});

export default AmountInput;
