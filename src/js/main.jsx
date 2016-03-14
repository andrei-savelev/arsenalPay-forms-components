import React from 'react';
import ReactDOM from 'react-dom';
import Phone from './components/phone-form.jsx';
import {loadFont} from './utils/utils';

loadFont();

ReactDOM.render(<Phone />, document.getElementById('mk'));
