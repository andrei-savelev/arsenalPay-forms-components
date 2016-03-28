window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import WalletsSelect from './components/wallets-select.jsx';
import PhoneInput from './components/phone-input.jsx';
import Replacement from './components/replacement.jsx';
import EmailInput from './components/email-input.jsx';
import AccountInput from './components/account-input.jsx';
import AmountInput from './components/amount-input.jsx';
import SubmitButton from './components/submit-button.jsx';
import FooterWOCardSecure from './components/footer-wo-card-secure.jsx';
import Fetch from 'whatwg-fetch';
import errorLogger from 'client-error-logger';
import {loadFont} from './utils/utils';
import utils from './utils/utils';

errorLogger('https://arsenalpay.ru/p2p/log.php');

loadFont();

let Wallet = React.createClass({
    getInitialState() {
        return {
            changableField: <PhoneInput name="PHONE" />
        }
    },

    getActionUrl() {
        return utils.getInitData(this.props.getDataUrl);
    },

    _getWalletData() {
        return utils.getInitData(this.props.getDataUrl);
    },

    render() {
        return (
            <Form getActionUrl={this.getActionUrl}>
                <WalletsSelect name="WALLET"
                               getAcceptedWallets={this._getWalletData}
                               onChangeHandler={this._onChangeHandler} />
                {this.state.changableField}
                <AmountInput name="AMOUNT" label="Сумма оплаты"/>
                <SubmitButton title="Оплатить" />
                <FooterWOCardSecure />
            </Form>
        );
    },

    _onChangeHandler(event) {
        console.log(event.currentTarget.value);
        switch (event.currentTarget.value) {
            case 'WEBM':
                this.setState({changableField: <EmailInput name="EMAIL" />});
                break;
            case 'QIWI':
                this.setState({changableField: <PhoneInput name="PHONE" />});
                break;
            default:
                this.setState({changableField: <AccountInput name="PHONE" />});

        }
    }
});

export default Wallet;

ReactDOM.render(<Wallet getDataUrl="data.json"/>, document.getElementById('wallet-form'));
