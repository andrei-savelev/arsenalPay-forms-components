import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import PhoneInput from './components/phone-input.jsx';
import AccountInput from './components/account-input.jsx'
import AmountInput from './components/amount-input.jsx';
import SubmitButton from './components/submit-button.jsx';
import {loadFont} from './utils/utils';

loadFont();

let Phone = React.createClass({
    render() {
        return (
            <Form>
                <PhoneInput />
                <AccountInput />
                <AmountInput />
                <SubmitButton title="Оплатить"/>
            </Form>
        );
    }
});

let Wallet = React.createClass({
    render() {
        return (
            <Form>
                <PhoneInput />
                <AmountInput />
                <SubmitButton title="Оплатить" />
            </Form>
        );
    }
});

let Cards = React.createClass({
    render() {
        return (
            <Form>
                <AmountInput />
                <SubmitButton title="Оплатить" />
            </Form>
        );
    }
});

ReactDOM.render(<Cards />, document.getElementById('card'));
ReactDOM.render(<Phone />, document.getElementById('mk'));
ReactDOM.render(<Wallet />, document.getElementById('wallet'));
