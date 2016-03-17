import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer.jsx';

let ResultPage = React.createClass({
    render() {
        return (
            <Footer />
        );
    }
});

ReactDOM.render( <ResultPage />, document.getElementById('js-react-result-footer') );
