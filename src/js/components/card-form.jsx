import React from 'react';
import Form from './Form.jsx';
import CardInput from './card-input.jsx';
import AmountInput from './amount-input.jsx';
import SubmitButton from './submit-button.jsx';

let Cards = React.createClass({
    render() {
        return (
            <Form>
                <CardInput />
                <AmountInput />
                <SubmitButton title="Оплатить" />
            </Form>
        );
    }
});

export default Cards;
