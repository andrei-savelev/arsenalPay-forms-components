import React from 'react';
import Form from './Form.jsx';
import PhoneInput from './phone-input.jsx';
import AccountInput from './account-input.jsx';
import AmountInput from './amount-input.jsx';
import SubmitButton from './submit-button.jsx';

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

export default Phone;
