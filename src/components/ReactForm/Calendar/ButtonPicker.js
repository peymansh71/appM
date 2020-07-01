import React, {Component,Fragment,createRef} from 'react';
import Calendar from './Calendar'
import $ from 'jquery';
import Backdrop from '../Backdrop/Backdrop';
import BaseCalendarContext from './BaseCalendarContext'
import {getDay, getYear, getMonth, getMonthName, getShortYear} from './functions'
class ButtonPicker extends Component {


    static contextType = BaseCalendarContext;
    constructor (props){
        super(props);

        this.state = {
            open : false,
            top : null,
            left :null
        }

        this.datepikcerDom = createRef();
    }



    getWidth = () =>{
        const {double } = this.context;
        return double ? 610 : 310
    }

    open = () => {
        this.setState({open:true})

        var x = $(this.datepikcerDom.current).offset().left;
        var y = $(this.datepikcerDom.current).offset().top;
        this.setState({
            top : y+50,
            left : x
        })
    }

    close = () => {
        this.setState({open:false})
    }

    prevAction = () => {
        const {selectedMonth,selectedMonth2,prevMonth,prevDay,nextMonth, nextDay,double, monthOnly,selectedDay, selectedDay2} = this.context;
        
        if (double) {
            if (monthOnly) {
                nextMonth(selectedMonth2,true)
            }
            else {
                nextDay(selectedDay2,true)
            }
            
        }
        else {
            if (monthOnly) {
                nextMonth(selectedMonth)
            }
            else {
                nextDay(selectedDay)
            }
           
        }
        
    }
    nextAction = () =>{
        const {selectedMonth,selectedMonth2,prevDay,nextMonth,nextDay, prevMonth,double, selectedDay,selectedDay2, monthOnly} = this.context;
        if (double) {
           
            if (monthOnly) {
                prevMonth(selectedMonth)
            }
            else {
                prevDay(selectedDay)
            }
        }
        else {
            if (monthOnly) {
                prevMonth(selectedMonth)
            }
            else {
                prevDay(selectedDay)
            }
          
        }
    }
    renderSelected = () => {
        const {double, selectedMonth, selectedMonth2 ,selectedDay, selectedDay2,jalali, monthOnly} = this.context;

        
        if (double)   {
            if (!selectedMonth || !selectedMonth2) return 'Not Selected';
            if (monthOnly) {
                return (
       
                    <Fragment>
                        <div className="r-selected-item">
                            <span>{getMonthName(selectedMonth, jalali)}</span>
                            <span>{getYear(selectedMonth, jalali)}</span>
                        </div>
                        <div className="r-selected-item" style={{width:10}}>
                            <span style={{opacity:0}}> - </span>
                            <span>-</span>
                        </div>
                        <div className="r-selected-item">
                            <span>{getMonthName(selectedMonth2, jalali)}</span>
                            <span>{getYear(selectedMonth2, jalali)}</span>
                        </div>
                    </Fragment>
                )
            }
            else {
                if (!selectedDay || !selectedDay2) return 'Not Selected';
                return (

                    <Fragment>
                        <div className="r-selected-item">
                            <span>{getDay(selectedDay, jalali)}</span>
                            <span>
                                <span>{getMonthName(selectedMonth,jalali)}</span>&nbsp;
                                <span>{getShortYear(selectedMonth,jalali)}</span>
                            </span>
                        </div>
                        <div className="r-selected-item" style={{width:10}}>
                            <span style={{opacity:0}}> - </span>
                            <span>-</span>
                        </div>
                        <div className="r-selected-item">
                            <span>{getDay(selectedDay2, jalali)}</span>
                            <span>
                                <span>{getMonthName(selectedMonth2,jalali)}</span>&nbsp;
                                <span>{getShortYear(selectedMonth2,jalali)}</span>
                            </span>
                        </div>
                    </Fragment>
                )
            }
            
        }      
        else {
            if (monthOnly) {
                if (!selectedMonth) return 'Not Selected';
                return (
                    <div className="r-selected-item">
                        <span>{getMonthName(selectedMonth, jalali)}</span>
                        <span>{getYear(selectedMonth, jalali)}</span>
                    </div>
                )
            }
            else {
                if (!selectedDay) return 'Not Selected';
                return (
                    <div className="r-selected-item">
                        <span>{getDay(selectedDay, jalali)}</span>
                        <span>
                            <span>{getMonthName(selectedMonth,jalali)}</span>&nbsp;
                            <span>{getYear(selectedMonth,jalali)}</span>
                         </span>
                    </div>
                )
            }
           
        }           
    }


    approve = () => {
        const {approve} = this.props;
        const {changeHistory} = this.context;
        if (approve) {
            approve(changeHistory);
            this.close()
        }
    }
    render (){
        const {jalali,toggleCalendar, double, approve} = this.context;
        const { open, top, left } = this.state;
        
        
        return (
           <div className="r-datepicker" >
                {open && <Backdrop onClick={this.close} />}
               <div className="r-datepicker-header"  ref={ this.datepikcerDom}>
                    <button type="button" className="r-ripple" onClick={this.nextAction}>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                        </svg>
                    </button>
                    
                    <div class="r-datepicker-selected" onClick={this.open} style={{ direction : jalali ? 'rtl' : 'ltr'}}> 
                        {this.renderSelected()}
                        
                    </div>

                    <button  type="button" class="r-ripple" onClick={this.prevAction}>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>
                    </button>
               </div>
              
                        {open && <div className="r-datepicker-content" style={{width:this.getWidth(),top,left, direction : jalali ? 'rtl' : 'ltr'}}>
                 
                        {!double && <div className="r-rangeCalendar"><Calendar id="1" /></div>}

                        {double &&  <div className="r-rangeCalendar"><Calendar id="1" /><Calendar id="2" /></div>}

                        <button  style={{margin:'0 8px'}} className={`r-button r-ripple r-xs r-default  r-rounded r-nospace`} type="button" onClick={toggleCalendar}>
                           

                        {!double && <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 17V8H7V17H21M21 3C22.1 3 23 3.9 23 5V17C23 18.1 22.1 19 21 19H7C5.89 19 5 18.1 5 17V5C5 3.9 5.9 3 7 3H8V1H10V3H18V1H20V3H21M3 21H17V23H3C1.89 23 1 22.1 1 21V9H3V21Z" />
                        </svg>}

                        {double && <svg  viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
                        </svg>}
                        
                            
                         </button>

                         <button onClick={this.approve} style={{margin:'0 8px'}} className={`r-button r-ripple r-xs r-default  r-rounded r-nospace`} type="button" >
                            <svg  viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                            </svg>
                         </button>
                    </div>}
                </div>
           
        )
    }
}

ButtonPicker.defaultProps ={
    jalali : false,
    monthOnly: false
}

export default ButtonPicker