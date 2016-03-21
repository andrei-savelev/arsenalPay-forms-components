import React from 'react';
import WalletsItem from './wallets-item.jsx';

let WalletSelect = React.createClass({
    render() {
        return (
            <div className="field-row">
                <label htmlFor="WALLETS" className="field-row__label">Кошелек</label>
                <select id="WALLETS" className="ap-ui__select field-row__input _card" name={this.props.name}>
                    {<WalletsItem />}
                </select>
            </div>
        );
    }
});

export default WalletSelect;
