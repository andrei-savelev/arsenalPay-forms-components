window.$ = window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import CardInput from './components/card-input.jsx'
import ExpRow from './components/expire-row.jsx';
import AmountInput from './components/amount-input.jsx';
import SubmitButton from './components/submit-button.jsx';
import Footer from './components/footer.jsx';
import errorLogger from 'client-error-logger';
import {loadFont} from './utils/utils';

errorLogger('https://arsenalpay.ru/p2p/log.php');

loadFont();

let Card = React.createClass({
    getInitData() {
        return fetch(this.props.getDataUrl)
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err);
            });
    },

    getActionUrl() {
        return this.getInitData();
    },

    render() {
        return (
            <Form getActionUrl={this.getActionUrl}>
                <CardInput name="CARD" />
                <ExpRow name="Expire" />
                <AmountInput name="AMOUNT" label="Сумма перевода" />
                <SubmitButton title="Перевести" />
                <Footer />
            </Form>
        );
    }
});

export default Card;

ReactDOM.render(<Card getDataUrl="data.json" />, document.getElementById('card-form'));
