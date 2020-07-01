import React , {Component} from 'react';
import BaseCalendar from './BaseCalendar';

class DatePicker extends Component {


    render () {
        const {change,monthOnly, jalali, startDate, endDtate,approve,outline, value, required,label} = this.props;
        return (
            <BaseCalendar 
                label={label}
                value={value}
                monthOnly={monthOnly}
                jalali={jalali}
                datepicker={true}
                change={change}
                outline={outline}
                approve = {approve}
                required={required}
          />
        )
    }
}

DatePicker.defaultProps = {
    monthOnly : false,
    jalali : false,
    outline:false,
    required : false,
}
export default DatePicker