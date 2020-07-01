import React, {Component} from 'react';
import CalendarContext from './CalendarContext';
import {persianNumber } from './functions';

class MonthsHeader extends Component {
    static contextType = CalendarContext;

    prev = () =>{
        const {year, prevYear,id} = this.context;
        const isSecond = id === '2'
        prevYear(year,isSecond)
    }
    next = () =>{
        const {year, nextYear,id} = this.context;
        const isSecond = id === '2'
        nextYear(year,isSecond)
    }


    render () {
        const {year, jalali} = this.context;
        const jalaliYear = persianNumber(year.format('jYYYY')) ;
        const georgianYear = year.format('YYYY');
        
        return (
            <div class="r-calendar-header">

                <button onClick={this.prev} type="button" className="r-ripple" >
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
                </button>

                <div class="r-title" > { jalali ? jalaliYear : georgianYear } </div>
                    
                <button onClick={this.next} type="button"  className="r-ripple" >
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                </button>
            </div>
        )
    }
}


export default MonthsHeader