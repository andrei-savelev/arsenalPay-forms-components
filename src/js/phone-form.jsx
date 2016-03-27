window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import PhoneInput from './components/phone-input.jsx';
import AccountInput from './components/account-input.jsx';
import AmountInput from './components/amount-input.jsx';
import SubmitButton from './components/submit-button.jsx';
import FooterWOCardSecure from './components/footer-wo-card-secure.jsx';
import errorLogger from 'client-error-logger';
import {loadFont} from './utils/utils';
import utils from './utils/utils';

errorLogger('https://arsenalpay.ru/p2p/log.php');

loadFont();

let Phone = React.createClass({
    getActionUrl() {
        return utils.getInitData(this.props.getDataUrl);
    },

    render() {
        return (
            <Form getActionUrl={this.getActionUrl}>
                <PhoneInput name="PHONE" />
                <AccountInput name="ACCOUNT" />
                <AmountInput name="AMOUNT" label="Сумма оплаты" />
                <SubmitButton title="Оплатить" />
                <FooterWOCardSecure />
            </Form>
        );
    }
});

export default Phone;

ReactDOM.render(<Phone getDataUrl="data.json" />, document.getElementById('phone-form'));
