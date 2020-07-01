import React, { Component } from 'react';
import { Checkbox } from '../ReactForm'

class BaseCheckBox extends Component {

    render() {
        const { label, value, change, required } = this.props
        return (
            <Checkbox
                required={required}
                change={change}
                rtl={true}
                value={value}
                outline={true}
                label={label}
                defaultValue={value}
            />
        );
    }
}
BaseCheckBox.defaultProps = {
    bg: false,
    left: false,
}

export default BaseCheckBox;