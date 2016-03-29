import React from 'react';
import ReactDOM from 'react-dom';
import Phone from './phone-form.jsx';

ReactDOM.render(<Phone getDataUrl="data.json" />, document.getElementById('phone-form'));
