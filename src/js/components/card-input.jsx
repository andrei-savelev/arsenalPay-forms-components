import React from 'react';
import ReactDOM from 'react-dom';
import InfoTooltip from './info-tooltip.jsx';
import utils from '../utils/utils';
import _ from 'lodash';

window.$ = window.jQuery = require('jquery');
let MaskPlugin = require('jquery-mask-plugin');

let CardInput = React.createClass({
    getInitialState() {
        return {
            cardState: null,
            cardType: null,
            expectCardValueLength: null
        }
    },

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
                       data-state={this.state.cardState}
                       data-type={this.state.cardType}
                       onChange={this._cardOnChange}
                       onFocus={this._cardOnFocus}
                       onBlur={this._cardOnBlur}
                       ref={ (ref) => {this._cardInput = ref} } />

                {<InfoTooltip ref={ (ref) => {this._infoTooltipCard = ref} } />}
            </div>
        )
    },

    componentDidMount() {
        var $cardInput = $( ReactDOM.findDOMNode( this._cardInput ) ),
            $infoTooltipCard = $( ReactDOM.findDOMNode( this._infoTooltipCard ) ),
            self = this;

        $cardInput.mask('0000 0000 0000 0000', {

            onComplete: function (cep) {
                var completeCardValue = utils.getOnlyNumbers(cep);

                if ( utils.luhnCheck( completeCardValue ) ) {
                    self.setState( { cardState:  'correct' } );
                    utils.hideInfoTooltip( $infoTooltipCard );

                } else {
                    self.setState( { cardState:  'luhnFailed' } );
                    utils.showInfoTooltip( $infoTooltipCard, 'error', utils.messageTexts.luhnFailed );
                }
            }
        });
    },

    /**
     * Устанавливает тип карты в качестве состояния
     * @param event
     * @private
     */
    _cardOnChange(event) {
        var card = utils.getCard( event.target.value );

        this.setState({
            cardType: card.type,
            expectCardValueLength: card.cardLength
        });
    },

    /**
     * Обработчик события focus для поля номера карты
     * @param event
     * @private
     */
    _cardOnFocus(event) {
        var $infoTooltipCard = $( ReactDOM.findDOMNode( this._infoTooltipCard ) );

        if (this.state.cardState === 'empty') {
            utils.hideInfoTooltip( $infoTooltipCard );
        }
    },

    /**
     * Обработчик события blur для поля номера карты
     * @param event
     * @private
     */
    _cardOnBlur(event) {
        var $infoTooltipCard = $( ReactDOM.findDOMNode( this._infoTooltipCard ) );

        if ( _.isEmpty( event.target.value ) ) {
            this.setState( { cardState: 'empty' } );
            utils.showInfoTooltip( $infoTooltipCard, 'error', utils.messageTexts.emptyCard );
        }

    }
});

export default CardInput;
