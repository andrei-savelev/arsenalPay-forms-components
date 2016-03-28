import React from 'react';
import ReactDOM from 'react-dom';
import Phone from './phone-form.jsx';
import Wallets from './wallet-form.jsx';
import Card from './card-form.jsx';
import {loadFont} from './utils/utils';

loadFont();

ReactDOM.render(<Wallets getDataUrl="data.json"/>, document.getElementById('wallet-form'));
ReactDOM.render(<Phone getDataUrl="data.json" />, document.getElementById('phone-form'));
ReactDOM.render(<Card getDataUrl="data.json" />, document.getElementById('card-form'));

