import React from 'react';
import WalletsItem from './wallets-item.jsx';

let WalletSelect = React.createClass({

    getInitialState() {
        return {
            acceptedWallets: []
        };
    },

    componentDidMount() {

        this.props.getAcceptedWallets().then((json)=> {
            this.setState({
                acceptedWallets: json.acceptedWallets
            })
        });
    },

    render() {
        let options = this.state.acceptedWallets;

        let createOption = (options, index) => {
            console.log('Что пришло в селект', options);
            return <WalletsItem key={index} optionValue={options.optionValue} text={options.text} />
        };

        return (
            <div className="field-row">
                <label htmlFor="WALLETS" className="field-row__label">Кошелек</label>
                <select id="WALLETS"
                        className="ap-ui__select field-row__input _card"
                        name={this.props.name}
                        onChange={this.props.onChangeHandler}>
                    {options.map(createOption)}
                </select>
            </div>
        );
    }
});

export default WalletSelect;
