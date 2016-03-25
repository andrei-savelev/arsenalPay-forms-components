import React from 'react';

let SubmitButton = React.createClass({
    render() {
        return (
            <button type="submit" tabIndex="4" onClick={this._onClick} className="ap-ui__btn-default">{this.props.title}</button>
        );

    },

    _onClick(event) {
        console.log('Click');
    }
});

export default SubmitButton;
