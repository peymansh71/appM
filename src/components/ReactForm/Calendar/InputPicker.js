import React, {Component,Fragment,createRef} from 'react';
import Calendar from './Calendar'
import $ from 'jquery';
import Backdrop from '../Backdrop/Backdrop';
import BaseCalendarContext from './BaseCalendarContext';
import Input from '../Input/Input'

import {persianNumber } from './functions';


class DatePicker extends Component {


    static contextType = BaseCalendarContext;
    constructor (props){
        super(props);

        this.state = {
            open : false,
            top : null,
            left :null
        }

        this.inputDom = createRef();
    }


  
    open = () => {
        const {outline} = this.context;

        this.setState({open:true})

        var x = $(this.inputDom.current).offset().left;
        var y = $(this.inputDom.current).offset().top;
        this.setState({
            top : y + (outline ? 44 : 30) ,
            left : x
        })
    }

    close = () => {
        this.setState({open:false})
    }


    getWidth = () =>{
        const {double } = this.context;
        return double ? 610 : 310
    }

    render (){
        const {jalali,toggleCalendar, double, approve,changeHistory,outline,selectedDay, selectedDay2,moment, required, label} = this.context;
        
        const { open, top, left } = this.state;
        let value = '';

        if (changeHistory) {
            if (double && changeHistory.startDateStr && changeHistory.endDateStr) {
                value =  changeHistory.startDateStr + ' - ' + changeHistory.endDateStr ;
            }
            else {
                value =  changeHistory.startDateStr  || changeHistory.dateStr || (jalali ? persianNumber(moment.format('jYYYY/jM/jD')) : moment.format('YYYY/MM/DD'))  ;
            }

        }
        else {
            if (double && selectedDay && selectedDay2) {
                //value =  selectedDay + ' - ' + selectedDay2 ;
            }
            else {
                //موقتا
                value = selectedDay  ?  (typeof selectedDay === 'string' ? selectedDay :  (jalali ? persianNumber(selectedDay.format('jYYYY/jM/jD')) : selectedDay.format('YYYY/MM/DD'))  ): '' ;
            }

        }
        
        return (
           <div className={`r-input r-datepicker ${jalali ? 'r-rtl' : ''} ${outline ? 'r-bordered' : ''}`}  ref={this.inputDom}>
               
                        {open && <Backdrop onClick={this.close} />}
                        <span onClick={this.open} className="r-icon"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" /></svg></span>
                        <Input
                            rtl={jalali}
                            onFocus = {this.open}
                            disabled={false} 
                            type="text" 
                            onChange={()=>{}}
                            className=" r-input " 
                            value={value}  
                            required={required && (!value || value === '')}
                            label={label}

                        />
                         
                        {open && <div className="r-datepicker-content" style={{width:this.getWidth(),top,left, direction : jalali ? 'rtl' : 'ltr'}}>
                 
                        {!double && <div className="r-rangeCalendar"><Calendar id="1" /></div>}

                        {double &&  <div className="r-rangeCalendar"><Calendar id="1" /><Calendar id="2" /></div>}

                
                    
                    </div>}
                </div>
           
        )
    }
}

DatePicker.defaultProps ={
    jalali : false,
    monthOnly: false
}

export default DatePicker