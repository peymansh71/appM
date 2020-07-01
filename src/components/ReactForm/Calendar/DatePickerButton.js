import React , {Component} from 'react';
import BaseCalendar from './BaseCalendar';

class DatePickerButton extends Component {


    render () {
        const {change,monthOnly, jalali, startDate, endDtate,approve} = this.props;

        return (
            <BaseCalendar 
                startDtate={startDate}
                endDtate={endDtate}
                monthOnly={monthOnly}
                jalali={jalali}
                datepickerButton={true}
                change={change}
                approve = {approve}
          />
        )
    }
}

DatePickerButton.defaultProps = {
    monthOnly : false,
    jalali : false,
}
export default DatePickerButton