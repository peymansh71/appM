import React, { Component } from 'react';
import { InputFile } from '../ReactForm';



class BaseInputFile extends Component {



    render() {
        const { label, value, change, required, type } = this.props;

        return (
            <InputFile
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

BaseInputFile.defaultProps = {
    bg: false,
    left: false,
}

export default BaseInputFile;