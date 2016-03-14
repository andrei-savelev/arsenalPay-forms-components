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
                       ref={ (ref) => { this._accountInput = ref } }
                       onChange={ this._onChangeHandler }
                       onBlur={ this._validate }
                       value={ this.state.value } />
                {<InfoTooltip ref={ (ref) => { this._accountInputTooltip = ref } } />}
            </div>
        );
    },

    _onChangeHandler( event ) {
        var $inputTooltip = $( ReactDOM.findDOMNode( this._accountInputTooltip ) );

        var _value = event.currentTarget.value;

        this.setState({
            value: utils.upperCase( _value )
        });

        if ( _value.length > 5 ) {
            this.setState({
                state: 'correct'
            });

            utils.hideInfoTooltip( $inputTooltip );
        }
    },

    _validate() {
        var $inputTooltip = $( ReactDOM.findDOMNode( this._accountInputTooltip ) );

        if ( this.state.state !== 'correct' ) {
            utils.showInfoTooltip( $inputTooltip, 'error', utils.messageTexts.emptyAccount );
        }
    }
});

export default AccountInput;
