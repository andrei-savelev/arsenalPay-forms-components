import React from 'react';
import ReactDOM from 'react-dom';
import Wallet from './wallet-form.jsx';

ReactDOM.render(<Wallet getDataUrl="data.json"/>, document.getElementById('wallet-form'));
