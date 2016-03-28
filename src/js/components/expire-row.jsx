import React from 'react';
import ReactDOM from 'react-dom';
import ExpSelects from './expire-selets.jsx';
import CVC from './cvc.jsx';
import InfoTooltip from './info-tooltip.jsx';

let ExpRow = React.createClass({
    getInitialState() {
        return {
            state: 'empty',
            cvcState: 'empty',
            value: '',
            cvcValue: ''
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
            <div className="field-row" name={this.props.name}>
                <ExpSelects />
                <CVC />
                <InfoTooltip />
            </div>
        );
    },

    _validate() {
        console.log('Я без валидации временно');
    }
});

export default ExpRow;
