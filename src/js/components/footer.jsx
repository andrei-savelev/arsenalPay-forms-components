import React from 'react';

let imgFooter = require('../../assets/img/footer-features.png');

let Footer = React.createClass({
    render() {
        return (
            <footer className="ap-ui__footer">
                <span className="ap-ui__footer-copyright">
                    <small className="ap-ui__footer-copyright__powered">Powered by</small>
                    <a href="https://arsenalpay.ru">ArsenalPay</a>
                </span>
                <img src={imgFooter}
                     alt="PCI DSS, Verified by Visa, MasterCard SecureCode"
                     className="ap-ui__footer-img"
                 />
            </footer>
        );
    }
});


export default Footer;

