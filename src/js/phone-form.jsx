window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import PhoneInput from './components/phone-input.jsx';
import AccountInput from './components/account-input.jsx';
import AmountInput from './components/amount-input.jsx';
import SubmitButton from './components/submit-button.jsx';
import FooterWOCardSecure from './components/footer-wo-card-secure.jsx';
import errorLogger from '../../bower_components/error-logger/error-logger'

// Отправляем ошибки на сервер для логирования
errorLogger('http://arsenalpay.ru/p2p/log.php');

let Phone = React.createClass({
    render() {
        return (
            <Form>
                <PhoneInput name="PHONE" />
                <AccountInput name="ACCOUNT" />
                <AmountInput name="AMOUNT" />
                <SubmitButton title="Оплатить" />
                <FooterWOCardSecure />
            </Form>
        );
    }
});

export default Phone;

ReactDOM.render(<Phone />, document.getElementById('phone-form'));
