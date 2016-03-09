import React from 'react';
import ReactDOM from 'react-dom';
import Cards from './components/card-form.jsx';
import Phone from './components/phone-form.jsx';
import Wallet from './components/wallet-from.jsx';
import {loadFont} from './utils/utils';

loadFont();


ReactDOM.render(<Cards />, document.getElementById('card'));
ReactDOM.render(<Phone />, document.getElementById('mk'));
ReactDOM.render(<Wallet />, document.getElementById('wallet'));
