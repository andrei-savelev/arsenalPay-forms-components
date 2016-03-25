import React from 'react';

let ExpSelects = React.createClass({
    render() {
        return (
            <div className="ap-ui__expire">
                <label htmlFor="card-expire-month" className="field-row__label">
                    Дата истечения
                </label>

                <div className="ap-ui__exp-selects">
                    <select name="EXP" className="ap-ui__exp-selects--item">
                        <option value="01">01</option>
                    </select>

                    <select name="EXP_YEAR" className="ap-ui__exp-selects--item">
                        <option value="01">01</option>
                    </select>
                </div>
            </div>
        );
    }
});

export default ExpSelects;
