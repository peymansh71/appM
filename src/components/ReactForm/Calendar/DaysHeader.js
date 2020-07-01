import React, {Component} from 'react';
import CalendarContext from './CalendarContext';
import {persianNumber,mapPersianMonths } from './functions';

class DaysHeader extends Component {
    static contextType = CalendarContext;

    prev = () =>{
        const {month, prevMonth, id} = this.context;
        const isSecond = id === '2';
        prevMonth(month, isSecond)
    }
    next = () =>{
        const {month, nextMonth,id} = this.context;
        const isSecond = id === '2';
        nextMonth(month, isSecond)
    }
    render () {
        
        const {setMode, month, jalali} = this.context;
        const jalaliMonthYear = mapPersianMonths(persianNumber(month.locale('fa').format('jMMMM jYYYY')));
        const georgianMonthYear = month.locale('en').format('MMMM YYYY');
        
        return (
            <div className="r-calendar-header">
                <button onClick={this.prev} type="button" className="r-ripple">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
                </button>
                

                <div className="r-title" onClick={()=>{setMode('months')}}> 
                {jalali ? jalaliMonthYear : georgianMonthYear} 
                </div>

                <button onClick={this.next} type="button" className="r-ripple">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                </button>
                
            </div>
        )
    }
}


export default (DaysHeader)