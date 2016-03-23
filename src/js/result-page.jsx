import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer.jsx';
import errorLogger from 'client-error-logger';
import {loadFont} from './utils/utils';

errorLogger('https://arsenalpay.ru/p2p/log.php');

loadFont();

let ResultPage = React.createClass({
    render() {
        return (
            <Footer />
        );
    }
});

ReactDOM.render( <ResultPage />, document.getElementById('js-react-result-footer') );
