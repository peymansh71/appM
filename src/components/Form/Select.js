import React, { Component } from 'react';
import { Select } from '../ReactForm';




class BaseSelect extends Component {


    render() {
        const { change, items, mapping, label, value, required } = this.props;
        return (
            <Select
                nullable={true}
                search={true}
                change={change}
                rtl={true}
                label={label}
                defaultValue={value}
                outline={true}
                values={items}
                mapping={mapping}
                required={required}
                
            />
        )
    }
}



export default BaseSelect;

