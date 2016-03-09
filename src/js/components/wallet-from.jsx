import React from 'react';
import Form from './Form.jsx';
import PhoneInput from './phone-input.jsx';
import AmountInput from './amount-input.jsx';
import SubmitButton from './submit-button.jsx';

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

export default Wallet;
