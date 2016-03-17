import React from 'react';
import ReactDOM from 'react-dom';
import {loadFont} from './utils/utils';

loadFont();

ReactDOM.render(<Phone />, document.getElementById('mk'));
