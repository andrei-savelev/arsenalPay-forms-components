window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import WalletsSelect from './components/wallets-select.jsx';
import PhoneInput from './components/phone-input.jsx';
import AmountInput from './components/amount-input.jsx';
import SubmitButton from './components/submit-button.jsx';
import FooterWOCardSecure from './components/footer-wo-card-secure.jsx';
import ErrorLogger from 'client-error-logger';

ErrorLogger();

let Wallet = React.createClass({
    render() {
        return (
            <Form>
                <WalletsSelect name="WALLET" />
                <PhoneInput name="PHONE" />
                <AmountInput name="AMOUNT"/>
                <SubmitButton title="Оплатить" />
                <FooterWOCardSecure />
            </Form>
        );
    }
});

export default Wallet;

ReactDOM.render(<Wallet />, document.getElementById('wallet-form'));