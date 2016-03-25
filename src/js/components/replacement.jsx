import React from 'react';

let Replacement = React.createClass({
    getInitialState() {
        return {
            componentToRender: this.props.componentToRender
        };
    },

    render() {
        return (
            <div>
                {this.state.componentToRender}
            </div>
        );
    }
});

export default Replacement;