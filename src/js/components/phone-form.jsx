import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.jsx';
import PhoneInput from './phone-input.jsx';
import AccountInput from './account-input.jsx';
import AmountInput from './amount-input.jsx';
import SubmitButton from './submit-button.jsx';

let Phone = React.createClass({
    render() {
        return (
            <Form>
                <PhoneInput name="PHONE" />
                <AccountInput name="ACCOUNT" />
                <AmountInput name="AMOUNT" />
                <SubmitButton title="Оплатить" />
            </Form>
        );
    }
});

export default Phone;
