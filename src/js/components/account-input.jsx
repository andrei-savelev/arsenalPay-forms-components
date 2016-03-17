import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx'
import utils from '../utils/utils';

window.$ = window.jQuery = require('jquery');

let AccountInput = React.createClass({
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
                <label htmlFor="account-id" className="field-row__label">Номер договора</label>
                <input type="text"
                       id="account-id"
                       name="ACCOUNT-ID"
                       autoComplete="off"
                       tabIndex="2"
                       placeholder="Например, ATK3787"
                       className="field-row__input _account js-account-id-input"
                       ref={(ref) => {this._accountInput = ref}}
                       onChange={this._onChangeHandler}
                       onBlur={this._onBlurHandler}
                       onFocus={this._onFocusHandler}
                       value={ this.state.value } />
                {<InfoTooltip ref={ (ref) => {this._accountInputTooltip = ref}} />}
            </div>
        );
    },

    _onChangeHandler(event) {
        var $inputTooltip = $(ReactDOM.findDOMNode(this._accountInputTooltip));
        var $targetElement = $(event.currentTarget);
        var _value = event.currentTarget.value;

        this.setState({
            value: utils.upperCase(_value)
        });

        if (_value.length > 5) {
            this.setState({
                state: 'correct'
            });

            $targetElement.removeClass('invalid-value');
            utils.hideInfoTooltip($inputTooltip);
        } else {
            this.setState({
                state: 'incorrect'
            });
        }
    },

    _onBlurHandler(event) {
        var $inputTooltip = $(ReactDOM.findDOMNode(this._accountInputTooltip));
        var $targetElement = $(event.currentTarget);

        switch (this.state.state) {
            case 'empty':
                break;

            case 'correct':
                $targetElement.removeClass('invalid-value');
                utils.hideInfoTooltip($inputTooltip);
                break;

            default:
                $targetElement.addClass('invalid-value');
                utils.showInfoTooltip($inputTooltip, 'error', utils.messageTexts.incorrectAccount);
        }
    },

    _onFocusHandler(event) {
        var $inputTooltip = $(ReactDOM.findDOMNode(this._accountInputTooltip));

        $(event.currentTarget).removeClass('invalid-value');
        utils.hideInfoTooltip($inputTooltip);
    },

    _validate() {
        var $inputTooltip = $(ReactDOM.findDOMNode(this._accountInputTooltip));
        var $inputField = $(ReactDOM.findDOMNode(this._accountInput));

        switch (this.state.state) {
            case 'empty':
                $($inputField).addClass('invalid-value');
                utils.showInfoTooltip($inputTooltip, 'error', utils.messageTexts.emptyAccount);
                break;

            case 'correct':
                $($inputField).removeClass('invalid-value');
                utils.hideInfoTooltip($inputTooltip);
                break;

            default:
                $($inputField).addClass('invalid-value');
                utils.showInfoTooltip($inputTooltip, 'error', utils.messageTexts.incorrectAccount)
        }
    }
});

export default AccountInput;
