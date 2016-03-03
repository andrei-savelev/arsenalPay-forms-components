import React from 'react';

let Form = React.createClass({
    render() {
        return (
            <div className="ap-ui__container">
                <form action="/cgi-cred-bin/cgi_link"
                      method="post"
                      className="js-pay-form" onSubmit={this._submit}>
                    {this.props.children}
                </form>
            </div>
        );
    },

    _submit(event) {
        event.preventDefault();
    }
});

export default Form;
