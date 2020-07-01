import React, { Component } from 'react';
import { Input } from '../ReactForm';



class BaseInput extends Component {



    render() {
        const { label, value, change, required, type } = this.props;

        return (
            <Input
                type={type}
                required={required}
                rtl={true}
                label={label}
                value={value}
                change={change}
                outline={true}
            />
        )
    }
}

BaseInput.defaultProps = {
    bg: false,
    left: false,
}

export default BaseInput;