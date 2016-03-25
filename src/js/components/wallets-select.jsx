import React from 'react';
import WalletsItem from './wallets-item.jsx';

let options = [
    {
        optionValue: 'QIWI',
        text: 'QIWI'
    },
    {
        optionValue: 'WEBMONEY',
        text: 'WebMoney'
    }
];

let WalletSelect = React.createClass({
    render() {
        let createOption = (options, index) => {
            return <WalletsItem key={index} optionValue={options.optionValue} text={options.text} />
        };

        return (
            <div className="field-row">
                <label htmlFor="WALLETS" className="field-row__label">Кошелек</label>
                <select id="WALLETS"
                        className="ap-ui__select field-row__input _card"
                        name={this.props.name} onChange={this.props.onChangeHandler}>
                    {options.map(createOption)}
                </select>
            </div>
        );
    }
});

export default WalletSelect;
