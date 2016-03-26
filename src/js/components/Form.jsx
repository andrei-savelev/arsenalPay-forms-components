import React from 'react';
import Fetch from 'whatwg-fetch';

let Form = React.createClass({
    getInitialState() {
        return {
            actionUrl: ''
        }
    },

    componentWillMount() {
        this._model = {};
        this._inputs = {};
    },

    render() {
        return (
            <div className="ap-ui__container">
                <form action={this.state.actionUrl}
                      method="post"
                      className="ap-ui__form js-pay-form" onSubmit={this._onSubmitHandler}>
                    {this.registerInputs(this.props.children)}
                </form>
            </div>
        );
    },

    componentDidMount() {
        this.props.getActionUrl()
            .then((json) => {
                this.setState({
                    actionUrl: json.actionUrl
                });
            })
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

    _attachToForm(component) {
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

        var componentsArray = Object.keys(this._inputs);
        var componentsLength = componentsArray.length;

        componentsArray.forEach(function (componentName) {
            if (this._inputs[componentName].state.state !== 'correct') {
                this._inputs[componentName]._validate();
            } else {
                this._model[componentName] = this._inputs[componentName].state.value;
            }
        }.bind(this));

        if (Object.keys(this._model).length !== componentsLength) {
            console.log('Не все поля заполенены верно', this._inputs);
        } else {
            // Отсылаем данные на сервер. Данные находятся в модели
            // fetch(this.state.actionUrl, this.model)
            // .then((response) => {
            //    do something with response
            // });
            console.log('Hell YEAAAH!', this._model);
        }
    }
});

export default Form;
