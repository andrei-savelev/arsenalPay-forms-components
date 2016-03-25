import React from 'react';

let WalletsItem = React.createClass({
   render() {
       return (
           <option value={this.props.optionValue}>{this.props.text}</option>
       );
   }
});

export default WalletsItem;