import React, {Component} from 'react';
import {DatePicker} from '../ReactForm';


class BaseDatePicker extends Component {

    render (){
        const {label, value, change, required} = this.props;
        return (
            <DatePicker required={required} jalali={true} label={label} value={value} outline={true} change={change} />
        )
    }
}



export default BaseDatePicker