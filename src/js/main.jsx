import React from 'react';
import ReactDOM from 'react-dom';
import Phone from './phone-form.jsx';
import Wallets from './wallet-form.jsx';
import Card from './card-form.jsx';
import {loadFont} from './utils/utils';

loadFont();

var tabList = [
    { 'id': 1, 'name': 'Карты', 'url': '/mike' },
    { 'id': 2, 'name': 'Телефон', 'url': '/donnie' },
    { 'id': 3, 'name': 'Кошельки', 'url': '/raph' }
];

var Tab = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },

    render: function(){
        return (
            <li className={this.props.isCurrent ? 'widget-tabs__item active' : 'widget-tabs__item'}>
                <a onClick={this.handleClick} href={this.props.url}>
                    {this.props.name}
                </a>
            </li>
        );
    }
});

var Tabs = React.createClass({
    handleClick: function(tab){
        this.props.changeTab(tab);
    },

    render: function(){
        return (
            <ul className="widget-tabs">
                {this.props.tabList.map(function(tab) {
                    return (
                        <Tab
                            handleClick={this.handleClick.bind(this, tab)}
                            key={tab.id}
                            url={tab.url}
                            name={tab.name}
                            isCurrent={(this.props.currentTab === tab.id)}
                        />
                    );
                }.bind(this))}
            </ul>
        );
    }
});

var Content = React.createClass({
    render: function(){
        return(
            <div className="content">
                {
                    this.props.currentTab === 1 ?
                        <Card getDataUrl="data.json" />
                        :null
                }

                {
                    this.props.currentTab === 2 ?
                        <Phone getDataUrl="data.json"/>
                        :null
                }

                {
                    this.props.currentTab === 3 ?
                        <Wallets getDataUrl="data.json"/>
                        :null
                }
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            tabList: tabList,
            currentTab: 1
        };
    },

    changeTab: function(tab) {
        this.setState({ currentTab: tab.id });
    },

    render: function(){
        return(
            <div className="ap-ui__widget__container">
                <Tabs
                    currentTab={this.state.currentTab}
                    tabList={this.state.tabList}
                    changeTab={this.changeTab}
                />
                <Content currentTab={this.state.currentTab} />
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('js-react-widget'));
