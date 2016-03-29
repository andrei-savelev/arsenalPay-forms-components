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
import utils from './utils/utils';
import {loadFont} from './utils/utils';

errorLogger('https://arsenalpay.ru/p2p/log.php');

loadFont();

let Card = React.createClass({
    _getActionUrl() {
        return utils.getInitData(this.props.getDataUrl);
    },

    render() {
        return (
            <Form getActionUrl={this._getActionUrl}>
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
