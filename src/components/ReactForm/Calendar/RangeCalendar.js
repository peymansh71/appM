import React, {Component} from 'react';
import BaseCalendar from './BaseCalendar'


class RangeCalendar extends Component {

    render (){
        const {jalali, change, monthOnly} = this.props;

        return (
            <BaseCalendar
                monthOnly={monthOnly}
                jalali={jalali} 
                range={true} 
                double={true} 
                change={change}
            />
        )
    }
}

RangeCalendar.defaultProps ={
    jalali : false,
    monthOnly: false
}

export default RangeCalendar