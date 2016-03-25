window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import WalletsSelect from './components/wallets-select.jsx';
import PhoneInput from './components/phone-input.jsx';
import Replacement from './components/replacement.jsx';
import EmailInput from './components/email-input.jsx';
import AmountInput from './components/amount-input.jsx';
import SubmitButton from './components/submit-button.jsx';
import FooterWOCardSecure from './components/footer-wo-card-secure.jsx';
import ErrorLogger from 'client-error-logger';

ErrorLogger();

let Wallet = React.createClass({

    getInitialState() {
        return {
            componentToRender: <PhoneInput name="PHONE" />
        }
    },

    render() {
        return (
            <Form>
                <WalletsSelect name="WALLET" onChangeHandler={this._onChangeHandler}/>
                {this.state.componentToRender}
                <AmountInput name="AMOUNT" label="Сумма оплаты"/>
                <SubmitButton title="Оплатить" />
                <FooterWOCardSecure />
            </Form>
        );
    },

    _onChangeHandler(event) {
        switch (event.currentTarget.value) {
            case 'WEBMONEY':
                this.setState({componentToRender: <EmailInput name="EMAIL" />});
                break;
            case 'QIWI':
                this.setState({componentToRender: <PhoneInput name="PHONE" />});
                break;
            default:
                this.setState({componentToRender: <PhoneInput name="PHONE" />});

        }
    }
});

export default Wallet;

ReactDOM.render(<Wallet />, document.getElementById('wallet-form'));
