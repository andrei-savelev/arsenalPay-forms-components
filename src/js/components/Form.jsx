import React from 'react';

let Form = React.createClass({
    componentWillMount() {
        this._model = {};
        this._inputs = {};
    },

    render() {
        return (
            <div className="ap-ui__container">
                <form action="/cgi-cred-bin/cgi_link"
                      method="post"
                      className="js-pay-form" onSubmit={ this._onSubmitHandler }>
                    { this.registerInputs( this.props.children ) }
                </form>
            </div>
        );
    },

    registerInputs(children) {
        return React.Children.map(children, function (child) {
            if (child.props.name) {
                return React.cloneElement(child, {
                   attachToForm: this._attachToForm,
                   detachFromForm: this._detachFromForm
                });
            } else {
                return child;
            }

        }.bind(this));
    },

    _attachToForm( component ) {
        this._inputs[component.props.name] = component;
    },

    _detachFromForm(component) {
        this._inputs[component.props.name] = null;
        this._model[component.props.name] = null;
    },

    /**
     * Submit handler
     */
    _onSubmitHandler(event) {

        event.preventDefault();

        var componentsArray = Object.keys( this._inputs ),
            componentsLength = componentsArray.length;

        componentsArray.forEach( function ( componentName ) {
            if ( this._inputs[ componentName ].state.state !== 'correct' ) {
                this._inputs[ componentName ]._validate();
                console.log('Invalid Field', componentName)
            } else {
                this._model[ componentName ] = this._inputs[ componentName ].state.value;
            }
        }.bind(this) );

        if ( Object.keys( this._model ).length !== componentsLength ) {
            console.log( 'Не все поля заполенены верно', this._inputs );
        } else {
            console.log( 'Hell YEAAAH!', this._model );
        }
    }
});

export default Form;
